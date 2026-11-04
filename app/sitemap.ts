export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { published, siteUrl, directions } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return published
    ? ["", ...directions.map((d) => `/directions/${d.slug}`)].map((path) => ({
        url: `${siteUrl}${path}/`,
      }))
    : [];
}
