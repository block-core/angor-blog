import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@data/constants';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all Persian blog posts
  const persianBlogEntries = await getCollection("blog", ({ id }) => {
    return id.startsWith("fa/");
  });

  // Sort by publication date (newest first)
  const sortedBlogPosts = persianBlogEntries.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()  );

  // Helper function to create proper URLs
  const createImageUrl = (imageSrc: string) => {
    const baseUrl = String(context.site ?? SITE.url).replace(/\/$/, '');
    const imgSrc = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
    return `${baseUrl}${imgSrc}`;
  };

  return rss({
    title: `${SITE.title} - آخرین مقالات`,
    description: "با جدیدترین روندها و پیشرفت‌های فناوری غیرمتمرکز همراه تیم متخصصان آنجور به‌روز باشید.",
    site: context.site ?? SITE.url,
    items: sortedBlogPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: `${post.data.author} (${post.data.role || 'نویسنده'})`,
      link: `/fa/blog/${post.id.replace('fa/', '')}`,
      categories: post.data.tags || [],
      customData: `
        <role>${post.data.role || ''}</role>        <authorImage>${post.data.authorImage ? createImageUrl(post.data.authorImage.src) : ''}</authorImage>
        <authorImageAlt>${post.data.authorImageAlt || ''}</authorImageAlt>
        <image>${post.data.cardImage ? createImageUrl(post.data.cardImage.src) : ''}</image>
        <imageAlt>${post.data.cardImageAlt || ''}</imageAlt>
        <readTime>${post.data.readTime || 0}</readTime>
        <nostrPublicKey>${post.data.nostrPublicKey || ''}</nostrPublicKey>
      `,
    })),
    customData: `<language>fa-IR</language>`,
  });
}
