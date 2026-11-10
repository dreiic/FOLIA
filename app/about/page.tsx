import type { Metadata } from "next";
import { CatalogCallout, Eyebrow, LeadActions, Photo } from "../../components/editorial";
import { editorial } from "../../lib/content";

export const metadata: Metadata = {
  title: "The Folia Studio",
  description: "Folia brings together hospitality product supply, menu design, QR menus, and websites. A personal approach to the presentation of your venue, based in Podgorica.",
};

export default function About() {
  return (
    <>
      <section className="shell about-hero">
        <div className="about-title">
          <Eyebrow>The Folia studio</Eyebrow>
          <h1>Designed around<br />your hospitality.</h1>
          <p>Folia is a design and supply studio based in Podgorica, Montenegro. We work with restaurants, hotels, bars, and cafés on the details their guests see and use.</p>
        </div>
        <Photo image={editorial.process} className="about-photo" priority sizes="(max-width: 760px) 100vw, 65vw" />
      </section>
      <section className="shell studio-intro">
        <div><Eyebrow>A personal approach</Eyebrow><h2>Your space is<br />the starting point.</h2></div>
        <div>
          <p>Sometimes a project begins with a new menu cover. Sometimes it’s a complete menu redesign, a hotel guest folder, a QR menu, or a new website.</p>
          <p>We help you make those decisions together, from layout and typography to materials and finishing. We coordinate with production partners for the physical pieces and develop digital presentation around the same identity.</p>
          <LeadActions />
        </div>
      </section>
      <section className="about-setting">
        <Photo image={editorial.dining} className="about-setting-photo" sizes="100vw" />
        <div className="about-setting-note"><Eyebrow>Restaurants. Hotels. Cafés. Bars.</Eyebrow><h2>The same care.<br />A different character.</h2><p>Each venue has its own way of welcoming people. Your presentation should feel like yours.</p></div>
      </section>
      <CatalogCallout />
    </>
  );
}
