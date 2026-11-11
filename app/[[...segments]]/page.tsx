import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections } from "../../lib/content";
import { getContent } from "../../lib/localized-content";
import { locales, localizedPath, parseSegments } from "../../lib/routing";
import About from "../../views/about";
import CollectionPage from "../../views/collection";
import Contact from "../../views/contact";
import Home from "../../views/home";
import Products from "../../views/products";

type PageProps = { params: Promise<{ segments?: string[] }> };

export const dynamicParams = false;

const pages = {
  "/": Home,
  "/products": Products,
  "/about": About,
  "/contact": Contact,
};

export function generateStaticParams() {
  const paths = [[], ["products"], ["about"], ["contact"], ...collections.map(({ id }) => ["products", id])];
  return locales.flatMap(({ id }) => paths.map((parts) => ({
    segments: id === "me" ? parts : [id, ...parts],
  })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, path } = parseSegments((await params).segments);
  const { t, collections, editorial } = getContent(locale);
  const collection = collections.find(({ id }) => path === `/products/${id}`);
  const titles: Record<string, [string, string]> = {
    "/": [t.homeMeta, t.homeDescription],
    "/products": [t.productsMeta, t.productsDescription],
    "/about": [t.aboutMeta, t.aboutDescription],
    "/contact": [t.contactMeta, t.contactDescription],
  };
  const [name, description] = collection ? [collection.title, collection.short] : titles[path] ?? [t.notFound, ""];
  const title = path === "/" ? `FOLIA | ${name}` : `${name} | FOLIA`;
  const canonical = localizedPath(locale, path);
  const languages = Object.fromEntries(locales.map(({ id, lang }) => [lang, localizedPath(id, path)]));
  return {
    title,
    description,
    alternates: { canonical, languages: { ...languages, "x-default": path } },
    openGraph: {
      type: "website", siteName: "Folia", title, description, url: canonical,
      locale: { me: "cnr_ME", en: "en_GB", ru: "ru_RU" }[locale],
      images: [collection?.image ?? editorial.hero].map(({ src, alt }) => ({ url: src, alt })),
    },
  };
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale, path } = parseSegments((await params).segments);
  const Page = pages[path as keyof typeof pages];
  if (Page) return <Page locale={locale} />;

  const collection = collections.find(({ id }) => path === `/products/${id}`);
  if (!collection) notFound();
  return <CollectionPage locale={locale} slug={collection.id} />;
}
