import { execFileSync } from "node:child_process";
import { mkdir, rename, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { build } from "esbuild";

const require = createRequire(import.meta.url);

execFileSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  env: { ...process.env, FOLIA_SITES_BUILD: "1" },
  stdio: "inherit",
});

await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await rename("out", "dist/client");
await build({
  entryPoints: ["hosting/worker.ts"],
  outfile: "dist/server/index.js",
  bundle: true,
  format: "esm",
  target: "es2022",
  define: {
    "process.env.NEXT_PUBLIC_FOLIA_EMAIL": JSON.stringify(process.env.NEXT_PUBLIC_FOLIA_EMAIL || ""),
    "process.env.NEXT_PUBLIC_FOLIA_INSTAGRAM_URL": JSON.stringify(process.env.NEXT_PUBLIC_FOLIA_INSTAGRAM_URL || ""),
  },
});
