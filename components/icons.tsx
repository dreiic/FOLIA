import type { ReactNode, SVGProps } from "react";

export type IconName = "mail" | "instagram" | "phone" | "message" | "whatsapp" | "location" | "chevron" | "arrow" | "close";

const paths: Record<IconName, ReactNode> = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".65" fill="currentColor" stroke="none" /></>,
  phone: <path d="m8 3 3 5-2 2c1.4 2.6 3.4 4.6 6 6l2-2 4 3c-1 4-4 5-8 2C8 16 4 12 3 7c-.3-2 1-4 5-4Z" />,
  message: <path d="M20 4H4v12h4l4 4 4-4h4V4ZM7 8h10M7 12h7" />,
  whatsapp: <><path d="M20.7 11.6a8.6 8.6 0 0 1-12.6 7.6L3 21l1.6-5.1A8.6 8.6 0 1 1 20.7 11.6Z" /><path d="m8.4 7.5 1.5 2-1 1c.8 1.6 2 2.8 3.6 3.6l1-1 2 1.5c-.7 2-2.3 2-4.4.8-2.2-1.3-4.6-3.7-4.3-5.9.1-1.1.8-1.8 1.6-2Z" /></>,
  location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
