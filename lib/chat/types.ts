export type ChatMessage = { role: "user" | "assistant"; content: string };

export type ChatReply = {
  reply: string;
  brief: string;
  links: { href: string; label: string }[];
};

export const chatInputLimit = 900;
export const chatHistoryLimit = 16;
