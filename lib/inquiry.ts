import { collections, inquiryTypes, studio } from "./content";

export interface MailSettings {
  RESEND_API_KEY?: string;
  FOLIA_INQUIRY_FROM?: string;
  FOLIA_INQUIRY_TO?: string;
  FOLIA_SITE_ORIGIN?: string;
}

const productLabels = new Map(collections.map(({ id, title }) => [id, title]));
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const bodyLimit = 18_000;

function response(status: number, error?: string) {
  return Response.json(error ? { ok: false, error } : { ok: true }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function readFields(request: Request): Promise<Record<string, unknown>> {
  if (!request.body || Number(request.headers.get("content-length")) > bodyLimit) {
    throw new Error("Request too large");
  }
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > bodyLimit) {
      await reader.cancel();
      throw new Error("Request too large");
    }
    text += decoder.decode(value, { stream: true });
  }

  const parsed: unknown = JSON.parse(text + decoder.decode());
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Invalid body");
  }
  return parsed as Record<string, unknown>;
}

function validate(fields: Record<string, unknown>) {
  function field(name: string, maxLength: number) {
    const value = fields[name] ?? "";
    if (typeof value !== "string" || value.length > maxLength) {
      throw new Error("One or more fields exceed the allowed length.");
    }
    return value.trim();
  }

  const catalog = fields.mode === "catalog";
  if ((!catalog && fields.mode !== "contact") || field("website", 120)) {
    throw new Error("Please check the form and try again.");
  }

  const name = field("name", 120);
  const business = field("business", 160);
  const email = field("email", 254);
  const phone = catalog ? "" : field("phone", 50);
  const quantity = catalog ? "" : field("quantity", 8);
  const message = catalog ? "" : field("message", 4000);
  const type = catalog ? inquiryTypes[0] : field("type", 60);
  const products = fields.products ?? [];

  if (!name || !emailPattern.test(email) || !inquiryTypes.includes(type)) {
    throw new Error("Enter your name, a valid email address, and an inquiry type.");
  }
  if (quantity && (!/^[0-9]+$/.test(quantity) || Number(quantity) < 1 || Number(quantity) > 10_000_000)) {
    throw new Error("Enter a valid estimated quantity.");
  }
  if (!Array.isArray(products) || products.length > (catalog ? 1 : collections.length) ||
      products.some((product) => typeof product !== "string" || !productLabels.has(product))) {
    throw new Error("Select products from the list.");
  }

  return {
    email,
    type,
    text: [
      `Inquiry: ${type}`,
      `Name: ${name}`,
      `Email: ${email}`,
      business && `Business: ${business}`,
      phone && `Phone: ${phone}`,
      products.length > 0 && `Products: ${[...new Set(products)].map((product) => productLabels.get(product)).join(", ")}`,
      quantity && `Estimated quantity: ${quantity}`,
      message && `Message:\n${message}`,
    ].filter(Boolean).join("\n\n"),
  };
}

export async function handleInquiry(request: Request, settings: MailSettings) {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }
  const origin = request.headers.get("origin");
  const endpoint = new URL(request.url);
  const host = request.headers.get("host");
  const incomingOrigin = host ? `${endpoint.protocol}//${host}` : endpoint.origin;
  if (origin && origin !== incomingOrigin && origin !== endpoint.origin && origin !== settings.FOLIA_SITE_ORIGIN) {
    return response(403, "Please submit this form from the Folia website.");
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return response(415, "Please submit this form from the Folia website.");
  }

  let fields;
  try {
    fields = await readFields(request);
  } catch {
    return response(400, "We couldn’t read the request. Please check the form and try again.");
  }

  let inquiry;
  try {
    inquiry = validate(fields);
  } catch (error) {
    return response(422, error instanceof Error ? error.message : "Please check the form and try again.");
  }

  const { RESEND_API_KEY: key, FOLIA_INQUIRY_FROM: from } = settings;
  const to = settings.FOLIA_INQUIRY_TO || studio.email;
  if (!key || !from || !to) {
    return response(503, "Online inquiries are currently unavailable. Please try again later.");
  }

  const id = request.headers.get("idempotency-key") ?? "";
  const headers: Record<string, string> = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  if (/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(id)) {
    headers["Idempotency-Key"] = `folia/${id}`;
  }

  try {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: inquiry.email,
        subject: `Folia website | ${inquiry.type}`,
        text: inquiry.text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (sent.ok) {
      const accepted = await sent.json() as { id?: unknown };
      if (typeof accepted.id === "string" && accepted.id) return response(200);
    }
  } catch {
    // A lost connection can occur after acceptance. The same request ID can be retried.
  }
  return response(502, "We couldn’t send your request. Please try again.");
}
