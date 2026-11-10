import Link from "next/link";
import type { Metadata } from "next";
import { Arrow, CatalogCallout, Eyebrow, Photo } from "../../components/editorial";
import { editorial } from "../../lib/content";

export const metadata: Metadata = {
  title: "About the Studio",
  description: "Folia is a hospitality design and supply studio focused on curated materials, thoughtful presentation, and personalization.",
};

export default function About() {
  return (
    <>
      <section className="shell hero inner-hero">
        <div className="hero-copy">
          <Eyebrow>Folia / The studio</Eyebrow>
          <h1>Designed to Leave <em>an Impression.</em></h1>
          <p className="hero-lede">FOLIA is a hospitality-focused design and supply studio bringing together carefully selected materials, refined presentation, and personalized solutions for distinctive spaces.</p>
        </div>
        <figure className="hero-figure">
          <Photo image={editorial.process} className="hero-image" priority />
          <figcaption className="image-caption"><span>Folia studio / Design &amp; finish</span></figcaption>
        </figure>
      </section>
      <section className="shell approach">
        <div><Eyebrow>01 / Our philosophy</Eyebrow><h2>Every detail<br /><em>contributes.</em></h2></div>
        <div className="approach-copy">
          <p>Every detail contributes to an experience. We believe that menus, presentation pieces, and thoughtfully chosen materials should feel as considered as the hospitality they represent.</p>
          <p>We work with you to select materials, refine colors and finishes, and adapt each piece to your space. Our production partners then make the pieces to the agreed design.</p>
          <Link className="text-link" href="/products">Explore the Collections <Arrow /></Link>
        </div>
      </section>
      <section className="collection-band">
        <div className="shell split-section">
          <Photo image={editorial.leather} className="square-photo" />
          <div className="split-copy">
            <Eyebrow>02 / Made to belong</Eyebrow>
            <h2>Made to feel<br /><em>at home.</em></h2>
            <p>From the texture of a menu cover to the way a logo sits on a guest folder, we help you choose details that feel right for the people and spaces they serve.</p>
            <Link className="text-link" href="/contact">Start a Conversation <Arrow /></Link>
          </div>
        </div>
      </section>
      <CatalogCallout />
    </>
  );
}
