import { studio } from "../lib/content";
import type { Locale } from "../lib/routing";
import { pageUrl, siteOrigin } from "../lib/seo";

function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  }} />;
}

export function OrganizationData() {
  const url = pageUrl("me", "/");
  return <StructuredData data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        name: "Folia",
        url,
        logo: `${siteOrigin}/editorial/folia-icon.png`,
        email: studio.email,
        telephone: studio.phone,
        sameAs: [studio.instagram],
        address: { "@type": "PostalAddress", addressLocality: "Podgorica", addressCountry: "ME" },
        areaServed: { "@type": "Country", name: "Montenegro" },
      },
      { "@type": "WebSite", "@id": `${url}#website`, name: "Folia", url },
    ],
  }} />;
}

export function BreadcrumbData({ locale, items }: {
  locale: Locale;
  items: { name: string; path: string }[];
}) {
  return <StructuredData data={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem", position: index + 1, name, item: pageUrl(locale, path),
    })),
  }} />;
}
