import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collectionFinishes, collections, editorial } from "../../../lib/content";
import { CatalogCallout, Eyebrow, LeadActions, Photo } from "../../../components/editorial";
import { CollectionCard } from "../../../components/collection-card";
import { CatalogButton } from "../../../components/inquiry-form";
import { Icon } from "../../../components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find(({ id }) => id === slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.short,
    alternates: { canonical: `/products/${collection.id}` },
    openGraph: { images: [{ url: collection.image.src, alt: collection.image.alt }] },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find(({ id }) => id === slug);
  if (!collection) notFound();
  const related = collections.filter(({ id }) => id !== slug).slice(0, 3);

  return (
    <>
      <div className="shell breadcrumb">
        <Link href="/products">Collections</Link><span aria-hidden="true">/</span><span>{collection.title}</span>
      </div>
      <section className="shell collection-hero">
        <div className="collection-hero-copy">
          <Eyebrow>Folia collection</Eyebrow>
          <h1>{collection.title}</h1>
          <p>{collection.detail}</p>
          <LeadActions topic={collection.title} />
        </div>
        <Photo image={collection.image} className="collection-hero-photo" priority />
      </section>
      <section className="shell collection-options">
        <div><Eyebrow>Explore the possibilities</Eyebrow><h2>Made around<br />your venue.</h2></div>
        <div className="options-copy">
          <p>{collection.short}</p>
          <ul className="option-lines">{collection.examples.map((example) => <li key={example}><Icon name="arrow" width="17" height="17" />{example}</li>)}</ul>
          <CatalogButton className="text-link">Ask for the full collection <Icon name="arrow" width="17" height="17" /></CatalogButton>
        </div>
      </section>
      {slug === "digital-menus" ? (
        <section className="digital-detail-band">
          <div className="shell split-section">
            <Photo image={editorial.website} className="landscape-photo" />
            <div className="split-copy">
              <Eyebrow>From the table to your website</Eyebrow>
              <h2>One identity.<br />Every touchpoint.</h2>
              <p>Alongside custom QR menus, we design websites for hotels, restaurants, bars, and cafés. Bring your story, menu, and contact details into one consistent online experience.</p>
              <LeadActions topic="Website design & digital menus" />
            </div>
          </div>
        </section>
      ) : (
        <section className="personalization-band">
          <div className="shell personalization-inner">
            <Eyebrow>Personalization</Eyebrow>
            <h2>From your logo<br />to the finishing touch.</h2>
            <p>We work with you on the design, layout, material, and finish. Tell us what you like about your current presentation and what you’d like to change.</p>
            <div className="material-tags">{collectionFinishes[slug].map((material) => <span key={material}>{material}</span>)}</div>
          </div>
        </section>
      )}
      <section className="shell related-section">
        <div className="section-heading"><div><Eyebrow>Complete the presentation</Eyebrow><h2>Made to work together.</h2></div><Link href="/products" className="text-link">All collections <Icon name="arrow" /></Link></div>
        <div className="collection-grid">{related.map((item) => <CollectionCard key={item.id} collection={item} />)}</div>
      </section>
      <CatalogCallout />
    </>
  );
}
