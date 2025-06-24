import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ url, params, request }) => {
  // Try multiple approaches to get the locale parameter
  let locale = 'en'; // default
  
  try {
    // Method 1: Direct URL parsing
    const urlObj = new URL(url);
    const localeFromUrl = urlObj.searchParams.get('locale');
    
    // Method 2: Parse from request URL
    const requestUrl = new URL(request.url);
    const localeFromRequest = requestUrl.searchParams.get('locale');
    
    // Method 3: Parse manually from URL string
    const urlString = url.toString();
    const localeMatch = urlString.match(/[?&]locale=([^&]*)/);
    const localeFromMatch = localeMatch ? localeMatch[1] : null;
    
    console.log('=== API Debug Info ===');
    console.log(`url parameter: ${url}`);
    console.log(`url.toString(): ${url.toString()}`);
    console.log(`request.url: ${request.url}`);
    console.log(`urlObj.href: ${urlObj.href}`);
    console.log(`urlObj.search: ${urlObj.search}`);
    console.log(`requestUrl.href: ${requestUrl.href}`);
    console.log(`requestUrl.search: ${requestUrl.search}`);
    console.log(`URL string: ${urlString}`);
    console.log(`Locale from url: ${localeFromUrl}`);
    console.log(`Locale from request: ${localeFromRequest}`);
    console.log(`Locale from match: ${localeFromMatch}`);
    
    // Use the first non-null locale value
    locale = localeFromUrl || localeFromRequest || localeFromMatch || 'en';
    console.log(`Final locale: ${locale}`);
    console.log('======================');
  } catch (error) {
    console.error('Error parsing URL:', error);
  }
  
  try {
    // First, get ALL blog entries to see what's available
    const allBlogEntries = await getCollection("blog");
    console.log('All available blog entries:');
    allBlogEntries.forEach(entry => console.log(`  - ${entry.id}`));
    
    // Get all blog posts for the specified locale
    const blogEntries = await getCollection("blog", ({ id }) => {
      const matches = id.startsWith(`${locale}/`);
      console.log(`Blog entry ${id} matches locale ${locale}: ${matches}`);
      return matches;
    });

    console.log(`Found ${blogEntries.length} blog entries for locale ${locale}`);
    blogEntries.forEach(entry => console.log(`- ${entry.id}: ${entry.data.title}`));

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
        'Cache-Control': 'no-cache, no-store, must-revalidate' // Disable caching for debugging
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
