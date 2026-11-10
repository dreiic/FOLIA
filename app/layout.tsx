import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource-variable/manrope";
import { CatalogProvider } from "../components/inquiry-form";
import { Footer, Header } from "../components/site-chrome";
import "./site.css";

export const metadata: Metadata = {
  title: { default: "FOLIA | Hospitality Design & Supply", template: "%s | FOLIA" },
  description: "Custom menu covers, guest folders, presentation accessories, and digital menus for restaurants, hotels, and distinctive hospitality spaces.",
  openGraph: {
    type: "website",
    siteName: "FOLIA",
    images: [{ url: "/photography/hero.webp", alt: "Folia hospitality presentation" }],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_FOLIA_SITE_URL || "https://folia-hospitality-studio.downyhinny16.chatgpt.site"),
  icons: { icon: "/editorial/folia-icon.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <CatalogProvider>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
        </CatalogProvider>
      </body>
    </html>
  );
}
