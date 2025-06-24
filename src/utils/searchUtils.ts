// Search utility functions for the blog search functionality

export interface SearchableItem {
  title: string;
  description: string;
  url: string;
  tags: string[];
  date: string;
  author?: string;
  content: string;
}

export interface SearchResult extends SearchableItem {
  score: number;
  matchedFields: string[];
}

/**
 * Performs a fuzzy search on the provided data
 */
export function performSearch(query: string, data: SearchableItem[]): SearchResult[] {
  if (!query || query.length < 2) {
    return [];
  }

  const searchTerms = query.toLowerCase()
    .split(/\s+/)
    .filter(term => term.length > 0)
    .map(term => term.trim());

  if (searchTerms.length === 0) {
    return [];
  }

  const results = data
    .map(item => scoreItem(item, searchTerms))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return results.slice(0, 20); // Limit to top 20 results
}

/**
 * Scores an item based on search terms
 */
function scoreItem(item: SearchableItem, searchTerms: string[]): SearchResult {
  let score = 0;
  const matchedFields: string[] = [];

  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const tags = item.tags.map(tag => tag.toLowerCase());
  const content = item.content.toLowerCase();

  searchTerms.forEach(term => {
    // Title matches (highest priority)
    if (title.includes(term)) {
      score += title.startsWith(term) ? 15 : 10;
      if (!matchedFields.includes('title')) matchedFields.push('title');
    }

    // Description matches
    if (description.includes(term)) {
      score += description.startsWith(term) ? 8 : 5;
      if (!matchedFields.includes('description')) matchedFields.push('description');
    }

    // Tag matches
    tags.forEach(tag => {
      if (tag.includes(term)) {
        score += tag === term ? 12 : 6;
        if (!matchedFields.includes('tags')) matchedFields.push('tags');
      }
    });

    // Content matches (lowest priority)
    if (content.includes(term)) {
      score += 2;
      if (!matchedFields.includes('content')) matchedFields.push('content');
    }

    // Exact phrase bonus
    if (content.includes(searchTerms.join(' '))) {
      score += 5;
    }
  });

  return {
    ...item,
    score,
    matchedFields
  };
}

/**
 * Highlights search terms in text
 */
export function highlightSearchTerms(text: string, searchTerms: string[]): string {
  if (!text || !searchTerms || searchTerms.length === 0) {
    return text;
  }

  let highlightedText = text;
  
  searchTerms.forEach(term => {
    if (term.length < 2) return;
    
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<mark class="search-highlight">$1</mark>');
  });

  return highlightedText;
}

/**
 * Escapes special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.slice(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Extract search keywords from URL or other sources
 */
export function extractSearchKeywords(url: string): string[] {
  try {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;
    
    const query = searchParams.get('q') || searchParams.get('search') || '';
    return query.split(/\s+/).filter(term => term.length > 0);
  } catch {
    return [];
  }
}

/**
 * Generate search suggestions based on available content
 */
export function generateSearchSuggestions(data: SearchableItem[], limit: number = 10): string[] {
  const allTags = new Set<string>();
  const allWords = new Set<string>();

  data.forEach(item => {
    // Add tags
    item.tags.forEach(tag => allTags.add(tag.toLowerCase()));
    
    // Add significant words from titles
    const titleWords = item.title.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3 && !isCommonWord(word));
    
    titleWords.forEach(word => allWords.add(word));
  });

  const suggestions = [
    ...Array.from(allTags),
    ...Array.from(allWords)
  ];

  return suggestions
    .sort((a, b) => a.localeCompare(b))
    .slice(0, limit);
}

/**
 * Check if a word is a common word that shouldn't be suggested
 */
function isCommonWord(word: string): boolean {
  const commonWords = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 
    'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 
    'after', 'above', 'below', 'between', 'among', 'this', 'that', 'these', 
    'those', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 
    'should', 'may', 'might', 'must', 'can', 'what', 'where', 'when', 'why', 
    'how', 'who', 'which', 'whom', 'whose'
  ]);
  
  return commonWords.has(word.toLowerCase());
}
