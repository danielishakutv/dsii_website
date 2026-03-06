const GRAPHQL_ENDPOINT =
  process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://be.dsii.ng/graphql';

// --- Types ---

export interface WPImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface WPCategory {
  name: string;
  slug: string;
}

export interface WPPost {
  id: string;
  databaseId: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  featuredImage: WPImage | null;
  categories: {
    nodes: WPCategory[];
  };
}

export interface WPPostsResponse {
  posts: {
    nodes: WPPost[];
  };
}

// --- GraphQL Client ---

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  retries: number = 2
): Promise<T | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        // Retry on transient server errors or 404 (plugin may be temporarily unavailable)
        if (attempt < retries && (res.status >= 500 || res.status === 404)) {
          console.warn(
            `[WordPress] Request failed (${res.status}), retrying (${attempt + 1}/${retries})...`
          );
          await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
          continue;
        }
        console.warn(
          `[WordPress] GraphQL request failed: ${res.status} ${res.statusText}`
        );
        return null;
      }

      const json = await res.json();

      if (json.errors) {
        console.warn('[WordPress] GraphQL errors:', json.errors);
        return null;
      }

      return json.data as T;
    } catch (error) {
      if (attempt < retries) {
        console.warn(
          `[WordPress] Fetch error, retrying (${attempt + 1}/${retries})...`,
          error instanceof Error ? error.message : error
        );
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      console.warn(
        '[WordPress] Fetch failed after retries:',
        error instanceof Error ? error.message : error
      );
      return null;
    }
  }
  return null;
}

// --- Queries ---

const POST_FIELDS = `
  id
  databaseId
  title
  excerpt
  content
  date
  slug
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
`;

export async function getPostsByCategory(
  categorySlug: string,
  first: number = 50
): Promise<WPPost[]> {
  const query = `
    query GetPostsByCategory($categorySlug: String!, $first: Int!) {
      posts(first: $first, where: { categoryName: $categorySlug, status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          ${POST_FIELDS}
        }
      }
    }
  `;

  const data = await fetchGraphQL<WPPostsResponse>(query, {
    categorySlug,
    first,
  });

  return data?.posts?.nodes ?? [];
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        ${POST_FIELDS}
      }
    }
  `;

  const data = await fetchGraphQL<{ post: WPPost | null }>(query, { slug });
  // Only return published posts
  if (!data?.post) return null;
  return data.post;
}

export async function getNewsPosts(first: number = 50): Promise<WPPost[]> {
  return getPostsByCategory('news', first);
}

export async function getProjectsPosts(first: number = 50): Promise<WPPost[]> {
  return getPostsByCategory('projects', first);
}

export async function getTeamPosts(first: number = 50): Promise<WPPost[]> {
  return getPostsByCategory('team', first);
}

export async function getGalleryPosts(first: number = 50): Promise<WPPost[]> {
  return getPostsByCategory('gallery', first);
}

export async function getHeroImage(): Promise<string | null> {
  const posts = await getPostsByCategory('hero-image', 1);
  if (posts.length === 0) return null;
  return posts[0].featuredImage?.node?.sourceUrl ?? null;
}

export async function getAboutImage(): Promise<string | null> {
  const posts = await getPostsByCategory('about-image', 1);
  if (posts.length === 0) return null;
  return posts[0].featuredImage?.node?.sourceUrl ?? null;
}

export function extractImagesFromContent(html: string): { src: string; alt: string }[] {
  const images: { src: string; alt: string }[] = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const altMatch = match[0].match(/alt=["']([^"']*)["']/i);
    images.push({
      src: match[1],
      alt: altMatch ? altMatch[1] : '',
    });
  }
  return images;
}

// --- Helpers ---

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function getExcerpt(text: string, maxLength: number = 160): string {
  const stripped = stripHtml(text);
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function getFeaturedImageUrl(post: WPPost): string {
  return (
    post.featuredImage?.node?.sourceUrl ||
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  );
}

export function getFeaturedImageAlt(post: WPPost): string {
  return post.featuredImage?.node?.altText || post.title;
}

/**
 * Extract text paragraphs from HTML content.
 * Returns an array of plain-text strings, one per <p> block.
 */
export function extractParagraphs(html: string): string[] {
  if (!html) return [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const paragraphs: string[] = [];
  let match;
  while ((match = pRegex.exec(html)) !== null) {
    const text = stripHtml(match[1]).trim();
    if (text.length > 0) {
      paragraphs.push(text);
    }
  }
  return paragraphs;
}

/**
 * Remove the first N non-empty <p> tags from HTML content.
 * Useful for stripping designation/role paragraphs from team member bios.
 */
export function stripFirstNParagraphs(html: string, n: number = 1): string {
  if (!html || n <= 0) return html;
  let result = html;
  let stripped = 0;
  for (let i = 0; i < n; i++) {
    const match = result.match(/<p[^>]*>[\s\S]*?<\/p>/i);
    if (!match) break;
    // Only count non-empty paragraphs
    const text = stripHtml(match[0]).trim();
    result = result.replace(match[0], '');
    if (text.length > 0) {
      stripped++;
    } else {
      // Don't count empty paragraphs toward our limit
      i--;
    }
  }
  return result.trim();
}
