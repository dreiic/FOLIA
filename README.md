# Folia website

English-language hospitality portfolio and informational catalog built with Next.js and TypeScript.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

The pages are at `/`, `/products`, `/about`, and `/contact`. Edit categories, studio details, and photography in `lib/content.ts`, and the searchable formats and variations in `lib/catalog-models.json`. Replace the catalog at `public/catalog/folia-hospitality-catalog.pdf`. The downloadable PDF preserves the supplied catalog’s selection. The web catalog includes the wider range.

## Inquiry delivery

Copy `.env.example` to `.env.local` for local development. Configure the mail settings on the server or in the Sites runtime environment. The From address must be on a [domain verified with Resend](https://resend.com/docs/dashboard/domains/introduction). Inquiries default to office.folia@gmail.com. FOLIA_INQUIRY_TO can override the recipient. The visitor’s address is set as Reply-To.

Both forms use `POST /api/inquiry`. The endpoint validates input and returns success after Resend accepts the message. When mail delivery is unconfigured, the endpoint returns an unavailable response and keeps the visitor’s form values available for retry. Studio email and Instagram links use the optional public configuration. The WhatsApp link uses +382 69 990 978. Configure these details in lib/content.ts.

`npm run build:sites` produces prerendered pages in `dist/client` and a Worker at `dist/server/index.js` for the same inquiry endpoint.

## Image notes

The supplied Folia campaign images are used directly. The original wordmark’s letter shapes are preserved in a transparent mask.

The linen guest-folder image is an illustrative product mockup created with the built-in image-generation tool. Its prompt called for a warm, naturally lit linen hotel folder with an ivory insert on walnut, in a restrained hospitality product photograph. It is stored at `public/editorial/guest-folder.webp`.

Three catalog photographs were cleaned with the built-in image-generation tool. Their prompt requested removal of visible supplier lettering, matching the surrounding leather grain while preserving the product geometry, pockets, stitching, stud, color, money, hands, table setting, lighting, and crop. No new branding was added. The source derivatives are kept in `brand/catalog-cleanup/`.

### Generation prompts

The guest-folder asset uses the top-right scene of a generated contact sheet. The prompt was:

> Create an editorial contact-sheet asset with a precise 2 by 2 grid of four separate horizontal photographs, equal quadrants, zero borders, and zero gutter. Center every scene in its quadrant. Landscape 4:3 canvas. Top left, stacked burgundy leather and oatmeal woven restaurant menu covers on warm travertine. Top right, an open linen hotel guest folder, cream paper with tasteful illegible type, a walnut table, and morning light. Bottom left, a chocolate leather check presenter beside a steel teaspoon and folded linen. Bottom right, an elegant phone displaying a cream and oxblood fine-dining menu with “The Menu” in serif type. Deep shadows, neutral earth palette, natural window light, honest textures. No overlapping scenes, labels, decorative borders, or watermarks.

The main and open-presenter cleanup prompt was:

> Edit only the stamped manufacturer brand lettering on this leather check presenter. Remove every visible instance of the supplier name and subtitle. Reconstruct the area as plain leather with continuous matching natural grain. Preserve the exact presenter shape, pockets, stitching, stud, leather color, money, hands, table setting, lighting, crop, and camera angle. Keep all other content unchanged. Add no brand or new text. Preserve the aspect ratio.

The closed-presenter cleanup prompt was:

> Remove only the stamped supplier name and subtitle on the closed tan leather check presenter. Reconstruct that small area as uninterrupted tan leather grain matching its immediate surroundings. Keep the framing, camera angle, orientation, background plate and plant, stitching, leather color, product edges, shadows, and all other details unchanged. Leave the cover blank. Preserve the square aspect ratio.
