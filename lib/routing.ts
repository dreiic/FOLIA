export const locales = [
  { id: "me", lang: "cnr", label: "Crnogorski", short: "CG" },
  { id: "en", lang: "en", label: "English", short: "EN" },
  { id: "ru", lang: "ru", label: "Русский", short: "RU" },
] as const;

export type Locale = (typeof locales)[number]["id"];

export function localizedPath(locale: Locale, path = "/") {
  return locale === "me" ? path : `/${locale}${path === "/" ? "" : path}`;
}

export function parseSegments(segments: string[] = []) {
  const [first, ...rest] = segments;
  const locale: Locale = first === "en" || first === "ru" ? first : "me";
  const parts = locale === "me" ? segments : rest;
  return { locale, path: `/${parts.join("/")}` };
}
