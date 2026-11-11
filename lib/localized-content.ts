import en from "./locales/en.json";
import me from "./locales/me.json";
import ru from "./locales/ru.json";
import collectionsMe from "./locales/collections-me.json";
import collectionsRu from "./locales/collections-ru.json";
import { collections, editorial, services } from "./content";
import { collectionGuides } from "./collection-guide";
import { presentation } from "./locales/presentation";
import type { Locale } from "./routing";

export type Messages = typeof en;
const messages: Record<Locale, Messages> = { me, en, ru };

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

type CollectionTranslation = {
  title: string;
  short: string;
  detail: string;
  examples: string[];
  alt: string;
  options: string[][];
  brief: string;
};

const collectionTranslations: Record<Exclude<Locale, "en">, Record<string, CollectionTranslation>> = {
  me: collectionsMe,
  ru: collectionsRu,
};

export function getContent(locale: Locale) {
  const localized = presentation[locale];
  const alt = localized.alt as Record<keyof typeof editorial, string>;
  const photos = Object.fromEntries(Object.entries(editorial).map(([key, photo]) => [
    key, { ...photo, alt: alt[key as keyof typeof editorial] },
  ])) as Record<keyof typeof editorial, { src: string; alt: string }>;

  return {
    t: messages[locale],
    editorial: photos,
    materials: localized.materials,
    services: services.map((service, index) => ({
      ...service,
      ...localized.services[index],
      image: { ...service.image, alt: service.id === "qr-menus" ? alt.qr : service.id === "website-design" ? alt.website : alt.process },
    })),
    collections: collections.map((collection) => {
      const guide = collectionGuides[collection.id];
      if (locale === "en") return { ...collection, guide };
      const { title, short, detail, examples, alt, options, brief } = collectionTranslations[locale][collection.id];
      return {
        ...collection, title, short, detail, examples, image: { ...collection.image, alt },
        guide: { ...guide, options: options.map(([label, description]) => ({ label, description })), brief },
      };
    }),
  };
}
