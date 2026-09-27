import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getHealthAwarenessPosts,
  formatDate,
  getExcerpt,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  hasFeaturedImage,
  type WPPost,
} from '@/lib/wordpress';

export const revalidate = 60;

const CATEGORY_SLUG = 'health-awareness';

type Params = Promise<{ slug: string }>;

/**
 * getPostBySlug resolves any post, so a news or projects slug would otherwise
 * render under /health-awareness/... too. Only serve posts that really carry
 * the health-awareness category.
 */
function isHealthAwarenessPost(post: WPPost | null): post is WPPost {
  return !!post?.categories?.nodes?.some((cat) => cat.slug === CATEGORY_SLUG);
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!isHealthAwarenessPost(post)) {
    return { title: 'Article Not Found' };
  }

  const description = getExcerpt(post.excerpt, 160);

  return {
    title: `${post.title} | DSII Health Awareness`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      images: post.featuredImage?.node?.sourceUrl
        ? [{ url: post.featuredImage.node.sourceUrl }]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getHealthAwarenessPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function HealthAwarenessArticlePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!isHealthAwarenessPost(post)) {
    notFound();
  }

  const related = (await getHealthAwarenessPosts(4))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        {post.featuredImage && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={getFeaturedImageUrl(post)}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/health-awareness"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Health Awareness
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.nodes.map((cat) => (
              <span
                key={cat.slug}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <time dateTime={post.date} className="text-gray-300 text-sm">
            {formatDate(post.date)}
          </time>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={getFeaturedImageUrl(post)}
              alt={getFeaturedImageAlt(post)}
              className="w-full h-auto"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Health advisory */}
        <aside className="mt-12 rounded-2xl border-l-4 border-[#b86e32] bg-[#b86e32]/5 p-6">
          <div className="flex items-start gap-4">
            <svg
              className="w-6 h-6 text-[#b86e32] shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h2 className="font-bold text-[#1a1a2e] mb-1">
                A note on this article
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                This article is shared for general health awareness and does not
                replace advice from a qualified health professional. If you are
                unwell or concerned about a symptom, please speak to a doctor or
                visit your nearest health facility. For psychosocial support,{' '}
                <Link
                  href="/contact"
                  className="text-[#1e5c45] font-semibold hover:text-[#14432e] transition-colors"
                >
                  reach out to our team
                </Link>
                .
              </p>
            </div>
          </div>
        </aside>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">
              More Health Awareness
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {hasFeaturedImage(item) && (
                    <Link
                      href={`/health-awareness/${item.slug}`}
                      className="relative h-40 overflow-hidden block"
                    >
                      <img
                        src={getFeaturedImageUrl(item)}
                        alt={getFeaturedImageAlt(item)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                  )}
                  <div className="p-6">
                    <span className="text-gray-500 text-xs">
                      {formatDate(item.date)}
                    </span>
                    <h3 className="text-lg font-bold text-[#1a1a2e] mt-2 line-clamp-2 group-hover:text-[#1e5c45] transition-colors">
                      <Link href={`/health-awareness/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back Link */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-t pt-8">
          <Link
            href="/health-awareness"
            className="inline-flex items-center text-[#1e5c45] font-semibold hover:text-[#14432e] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all health articles
          </Link>
        </div>
      </section>
    </div>
  );
}
