import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/instrument-serif/latin-ext-400.css";
import "@fontsource/instrument-serif/latin-ext-400-italic.css";
import "@fontsource-variable/manrope";
import { CatalogProvider } from "../../components/inquiry-form";
import { QuoteReminder } from "../../components/quote-reminder";
import { Footer, Header } from "../../components/site-chrome";
import { getContent } from "../../lib/localized-content";
import { locales, localizedPath, parseSegments } from "../../lib/routing";
import "../site.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FOLIA_SITE_URL || "https://folia-hospitality-studio.downyhinny16.chatgpt.site"),
  icons: { icon: "/editorial/folia-icon.png" },
};

export default async function RootLayout({ children, params }: {
  children: ReactNode;
  params: Promise<{ segments?: string[] }>;
}) {
  const { locale, path } = parseSegments((await params).segments);
  const { t, collections } = getContent(locale);
  const language = locales.find(({ id }) => id === locale)!;

  return (
    <html lang={language.lang} data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">{t.skip}</a>
        <CatalogProvider t={t}>
          <Header locale={locale} t={t} collectionLinks={collections.map(({ id, title }) => ({ id, title }))} />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer locale={locale} t={t} />
          {path !== "/contact" && (
            <QuoteReminder
              key={`${locale}:${path}`}
              isHome={path === "/"}
              href={`${localizedPath(locale, "/contact")}#inquiry`}
              title={t.quoteTitle}
              body={t.quoteBody}
              action={t.quoteAction}
              dismissLabel={t.quoteDismiss}
            />
          )}
        </CatalogProvider>
      </body>
    </html>
  );
}
