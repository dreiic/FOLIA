import { handleChat } from "../../../lib/chat/handler";

function chat(request: Request) {
  return handleChat(request, {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    FOLIA_CHAT_MODEL: process.env.FOLIA_CHAT_MODEL,
  });
}

export const GET = chat;
export const POST = chat;
