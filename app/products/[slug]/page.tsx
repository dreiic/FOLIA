import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, editorial } from "../../../lib/content";
import { Eyebrow, LeadActions, Photo } from "../../../components/editorial";
import { collectionGuides } from "../../../lib/collection-guide";
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
  const guide = collectionGuides[slug];
  const related = guide.related.map((id) => collections.find((item) => item.id === id)!);

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
      <section className="shell product-guide" aria-labelledby="product-guide-title">
        <div className="product-guide-heading scroll-entrance">
          <h2 id="product-guide-title">Options &amp; details</h2>
          <ul className="product-guide-examples">
            {collection.examples.map((example) => <li key={example}>{example}</li>)}
          </ul>
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
          <h2>Tell us what you need.</h2>
          <div>
            <p>{guide.brief}</p>
            <LeadActions topic={collection.title} />
            <CatalogButton className="text-link">Request the catalog <Icon name="arrow" width="17" height="17" /></CatalogButton>
          </div>
        </div>
      </section>
      {slug === "digital-menus" && (
        <section className="digital-detail-band">
          <div className="shell split-section">
            <Photo image={editorial.website} className="landscape-photo" />
            <div className="split-copy">
              <Eyebrow>Websites for hospitality</Eyebrow>
              <h2>Bring your menu to your website.</h2>
              <p>Alongside custom QR menus, we design websites for hotels, restaurants, bars, and cafés, with your story, menu, and contact details in one place.</p>
              <LeadActions topic="Website design & digital menus" />
            </div>
          </div>
        </section>
      )}
      <section className="shell related-section">
        <div className="section-heading"><h2>Related collections</h2><Link href="/products" className="text-link">All collections <Icon name="arrow" /></Link></div>
        <div className="collection-grid">{related.map((item) => <CollectionCard key={item.id} collection={item} />)}</div>
      </section>
    </>
  );
}
