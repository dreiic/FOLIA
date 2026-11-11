import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections } from "../../lib/content";
import { landingContent } from "../../lib/landing-content";
import { getContent } from "../../lib/localized-content";
import { portfolioExamples } from "../../lib/portfolio";
import { locales, parseSegments } from "../../lib/routing";
import { alternatePageUrls, landingKinds, montenegroSearchCopy, pageUrl, sitePagePaths } from "../../lib/seo";
import About from "../../views/about";
import CollectionPage from "../../views/collection";
import Contact from "../../views/contact";
import Home from "../../views/home";
import Landing from "../../views/landing";
import Portfolio from "../../views/portfolio";
import Products from "../../views/products";
import Privacy from "../../views/privacy";

type PageProps = { params: Promise<{ segments?: string[] }> };

export const dynamicParams = false;

const pages = {
  "/": Home,
  "/products": Products,
  "/portfolio": Portfolio,
  "/about": About,
  "/contact": Contact,
  "/privacy": Privacy,
};

export function generateStaticParams() {
  return locales.flatMap(({ id }) => sitePagePaths.map((path) => {
    const parts = path === "/" ? [] : path.slice(1).split("/");
    return { segments: id === "me" ? parts : [id, ...parts] };
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, path } = parseSegments((await params).segments);
  const { t, collections, editorial, services } = getContent(locale);
  const collection = collections.find(({ id }) => path === `/products/${id}`);
  const kind = landingKinds[path as keyof typeof landingKinds];
  const landing = kind && landingContent[locale][kind];
  const titles: Record<string, [string, string]> = {
    "/": [t.homeMeta, t.homeDescription],
    "/products": [t.productsMeta, t.productsDescription],
    "/portfolio": [t.portfolioMeta, t.portfolioDescription],
    "/about": [t.aboutMeta, t.aboutDescription],
    "/contact": [t.contactMeta, t.contactDescription],
    "/privacy": [t.privacyTitle, t.privacyIntro],
  };
  const searchCopy = locale === "me" ? montenegroSearchCopy[path] : undefined;
  const [name, description] = searchCopy ?? (landing ? [landing.title, landing.description]
    : collection ? [collection.title, collection.short] : titles[path] ?? [t.notFound, ""]);
  const title = path === "/" ? `FOLIA | ${name}` : `${name} | FOLIA`;
  const canonical = pageUrl(locale, path);
  const [portfolioFeature] = portfolioExamples;
  const image = path === "/portfolio"
    ? { src: `/portfolio/${portfolioFeature.id}.webp`, alt: portfolioFeature.captions[locale][2] ?? portfolioFeature.captions[locale][0] }
    : kind === "menuDesign" ? services.find(({ id }) => id === "menu-design")?.image
    : kind === "waiterFolders" ? collections.find(({ id }) => id === "restaurant-accessories")?.image : collection?.image;
  return {
    title,
    description,
    alternates: { canonical, languages: alternatePageUrls(path) },
    openGraph: {
      type: "website", siteName: "Folia", title, description, url: canonical,
      locale: { me: "sr_ME", en: "en_GB", ru: "ru_RU" }[locale],
      images: [{ url: (image ?? editorial.hero).src, alt: (image ?? editorial.hero).alt }],
    },
  };
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale, path } = parseSegments((await params).segments);
  const Page = pages[path as keyof typeof pages];
  if (Page) return <Page locale={locale} />;
  const kind = landingKinds[path as keyof typeof landingKinds];
  if (kind) return <Landing locale={locale} kind={kind} />;

  const collection = collections.find(({ id }) => path === `/products/${id}`);
  if (!collection) notFound();
  return <CollectionPage locale={locale} slug={collection.id} />;
}
