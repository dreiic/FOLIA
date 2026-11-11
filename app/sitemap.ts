import type { MetadataRoute } from "next";
import { locales } from "../lib/routing";
import { pageUrl, sitePagePaths } from "../lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePagePaths.flatMap((path) => locales.map(({ id }) => ({
    url: pageUrl(id, path),
  })));
}
