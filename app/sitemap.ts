import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const routes = [
    "",
    "/react-query/server",
    "/react-query/client",
    "/react-query/fullstack",
    "/react-query/suspense",
    "/react/use-hook",
    "/react/use-cache",
    "/swr/client",
    "/swr/fullstack",
    "/swr/suspense",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
