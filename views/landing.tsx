import Link from "next/link";
import { Eyebrow, LeadActions, Photo } from "../components/editorial";
import { Icon } from "../components/icons";
import { BreadcrumbData } from "../components/structured-data";
import { landingContent, type LandingKind } from "../lib/landing-content";
import { getContent } from "../lib/localized-content";
import { localizedPath, type Locale } from "../lib/routing";
import { menuDesignPath, waiterFoldersPath } from "../lib/seo";

const parentPaths = { menuDesign: "/", waiterFolders: "/products/restaurant-accessories" };
const paths = { menuDesign: menuDesignPath, waiterFolders: waiterFoldersPath };
const relatedIds = {
  menuDesign: ["menu-covers", "digital-menus", "menu-inserts"],
  waiterFolders: ["restaurant-accessories", "menu-covers", "product-sets"],
};

export default function Landing({ locale, kind }: { locale: Locale; kind: LandingKind }) {
  const { t, collections, services } = getContent(locale);
  const content = landingContent[locale][kind];
  const accessories = collections.find(({ id }) => id === "restaurant-accessories")!;
  const menuDesign = services.find(({ id }) => id === "menu-design")!;
  const parent = { name: kind === "menuDesign" ? t.home : accessories.title, path: parentPaths[kind] };
  const image = kind === "menuDesign" ? menuDesign.image : accessories.image;

  return (
    <>
      <BreadcrumbData locale={locale} items={[parent, { name: content.title, path: paths[kind] }]} />
      <div className="shell breadcrumb">
        <Link href={localizedPath(locale, parent.path)}>{parent.name}</Link><span aria-hidden="true">/</span><span>{content.title}</span>
      </div>
      <section className="shell collection-hero">
        <div className="collection-hero-copy">
          <Eyebrow>{t.business}</Eyebrow>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          <LeadActions locale={locale} topic={content.title} />
        </div>
        <Photo image={image} className="collection-hero-photo" priority />
      </section>
      <section className="shell product-guide" aria-labelledby="landing-details">
        <div className="product-guide-heading"><h2 id="landing-details">{content.detailsTitle}</h2></div>
        <dl className="product-specifications">
          {content.details.map(([label, description]) => (
            <div key={label}><dt>{label}</dt><dd>{description}</dd></div>
          ))}
        </dl>
      </section>
      <section className="burgundy-panel product-brief">
        <div className="shell product-brief-inner">
          <h2>{content.briefTitle}</h2>
          <div><p>{content.brief}</p><LeadActions locale={locale} topic={content.title} /></div>
        </div>
      </section>
      <section className="shell related-section">
        <div className="section-heading"><h2>{t.related}</h2></div>
        <div className="actions">
          {relatedIds[kind].map((id) => {
            const collection = collections.find((item) => item.id === id)!;
            return <Link key={id} className="text-link" href={localizedPath(locale, `/products/${id}`)}>{collection.title} <Icon name="arrow" /></Link>;
          })}
        </div>
      </section>
    </>
  );
}
