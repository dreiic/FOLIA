import type { Metadata } from "next";
import { ContactDetails } from "../../components/contact-details";
import { Eyebrow, Photo } from "../../components/editorial";
import { ProjectInquiry } from "../../components/project-inquiry";
import { editorial } from "../../lib/content";

export const metadata: Metadata = {
  title: "Contact the Studio",
  description: "Talk to Folia in Podgorica about custom menus, hospitality presentation, QR menus, or a website for your venue. Contact us by WhatsApp, telephone, SMS, or email.",
};

export default function Contact() {
  return (
    <>
      <section className="shell contact-page">
        <div className="contact-copy">
          <Eyebrow>Let’s talk about your space.</Eyebrow>
          <h1>A good project<br />starts with<br /><em>a conversation.</em></h1>
          <p>A new opening, a menu refresh, or a detail you’ve been thinking about. Tell us where you’d like to begin.</p>
          <ContactDetails />
        </div>
        <div className="contact-panel">
          <Photo image={editorial.process} className="contact-photo" priority />
          <div className="contact-panel-copy burgundy-panel">
            <Eyebrow>Your project</Eyebrow>
            <h2>What do you have in mind?</h2>
            <ProjectInquiry />
          </div>
        </div>
      </section>
    </>
  );
}
