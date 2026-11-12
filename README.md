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

For the `folia` Worker in Cloudflare Workers Builds, use the repository root and `npx wrangler deploy` as the deploy command. The separate build command can be left blank because Wrangler runs `npm run build:sites` from `wrangler.jsonc`. Canonical links and the sitemap use the production domain defined in `lib/seo.ts`, including on preview builds.

The chat collects the customer's name and phone before the first message. The `CHAT_SESSIONS` Durable Object schedules a contact email at registration and a second email with the summary and visitor messages at confirmation or after 65 seconds of inactivity. The worker retains delivery data until Resend accepts the emails. Set `RESEND_API_KEY` as a Worker secret and `FOLIA_INQUIRY_FROM` to an address on a verified sending domain. `FOLIA_INQUIRY_TO` overrides the automated delivery address, which defaults to `office.folia@gmail.com`. The site's public email links use `NEXT_PUBLIC_FOLIA_EMAIL` independently.

## Folia assistant

Set the encrypted `ANTHROPIC_API_KEY` secret on the production `folia` Cloudflare Worker. Use a key scoped to one Claude workspace, or set `ANTHROPIC_WORKSPACE_ID` with the selected workspace ID. By default the assistant uses Claude Sonnet 5.5, with Haiku as a fallback if the workspace rejects the model request. The optional `FOLIA_CHAT_MODEL` variable overrides this choice. For local Next.js development, use an ignored `.env.local`; for local Wrangler development, use an ignored `.env.local` or supply the secret as a runtime environment variable.

The assistant uses the full Folia collection guides, catalogue models, services and portfolio. Update `lib/chat/catalog-reference.json` when the PDF model codes change. The Worker limits requests and keeps provider keys and contact form details separate from the Claude request. Use `wrangler dev` to test the chat session binding locally. The widget offers direct contact links when chat is unavailable.

## Parallax hero

The homepage hero uses three coordinated generated restaurant layers in `public/parallax/` (warm interior, linen curtain, and a foreground table with a burgundy Folia menu), with the original Folia wordmark as the center layer. Prompts are recorded in `brand/parallax-photography-prompts.json`. The implementation is in `components/parallax-hero.tsx`. GSAP ScrollTrigger drives the four layer speeds and Lenis smooths desktop wheel scrolling. Mobile uses a gentler motion range. Reduced-motion preferences keep the scene static. The timeline, ticker callback, and scrolling instance are cleaned up when the hero unmounts.
