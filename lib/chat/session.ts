import { canSendInquiry, readFields, sendInquiryEmail, type MailSettings } from "../inquiry";
import { chatBriefLimit, chatIdleMs, chatInputLimit } from "./types";

type SessionStorage = {
  get<T>(key: string): Promise<T | undefined>;
  put(key: string, value: unknown): Promise<void>;
  deleteAll(): Promise<void>;
  setAlarm(time: number): Promise<void>;
};

type SessionState = {
  storage: SessionStorage;
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
};

type SessionStub = { fetch(request: Request): Promise<Response> };
export type ChatSessionBinding = { getByName(id: string): SessionStub };

type Session = {
  name: string;
  phone: string;
  leadSent: boolean;
  deadline: number;
  notes: string[];
  brief: string;
  lastTurn?: string;
  closed?: "confirmed" | "idle";
  attempts: number;
};

const sessionKey = "session";
const hour = 3_600_000;
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

export function isChatSessionId(value: unknown): value is string {
  return typeof value === "string" && uuid.test(value);
}

export function sessionAction(binding: ChatSessionBinding, id: string, action: string, data = {}) {
  return binding.getByName(id).fetch(new Request(`https://session.internal/${action}`, {
    method: "POST",
    body: JSON.stringify({ ...data, id }),
  }));
}

function result(status = 200) {
  return Response.json({ ok: status === 200 }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function handleChatSession(request: Request, settings: MailSettings, binding: ChatSessionBinding) {
  if (request.method !== "POST") return result(405);
  if (request.headers.get("origin") !== new URL(request.url).origin) return result(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return result(415);
  if (!canSendInquiry(settings)) return result(503);

  let fields;
  try {
    fields = await readFields(request);
  } catch {
    return result(400);
  }
  const { id, action } = fields;
  if (!isChatSessionId(id)) return result(422);
  if (action === "continue" || action === "finish") return sessionAction(binding, id, action);
  if (action !== "start") return result(422);

  const name = typeof fields.name === "string" ? fields.name.trim().replace(/\s+/g, " ") : "";
  const phone = typeof fields.phone === "string" ? fields.phone.trim() : "";
  const digits = phone.replace(/\D/g, "");
  if (!name || name.length > 120 || phone.length > 32 || !/^\+?[\d .()-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    return result(422);
  }
  if (settings.CHAT_RATE_LIMIT) {
    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const { success } = await settings.CHAT_RATE_LIMIT.limit({ key: `chat-start:${ip}` });
    if (!success) return result(429);
  }
  return sessionAction(binding, id, "start", { name, phone });
}

export class FoliaChatSession {
  constructor(private readonly state: SessionState, private readonly settings: MailSettings) {}

  async fetch(request: Request) {
    const action = new URL(request.url).pathname.slice(1);
    const data = await request.json() as {
      id: string; name?: string; phone?: string; question?: string; brief?: string; turnId?: string;
    };

    return this.state.blockConcurrencyWhile(async () => {
      const storage = this.state.storage;
      const now = Date.now();
      const saved = await storage.get<Session & { id: string }>(sessionKey);
      if (action === "start") {
        if (saved) return result(!saved.closed && saved.name === data.name && saved.phone === data.phone ? 200 : 409);
        if (await storage.get<boolean>("finished")) return result(409);
        await storage.put(sessionKey, {
          id: data.id, name: data.name!, phone: data.phone!, leadSent: false,
          deadline: now + chatIdleMs, notes: [], brief: "", attempts: 0,
        });
        await storage.setAlarm(now);
        return result();
      }
      if (!saved) return result(action === "finish" && await storage.get<boolean>("finished") ? 200 : 409);
      if (saved.closed || saved.deadline <= now) return result(action === "finish" ? 200 : 409);

      if (action === "record" && data.question && data.turnId) {
        const question = data.question.slice(0, chatInputLimit);
        // The same message may be retried after a failed model response.
        if (saved.notes.at(-1) !== question) saved.notes.push(question);
        saved.lastTurn = data.turnId;
        saved.deadline = now + chatIdleMs + 25_000;
      } else if (action === "complete") {
        if (saved.lastTurn !== data.turnId) return result();
        if (data.brief) saved.brief = data.brief.slice(0, chatBriefLimit);
        delete saved.lastTurn;
        saved.deadline = now + chatIdleMs;
      } else if (action === "continue") {
        saved.deadline = now + chatIdleMs;
      } else if (action === "finish") {
        saved.closed = "confirmed";
      } else {
        return result(422);
      }

      await storage.put(sessionKey, saved);
      // Keep the scheduled attempt to deliver the first email if it is still pending.
      if (saved.closed || saved.leadSent) await storage.setAlarm(saved.closed ? now : saved.deadline);
      return result();
    });
  }

  async alarm() {
    await this.state.blockConcurrencyWhile(async () => {
      const storage = this.state.storage;
      const saved = await storage.get<Session & { id: string }>(sessionKey);
      if (!saved) {
        await storage.deleteAll();
        return;
      }

      const now = Date.now();
      if (!saved.closed && saved.deadline <= now) saved.closed = "idle";
      if (saved.closed) await storage.put(sessionKey, saved);
      const contact = `Ime: ${saved.name}\nTelefon: ${saved.phone}\nReferenca: ${saved.id}`;

      if (!saved.leadSent) {
        saved.leadSent = await sendInquiryEmail(this.settings, {
          type: "Novi kontakt iz Folia chata",
          text: contact,
        }, `chat-start/${saved.id}`);
        if (!saved.leadSent) return this.retry(saved, now);
        saved.attempts = 0;
        await storage.put(sessionKey, saved);
      }

      if (!saved.closed) {
        await storage.setAlarm(saved.deadline);
        return;
      }

      if (saved.notes.length || saved.brief) {
        const status = saved.closed === "confirmed" ? "Klijent je potvrdio prosljeđivanje." : "Razgovor je zatvoren zbog neaktivnosti.";
        const summary = saved.brief ? `\n\nSažetak:\n${saved.brief}` : "";
        const notes = saved.notes.length ? `\n\nPoruke klijenta:\n${saved.notes.join("\n\n")}` : "";
        const sent = await sendInquiryEmail(this.settings, {
          type: "Sažetak razgovora iz Folia chata",
          text: `${contact}\n\n${status}${summary}${notes}`,
        }, `chat-finish/${saved.id}`);
        if (!sent) return this.retry(saved, now);
      }

      await storage.deleteAll();
      await storage.put("finished", true);
      await storage.setAlarm(now + 24 * hour);
    });
  }

  private async retry(saved: Session & { id: string }, now: number) {
    saved.attempts++;
    await this.state.storage.put(sessionKey, saved);
    const delay = Math.min(15 * 60_000, 10_000 * 2 ** Math.min(saved.attempts - 1, 10));
    await this.state.storage.setAlarm(now + delay);
  }
}
