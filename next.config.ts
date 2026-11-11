import type { NextConfig } from "next";

const sitesBuild = process.env.FOLIA_SITES_BUILD === "1";

const config: NextConfig = {
  ...(sitesBuild ? { output: "export", trailingSlash: true } : {}),
  pageExtensions: sitesBuild ? ["tsx", "ts"] : ["tsx", "ts", "server.ts"],
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 960, 1440, 2048, 3072],
  },
  poweredByHeader: false,
  experimental: { globalNotFound: true },
  turbopack: { root: process.cwd() },
  agentRules: false,
  devIndicators: false,
};

export default config;
