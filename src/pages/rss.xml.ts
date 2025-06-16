import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@data/constants';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all English blog posts
  const englishBlogEntries = await getCollection("blog", ({ id }) => {
    return id.startsWith("en/");
  });

  // Sort by publication date (newest first)
  const sortedBlogPosts = englishBlogEntries.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  // Helper function to create proper URLs
  const createImageUrl = (imageSrc: string) => {
    const baseUrl = String(context.site ?? SITE.url).replace(/\/$/, ''); 
    const imgSrc = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
    return `${baseUrl}${imgSrc}`;
  };

  return rss({
    title: `${SITE.title} - Latest Articles`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: sortedBlogPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: `${post.data.author} (${post.data.role || 'Author'})`,
      link: `/blog/${post.id.replace('en/', '')}`,
      categories: post.data.tags || [],
      customData: `
        <role>${post.data.role || ''}</role>
        <authorImage>${post.data.authorImage ? createImageUrl(post.data.authorImage.src) : ''}</authorImage>
        <authorImageAlt>${post.data.authorImageAlt || ''}</authorImageAlt>
        <image>${post.data.cardImage ? createImageUrl(post.data.cardImage.src) : ''}</image>
        <imageAlt>${post.data.cardImageAlt || ''}</imageAlt>
        <readTime>${post.data.readTime || 0}</readTime>
        <nostrPublicKey>${post.data.nostrPublicKey || ''}</nostrPublicKey>
      `,
    })),
    customData: `<language>en-US</language>`,
  });
}
