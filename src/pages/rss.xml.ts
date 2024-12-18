import { siteConfig } from '@/config';
import rss from '@astrojs/rss';
import { getSortedPosts } from '@utils/content-utils';
import type { APIContext } from 'astro';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const blog = await getSortedPosts();
  const siteUrl = context.site ?? 'https://blog.angor.io';

  return rss({
    title: siteConfig.title,
    description: siteConfig.subtitle || 'No description',
    site: siteUrl,
    items: blog.map((post) => {
      const imageUrl = post.data.image
        ? new URL(post.data.image.startsWith('/') ? post.data.image.slice(1) : post.data.image, siteUrl).toString()
        : '';

      return {
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description || '',
        link: `/posts/${post.slug}/`,
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        }),
        customData: imageUrl
          ? `<media:content url="${imageUrl}" medium="image" />`
          : '',
      };
    }),
    customData: `
      <language>${siteConfig.lang}</language>
      <xmlns:media="http://search.yahoo.com/mrss/">
    `,
  });
}
