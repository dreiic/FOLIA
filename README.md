# Folia

Hospitality design and supply website, built with Next.js and TypeScript.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm start
```

## Pages and content

The product overview is at `/products`. Each collection has its own page at `/products/[slug]`, generated from `lib/content.ts`. That file also holds studio contact information, collection descriptions, and design services.

The website introduces the collection and encourages a conversation by WhatsApp or email. Catalog requests open those contact channels with a prepared message. The contact page lets visitors compose a brief for their venue and continue in WhatsApp or their email app. Phone and SMS links use the same number.

The website currently uses English. Multilingual navigation and translation are a subsequent step.

## Photography

Sixteen new editorial photographs were generated with the built-in image-generation tool using the supplied Folia logo and burgundy campaign image as visual references. They are illustrative presentation images. Their subjects cover all twelve collections, a menu design session, a restaurant interior, the homepage, and a hospitality website.

Final images and responsive derivatives are in `public/photography/`. Their actual native dimensions, final prompts, alternative text, and asset paths are recorded in `brand/photography-prompts.json`. Native product images are 1536 × 1024. The restaurant panorama is 1774 × 887. Responsive exports preserve native resolution and add smaller versions. `lib/image-loader.ts` and `lib/image-widths.json` select the available size.

The supplied wordmark is retained as a transparent mask in `public/editorial/folia-wordmark.png`.

## Hosting

`npm run build:sites` produces prerendered pages in `dist/client` and a Worker at `dist/server/index.js`. Site identity is preserved in `.openai/hosting.json`.

The existing `POST /api/inquiry` integration remains available for future server-side email delivery. Its optional settings are in `.env.example`. The current visitor flow uses direct WhatsApp and email links.
