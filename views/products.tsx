import { getContent } from "../lib/localized-content";
import Link from "next/link";
import { localizedPath, type Locale } from "../lib/routing";
import { menuDesignPath, waiterFoldersPath } from "../lib/seo";
import { CollectionCard } from "../components/collection-card";
import { CollectionRail } from "../components/collection-rail";
import { CatalogCallout, Eyebrow, Photo } from "../components/editorial";
import { CatalogButton } from "../components/inquiry-form";
import { Icon } from "../components/icons";

const chapters = [
  {
    id: "menu-presentation",
    titleKey: "chapterMenu",
    descriptionKey: "chapterMenuText",
    collections: ["menu-covers", "menu-boards", "menu-holders", "menu-inserts", "digital-menus"],
  },
  {
    id: "table-details",
    titleKey: "chapterTable",
    descriptionKey: "chapterTableText",
    collections: ["restaurant-accessories", "table-service", "product-sets", "samples"],
  },
  {
    id: "guest-spaces",
    titleKey: "chapterVenue",
    descriptionKey: "chapterVenueText",
    collections: ["hotel-guest-folders", "signage", "wall-menu-boards"],
  },
] as const;

export default function Products({ locale }: { locale: Locale }) {
  const { t, collections, editorial } = getContent(locale);
  return (
    <>
      <section className="products-masthead burgundy-panel">
        <div className="shell products-masthead-inner">
          <div>
            <Eyebrow>{t.productsEyebrow}</Eyebrow>
            <h1>{t.productsFirst}<br /><em>{t.productsSecond}</em></h1>
            <p>{t.productsIntro}</p>
            <CatalogButton className="text-link">{t.requestCatalog} <Icon name="arrow" /></CatalogButton>
          </div>
          <Photo image={editorial.hero} className="products-cover-photo" priority />
        </div>
      </section>
      <nav className="collection-jump" aria-label={t.browseGroups}>
        <div className="shell">
          {chapters.map(({ id, titleKey }) => <a key={id} href={`#${id}`}>{t[titleKey]} <Icon name="arrow" width="15" height="15" /></a>)}
        </div>
      </nav>
      {chapters.map(({ id, titleKey, descriptionKey, collections: ids }) => (
        <section key={id} id={id} className="product-chapter" aria-labelledby={`${id}-title`}>
          <div className="shell">
            <div className="section-heading scroll-entrance">
              <h2 id={`${id}-title`}>{t[titleKey]}</h2>
              <p>{t[descriptionKey]}</p>
            </div>
            <CollectionRail previousLabel={t.previous} nextLabel={t.next} labelledBy={`${id}-title`}>
              {ids.map((collectionId) => {
                const collection = collections.find(({ id }) => id === collectionId)!;
                return <li key={collectionId}><CollectionCard locale={locale} collection={collection} sizes="(max-width: 680px) 80vw, 40vw" /></li>;
              })}
            </CollectionRail>
            {id === "menu-presentation" && <Link className="text-link" href={localizedPath(locale, menuDesignPath)}>{t.menuDesignDetails} <Icon name="arrow" /></Link>}
            {id === "table-details" && <Link className="text-link" href={localizedPath(locale, waiterFoldersPath)}>{t.waiterFolderDetails} <Icon name="arrow" /></Link>}
          </div>
        </section>
      ))}
      <CatalogCallout locale={locale} />
    </>
  );
}
