import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale || 'en';
  
  try {
    // Get all blog posts for the specified locale
    const blogEntries = await getCollection("blog", ({ id }) => {
      return id.startsWith(`${locale}/`);
    });

    // Sort posts by date (newest first)
    const sortedPosts = blogEntries.sort(
      (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    // Transform posts into search-friendly format
    const searchData = sortedPosts.map(post => {
      const slug = post.id.replace(`${locale}/`, '');
      
      return {
        title: post.data.title,
        description: post.data.description,
        url: `/${locale === 'en' ? '' : locale + '/'}blog/${slug}`,
        tags: post.data.tags || [],
        date: post.data.pubDate.toISOString().split('T')[0],
        author: post.data.author || '',
        content: `${post.data.title} ${post.data.description} ${(post.data.tags || []).join(' ')}`
      };
    });

    return new Response(JSON.stringify(searchData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error generating search data:', error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export async function getStaticPaths() {
  return [
    { params: { locale: 'en' } },
    { params: { locale: 'ar' } },
    { params: { locale: 'fa' } },
    { params: { locale: 'fr' } }
  ];
}
