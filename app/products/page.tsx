import type { Metadata } from "next";
import { CatalogDirectory } from "../../components/catalog-directory";
import { Arrow, CatalogCallout, Eyebrow } from "../../components/editorial";
import { CatalogButton } from "../../components/inquiry-form";
import { catalogPath } from "../../lib/content";

export const metadata: Metadata = {
  title: "Our Collections",
  description: "Explore Folia’s menu covers, presentation boards, tableware, signs, guest folders, and QR and NFC solutions for hospitality.",
};

export default function Products() {
  return (
    <>
      <section className="shell page-heading">
        <Eyebrow>Folia / The collections</Eyebrow>
        <h1>Our <em>Collections.</em></h1>
        <p>A considered selection of customizable essentials for restaurants, hotels, and hospitality spaces.</p>
        <div className="actions">
          <CatalogButton className="button button-primary">Request Full Catalog <Arrow diagonal /></CatalogButton>
          <a href={catalogPath} className="text-link" download>Download PDF <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <CatalogDirectory />
      <CatalogCallout productPage />
    </>
  );
}
