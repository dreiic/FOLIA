import type { Metadata } from "next";
import { collections } from "../../lib/content";
import { CollectionCard } from "../../components/collection-card";
import { CatalogCallout, Eyebrow } from "../../components/editorial";
import { CatalogButton } from "../../components/inquiry-form";
import { Icon } from "../../components/icons";

export const metadata: Metadata = {
  title: "Hospitality Collections",
  description: "Discover custom menu covers, guest folders, tabletop accessories, signs, and digital menus. Explore each Folia collection and discuss your project with us.",
};

export default function Products() {
  return (
    <>
      <section className="shell page-heading collections-heading">
        <div><Eyebrow>The Folia collections</Eyebrow><h1>For the table.<br />For the whole experience.</h1></div>
        <div><p>Presentation essentials for restaurants, hotels, bars, and cafés. Explore a collection, then let’s make it yours.</p><CatalogButton className="text-link">Request the catalog <Icon name="arrow" /></CatalogButton></div>
      </section>
      <section className="shell collection-overview" aria-label="Product collections">
        <div className="collection-grid">
          {collections.map((collection, index) => <CollectionCard key={collection.id} collection={collection} priority={index < 3} />)}
        </div>
      </section>
      <CatalogCallout />
    </>
  );
}
