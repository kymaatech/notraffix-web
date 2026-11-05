import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SOLUTIONS } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/solutions", "/projects", "/about", "/enquiry", ...SOLUTIONS.map((s) => `/solutions/${s.slug}`)].map((p) => ({ url: `${SITE.url}${p}`, priority: p === "" ? 1 : 0.7 }));
}
