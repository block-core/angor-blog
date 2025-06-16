import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@data/constants';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all French blog posts
  const frenchBlogEntries = await getCollection("blog", ({ id }) => {
    return id.startsWith("fr/");
  });

  // Sort by publication date (newest first)
  const sortedBlogPosts = frenchBlogEntries.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  // Helper function to create proper URLs
  const createImageUrl = (imageSrc: string) => {
    const baseUrl = String(context.site ?? SITE.url).replace(/\/$/, '');
    const imgSrc = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
    return `${baseUrl}${imgSrc}`;
  };

  return rss({
    title: `${SITE.title} - Derniers Articles`,
    description: "Restez informé des dernières tendances et évolutions dans les technologies décentralisées avec les analyses de l'équipe d'experts d'Angor.",
    site: context.site ?? SITE.url,
    items: sortedBlogPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: `${post.data.author} (${post.data.role || 'Auteur'})`,
      link: `/fr/blog/${post.id.replace('fr/', '')}`,
      categories: post.data.tags || [],
      customData: `
        <role>${post.data.role || ''}</role>
        <authorImage>${post.data.authorImage ? createImageUrl(post.data.authorImage.src) : ''}</authorImage>
        <authorImageAlt>${post.data.authorImageAlt || ''}</authorImageAlt>
        <cardImage>${post.data.cardImage ? createImageUrl(post.data.cardImage.src) : ''}</cardImage>
        <cardImageAlt>${post.data.cardImageAlt || ''}</cardImageAlt>
        <readTime>${post.data.readTime || 0}</readTime>
        <nostrPublicKey>${post.data.nostrPublicKey || ''}</nostrPublicKey>
      `,
    })),
    customData: `<language>fr-FR</language>`,
  });
}
