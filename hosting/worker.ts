import { handleChat, type ChatSettings } from "../lib/chat/handler";
import { handleInquiry } from "../lib/inquiry";
import type { MailSettings } from "../lib/inquiry";

type Environment = MailSettings & ChatSettings & { ASSETS: { fetch(request: Request): Promise<Response> } };

const worker = {
  fetch(request: Request, env: Environment) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/inquiry" || pathname === "/api/inquiry/") {
      return handleInquiry(request, env);
    }
    if (pathname === "/api/chat" || pathname === "/api/chat/") return handleChat(request, env);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
