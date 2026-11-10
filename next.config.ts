import type { NextConfig } from "next";

const sitesBuild = process.env.FOLIA_SITES_BUILD === "1";

const config: NextConfig = {
  ...(sitesBuild ? { output: "export", trailingSlash: true } : {}),
  pageExtensions: sitesBuild ? ["tsx", "ts"] : ["tsx", "ts", "server.ts"],
  images: { unoptimized: sitesBuild },
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  agentRules: false,
  devIndicators: false,
};

export default config;
