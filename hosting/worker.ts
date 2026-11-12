import { handleChat, type ChatSettings } from "../lib/chat/handler";
import { handleInquiry } from "../lib/inquiry";
import type { MailSettings } from "../lib/inquiry";
import { handleChatSession, type ChatSessionBinding } from "../lib/chat/session";
export { FoliaChatSession } from "../lib/chat/session";

type Environment = MailSettings & ChatSettings & {
  CHAT_SESSIONS: ChatSessionBinding;
  ASSETS: { fetch(request: Request): Promise<Response> };
};

const worker = {
  fetch(request: Request, env: Environment) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/inquiry" || pathname === "/api/inquiry/") {
      return handleInquiry(request, env);
    }
    if (pathname === "/api/chat" || pathname === "/api/chat/") return handleChat(request, env, env.CHAT_SESSIONS);
    if (pathname === "/api/chat-session" || pathname === "/api/chat-session/") {
      return handleChatSession(request, env, env.CHAT_SESSIONS);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
