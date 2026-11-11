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

For the `folia` Worker in Cloudflare Workers Builds, use the repository root and `npx wrangler deploy` as the deploy command. The separate build command can be left blank because Wrangler runs `npm run build:sites` from `wrangler.jsonc`. Set `NEXT_PUBLIC_FOLIA_SITE_URL` to the production URL in the build environment for canonical links.

The existing `POST /api/inquiry` integration remains available for future server-side email delivery. Its optional settings are in `.env.example`. The current visitor flow uses direct WhatsApp and email links.

## Folia assistant

Set the encrypted `ANTHROPIC_API_KEY` secret on the production `folia` Cloudflare Worker. Use a key scoped to one Claude workspace, or set `ANTHROPIC_WORKSPACE_ID` with the selected workspace ID. The optional `FOLIA_CHAT_MODEL` variable overrides the default Claude Haiku model. For local Next.js development, use an ignored `.env.local`; for local Wrangler development, use an ignored `.env.local` or supply the secret as a runtime environment variable.

The assistant uses the Folia collection guides, catalogue models and portfolio. Update `lib/chat/catalog-reference.json` when the PDF model codes change. The Worker limits requests, keeps the provider key server-side, and stores no chat history. Visitors can choose to send a prepared inquiry through WhatsApp or email. The widget offers both contact links when chat is unavailable.

## Parallax hero

The homepage hero uses three coordinated generated restaurant layers in `public/parallax/` (warm interior, linen curtain, and a foreground table with a burgundy Folia menu), with the original Folia wordmark as the center layer. Prompts are recorded in `brand/parallax-photography-prompts.json`. The implementation is in `components/parallax-hero.tsx`. GSAP ScrollTrigger drives the four layer speeds and Lenis smooths desktop wheel scrolling. Mobile uses a gentler motion range. Reduced-motion preferences keep the scene static. The timeline, ticker callback, and scrolling instance are cleaned up when the hero unmounts.
