import { handleInquiry } from "../lib/inquiry";
import type { MailSettings } from "../lib/inquiry";

type Environment = MailSettings & { ASSETS: { fetch(request: Request): Promise<Response> } };

const worker = {
  fetch(request: Request, env: Environment) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/inquiry" || pathname === "/api/inquiry/") {
      return handleInquiry(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
