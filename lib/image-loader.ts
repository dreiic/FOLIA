"use client";

import type { ImageLoaderProps } from "next/image";
import imageWidths from "./image-widths.json";

const variants: Record<string, number[]> = imageWidths;

export default function photographyLoader({ src, width }: ImageLoaderProps) {
  const name = src.match(/^\/photography\/([a-z-]+)\.webp$/)?.[1];
  const widths = name ? variants[name] : undefined;
  if (!name || !widths?.length) return src;
  const selected = widths.find((size) => size >= width) ?? widths[widths.length - 1];
  return `/photography/${name}-${selected}.webp`;
}
