// Dynamic Link Management System for Multilingual Blog
import type { CollectionEntry } from "astro:content";

export type SupportedLocale = "en" | "fr" | "ar" | "fa";
export type ContentType = "blog";

interface LinkConfig {
  locale?: SupportedLocale;
  contentType: ContentType;
  slug: string;
  includeTrailingSlash?: boolean;
}

interface PageConfig {
  locale?: SupportedLocale;
  page: string;
  includeTrailingSlash?: boolean;
}

/**
 * Professional link manager for dynamic URL generation
 * Handles all content types and locales consistently
 */
export class LinkManager {
  private static readonly DEFAULT_LOCALE: SupportedLocale = "en";
  private static readonly SUPPORTED_LOCALES: SupportedLocale[] = ["en", "fr", "ar", "fa"];
  
  /**
   * Generate content URLs (blog posts)
   */
  static generateContentUrl(config: LinkConfig): string {
    const { locale, contentType, slug, includeTrailingSlash = true } = config;
    
    // Clean the slug from any locale prefix
    const cleanSlug = this.cleanSlugFromLocale(slug);
    
    // Build the URL path
    const pathSegments: string[] = [];
    
    // Add locale prefix if not default locale
    if (locale && locale !== this.DEFAULT_LOCALE) {
      pathSegments.push(locale);
    }
    
    // Add content type
    pathSegments.push(contentType);
    
    // Add cleaned slug
    pathSegments.push(cleanSlug);
    
    // Construct final URL
    const path = "/" + pathSegments.join("/");
    return includeTrailingSlash ? `${path}/` : path;
  }
  
  /**
   * Generate page URLs (index, contact, etc.)
   */
  static generatePageUrl(config: PageConfig): string {
    const { locale, page, includeTrailingSlash = true } = config;
    
    const pathSegments: string[] = [];
    
    // Add locale prefix if not default locale
    if (locale && locale !== this.DEFAULT_LOCALE) {
      pathSegments.push(locale);
    }
    
    // Add page (if not index)
    if (page !== "index" && page !== "") {
      pathSegments.push(page);
    }
    
    // Construct final URL
    const path = pathSegments.length > 0 ? "/" + pathSegments.join("/") : "/";
    return includeTrailingSlash && path !== "/" ? `${path}/` : path;
  }
  
  /**
   * Generate blog post URL from collection entry
   */
  static generateBlogUrl(blogEntry: CollectionEntry<"blog">, locale?: SupportedLocale): string {
    const detectedLocale = locale || this.detectLocaleFromId(blogEntry.id);
    const cleanSlug = this.cleanSlugFromLocale(blogEntry.id);
    
    return this.generateContentUrl({
      locale: detectedLocale,
      contentType: "blog",
      slug: cleanSlug
    });
  }
  
  /**
   * Generate navigation URLs
   */
  static generateNavUrl(page: string, locale?: SupportedLocale): string {
    return this.generatePageUrl({
      locale,
      page
    });
  }
  
  /**
   * Clean slug from any locale prefix
   */
  private static cleanSlugFromLocale(slug: string): string {
    // Remove locale prefixes like "ar/", "fa/", "fr/", "en/"
    return slug.replace(/^(ar|fa|fr|en)\//, "");
  }
  
  /**
   * Detect locale from content ID
   */
  private static detectLocaleFromId(id: string): SupportedLocale {
    for (const locale of this.SUPPORTED_LOCALES) {
      if (id.startsWith(`${locale}/`)) {
        return locale;
      }
    }
    return this.DEFAULT_LOCALE;
  }
  
  /**
   * Validate if locale is supported
   */
  static isValidLocale(locale: string): locale is SupportedLocale {
    return this.SUPPORTED_LOCALES.includes(locale as SupportedLocale);
  }
  
  /**
   * Get all supported locales
   */
  static getSupportedLocales(): SupportedLocale[] {
    return [...this.SUPPORTED_LOCALES];
  }
  
  /**
   * Generate canonical URL for SEO
   */
  static generateCanonicalUrl(baseUrl: string, config: LinkConfig | PageConfig): string {
    const path = "contentType" in config 
      ? this.generateContentUrl(config)
      : this.generatePageUrl(config);
    
    return new URL(path, baseUrl).toString();
  }
  
  /**
   * Generate alternate language URLs for SEO
   */
  static generateAlternateUrls(baseUrl: string, config: LinkConfig | PageConfig): Array<{locale: SupportedLocale, url: string}> {
    return this.SUPPORTED_LOCALES.map(locale => ({
      locale,
      url: this.generateCanonicalUrl(baseUrl, { ...config, locale })
    }));
  }
}

/**
 * Convenience functions for common use cases
 */

// Blog URL helpers
export const generateBlogPostUrl = (blogEntry: CollectionEntry<"blog">, locale?: SupportedLocale) => 
  LinkManager.generateBlogUrl(blogEntry, locale);

export const generateBlogIndexUrl = (locale?: SupportedLocale) => 
  LinkManager.generatePageUrl({ locale, page: "blog" });

// Page URL helpers
export const generateHomeUrl = (locale?: SupportedLocale) => 
  LinkManager.generatePageUrl({ locale, page: "index" });

export const generateContactUrl = (locale?: SupportedLocale) => 
  LinkManager.generatePageUrl({ locale, page: "contact" });

export const generateNostrArticlesUrl = (locale?: SupportedLocale) => 
  LinkManager.generatePageUrl({ locale, page: "nostr-articles" });

// Navigation helper
export const generateNavLinks = (locale?: SupportedLocale) => ({
  home: generateHomeUrl(locale),
  blog: generateBlogIndexUrl(locale),
  contact: generateContactUrl(locale),
  nostrArticles: generateNostrArticlesUrl(locale)
});
