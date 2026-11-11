import { getContent } from "../lib/localized-content";
import { localizedPath, type Locale } from "../lib/routing";
import Link from "next/link";
import { Eyebrow, LeadActions, Photo } from "../components/editorial";
import { CollectionCard } from "../components/collection-card";
import { CatalogButton } from "../components/inquiry-form";
import { Icon } from "../components/icons";
import { BreadcrumbData } from "../components/structured-data";
import { menuDesignPath, waiterFoldersPath } from "../lib/seo";

export default function CollectionPage({ locale, slug }: { locale: Locale; slug: string }) {
  const { t, collections, editorial } = getContent(locale);
  const collection = collections.find(({ id }) => id === slug)!;
  const { guide } = collection;
  const related = guide.related.map((id) => collections.find((item) => item.id === id)!);

  return (
    <>
      <BreadcrumbData locale={locale} items={[
        { name: t.collections, path: "/products" },
        { name: collection.title, path: `/products/${slug}` },
      ]} />
      <div className="shell breadcrumb">
        <Link href={localizedPath(locale, "/products")}>{t.collections}</Link><span aria-hidden="true">/</span><span>{collection.title}</span>
      </div>
      <section className="shell collection-hero">
        <div className="collection-hero-copy">
          <Eyebrow>{t.collectionEyebrow}</Eyebrow>
          <h1>{collection.title}</h1>
          <p>{collection.detail}</p>
          <LeadActions locale={locale} topic={collection.title} />
        </div>
        <Photo image={collection.image} className="collection-hero-photo" priority />
      </section>
      <section className="shell product-guide" aria-labelledby="product-guide-title">
        <div className="product-guide-heading scroll-entrance">
          <h2 id="product-guide-title">{t.options}</h2>
          <ul className="product-guide-examples">
            {collection.examples.map((example) => <li key={example}>{example}</li>)}
          </ul>
          {slug === "restaurant-accessories" && <Link className="text-link" href={localizedPath(locale, waiterFoldersPath)}>{t.waiterFolderDetails} <Icon name="arrow" /></Link>}
          {(slug === "digital-menus" || slug === "menu-covers") && <Link className="text-link" href={localizedPath(locale, menuDesignPath)}>{t.menuDesignDetails} <Icon name="arrow" /></Link>}
        </div>
        <dl className="product-specifications">
          {guide.options.map(({ label, description }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="burgundy-panel product-brief">
        <div className="shell product-brief-inner">
          <h2>{t.workingFirst}</h2>
          <div>
            <p>{guide.brief}</p>
            <LeadActions locale={locale} topic={collection.title} />
            <CatalogButton className="text-link">{t.requestCatalog} <Icon name="arrow" width="17" height="17" /></CatalogButton>
          </div>
        </div>
      </section>
      {slug === "digital-menus" && (
        <section className="digital-detail-band">
          <div className="shell split-section">
            <Photo image={editorial.website} className="landscape-photo" />
            <div className="split-copy">
              <Eyebrow>{t.webServiceEyebrow}</Eyebrow>
              <h2>{t.webDetailTitle}</h2>
              <p>{t.webDetailText}</p>
              <LeadActions locale={locale} topic={t.webTopic} />
            </div>
          </div>
        </section>
      )}
      <section className="shell related-section">
        <div className="section-heading"><h2>{t.related}</h2><Link href={localizedPath(locale, "/products")} className="text-link">{t.allCollections} <Icon name="arrow" /></Link></div>
        <div className="collection-grid">{related.map((item) => <CollectionCard locale={locale} key={item.id} collection={item} />)}</div>
      </section>
    </>
  );
}
