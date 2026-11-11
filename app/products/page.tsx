import type { Metadata } from "next";
import { collections, editorial } from "../../lib/content";
import { CollectionCard } from "../../components/collection-card";
import { CollectionRail } from "../../components/collection-rail";
import { CatalogCallout, Eyebrow, Photo } from "../../components/editorial";
import { CatalogButton } from "../../components/inquiry-form";
import { Icon } from "../../components/icons";

export const metadata: Metadata = {
  title: "Hospitality Collections",
  description: "Discover custom menu covers, guest folders, tabletop accessories, signs, and digital menus. Explore each Folia collection and discuss your project with us.",
};

const chapters = [
  {
    id: "menu-presentation",
    title: "Menu presentation",
    description: "Choose how guests read your menu, from the cover and binding to the printed pages or a QR display.",
    collections: ["menu-covers", "menu-boards", "menu-holders", "menu-inserts", "digital-menus"],
  },
  {
    id: "table-details",
    title: "At the table",
    description: "Coordinate the pieces guests and staff handle throughout service.",
    collections: ["restaurant-accessories", "table-service", "product-sets", "samples"],
  },
  {
    id: "guest-spaces",
    title: "Around the venue",
    description: "Give guests clear information at the counter, at reception, and in their rooms.",
    collections: ["hotel-guest-folders", "signage", "wall-menu-boards"],
  },
];

export default function Products() {
  return (
    <>
      <section className="products-masthead burgundy-panel">
        <div className="shell products-masthead-inner">
          <div>
            <Eyebrow>The Folia collections</Eyebrow>
            <h1>For the table.<br /><em>For the whole experience.</em></h1>
            <p>Presentation essentials for restaurants, hotels, bars, and cafés.</p>
            <CatalogButton className="text-link">Request the catalog <Icon name="arrow" /></CatalogButton>
          </div>
          <Photo image={editorial.hero} className="products-cover-photo" priority />
        </div>
      </section>
      <nav className="collection-jump" aria-label="Browse collection groups">
        <div className="shell">
          {chapters.map(({ id, title }) => <a key={id} href={`#${id}`}>{title} <Icon name="arrow" width="15" height="15" /></a>)}
        </div>
      </nav>
      {chapters.map(({ id, title, description, collections: ids }) => (
        <section key={id} id={id} className="product-chapter" aria-labelledby={`${id}-title`}>
          <div className="shell">
            <div className="section-heading scroll-entrance">
              <h2 id={`${id}-title`}>{title}</h2>
              <p>{description}</p>
            </div>
            <CollectionRail labelledBy={`${id}-title`}>
              {ids.map((collectionId) => {
                const collection = collections.find(({ id }) => id === collectionId)!;
                return <li key={collectionId}><CollectionCard collection={collection} sizes="(max-width: 680px) 80vw, 40vw" /></li>;
              })}
            </CollectionRail>
          </div>
        </section>
      ))}
      <CatalogCallout />
    </>
  );
}
