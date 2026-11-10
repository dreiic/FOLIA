import { handleInquiry } from "../../../lib/inquiry";

export function POST(request: Request) {
  return handleInquiry(request, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    FOLIA_INQUIRY_FROM: process.env.FOLIA_INQUIRY_FROM,
    FOLIA_INQUIRY_TO: process.env.FOLIA_INQUIRY_TO,
    FOLIA_SITE_ORIGIN: process.env.FOLIA_SITE_ORIGIN,
  });
}
