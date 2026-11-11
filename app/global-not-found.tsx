import type { Metadata } from "next";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-ext-400.css";
import "@fontsource-variable/manrope";
import { getMessages } from "../lib/localized-content";
import { locales, localizedPath } from "../lib/routing";
import "./site.css";

const t = getMessages("me");
export const metadata: Metadata = { title: `${t.notFound} | FOLIA`, robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="cnr">
      <body>
        <main className="shell page-heading">
          <p className="eyebrow">404</p>
          <h1>{t.notFound}</h1>
          <nav className="actions" aria-label={t.language}>
            {locales.map(({ id, lang }) => (
              <a key={id} href={localizedPath(id)} lang={lang} className="text-link">{getMessages(id).backHome}</a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
