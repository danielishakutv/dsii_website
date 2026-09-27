import type { MetadataRoute } from 'next';
import {
  getNewsPosts,
  getProjectsPosts,
  getTeamPosts,
  getGalleryPosts,
  getHealthAwarenessPosts,
  type WPPost,
} from '@/lib/wordpress';

const SITE_URL = 'https://dsii.ng';

export const revalidate = 3600;

const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/team', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/gallery', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/health-awareness', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/news', changeFrequency: 'daily', priority: 0.9 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/donate', changeFrequency: 'yearly', priority: 0.7 },
];

function entries(
  posts: WPPost[],
  base: string,
  priority: number
): MetadataRoute.Sitemap {
  return posts.map((post) => ({
    url: `${SITE_URL}${base}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A WordPress outage must not fail the build: each fetcher already
  // resolves to [] on error, so the static routes always ship.
  const [news, projects, team, gallery, health] = await Promise.all([
    getNewsPosts(),
    getProjectsPosts(),
    getTeamPosts(),
    getGalleryPosts(),
    getHealthAwarenessPosts(),
  ]);

  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...entries(news, '/news', 0.7),
    ...entries(projects, '/projects', 0.7),
    ...entries(health, '/health-awareness', 0.8),
    ...entries(team, '/team', 0.5),
    ...entries(gallery, '/gallery', 0.4),
  ];
}
