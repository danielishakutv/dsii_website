import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getProjectsPosts, formatDate, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress';

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${post.title} | DSII Projects`,
    description: post.excerpt.replace(/<[^>]*>/g, '').trim().slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.replace(/<[^>]*>/g, '').trim().slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      images: post.featuredImage?.node?.sourceUrl
        ? [{ url: post.featuredImage.node.sourceUrl }]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getProjectsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function ProjectArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        {post.featuredImage && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={getFeaturedImageUrl(post)}
              alt={getFeaturedImageAlt(post)}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.nodes
              .filter((cat) => cat.slug !== 'projects')
              .map((cat) => (
                <span
                  key={cat.slug}
                  className="px-3 py-1 bg-[#b86e32] text-white text-xs font-medium rounded-full"
                >
                  {cat.name}
                </span>
              ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <time className="text-gray-300 text-sm">{formatDate(post.date)}</time>
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
      </article>

      {/* Back Link */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border-t pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-[#1e5c45] font-semibold hover:text-[#14432e] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all projects
          </Link>
        </div>
      </section>
    </div>
  );
}
