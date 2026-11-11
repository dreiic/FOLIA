export type ChatMessage = { role: "user" | "assistant"; content: string };

export type ChatReply = {
  reply: string;
  brief: string;
  handoff: boolean;
  links: { href: string; label: string }[];
};

export const chatInputLimit = 900;
export const chatHistoryLimit = 16;
export const chatBriefLimit = 1000;
