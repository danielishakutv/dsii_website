import type { MetadataRoute } from 'next';

const SITE_URL = 'https://dsii.ng';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The revalidation webhook is not content; keep it out of the index.
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
