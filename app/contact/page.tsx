import type { Metadata } from "next";
import { Eyebrow } from "../../components/editorial";
import { InquiryForm } from "../../components/inquiry-form";
import { ContactDetails } from "../../components/site-chrome";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Folia to request a catalog or talk about a hospitality design project.",
};

export default function Contact() {
  return (
    <section className="shell contact-page">
      <div className="contact-copy">
        <Eyebrow>Folia / Contact</Eyebrow>
        <h1>Let’s Create<br /><em>Something Together.</em></h1>
        <p>Whether you’re exploring our collection or have a specific project in mind, we’d love to hear about it.</p>
        <div className="contact-details">
          <Eyebrow>Studio details</Eyebrow>
          <ContactDetails />
        </div>
      </div>
      <div className="contact-panel" id="inquiry">
        <Eyebrow>Project inquiries</Eyebrow>
        <h2>Tell us what you have in mind.</h2>
        <InquiryForm mode="contact" />
      </div>
    </section>
  );
}
