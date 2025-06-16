import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";

import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://blog.angor.io",
  image: {
    domains: ["images.unsplash.com"],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "ar", "fa"],
    fallback: {
      fr: "en",
      ar: "en",
      fa: "en",
    },
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: true,
  integrations: [sitemap({
    i18n: {
      defaultLocale: "en", 
      locales: {
        en: "en", 
        fr: "fr",
        ar: "ar",
        fa: "fa",
      },
    },
  }), compressor({
    gzip: false,
    brotli: false,
  }), mdx()],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
