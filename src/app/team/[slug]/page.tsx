import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getTeamPosts, getFeaturedImageUrl, getFeaturedImageAlt, extractParagraphs, stripFirstNParagraphs } from '@/lib/wordpress';

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Team Member Not Found' };
  }

  return {
    title: `${post.title} | DSII Team`,
    description: post.excerpt.replace(/<[^>]*>/g, '').trim().slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.replace(/<[^>]*>/g, '').trim().slice(0, 160),
      type: 'profile',
      images: post.featuredImage?.node?.sourceUrl
        ? [{ url: post.featuredImage.node.sourceUrl }]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getTeamPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function TeamMemberPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paras = extractParagraphs(post.content);
  const designation = paras[0] || '';
  // Strip the first paragraph (designation) from the content for the bio section
  const bioContent = stripFirstNParagraphs(post.content, 1);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/team"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Team
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          {designation && (
            <p className="text-[#d4915a] text-xl font-medium">{designation}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Photo */}
            {post.featuredImage && (
              <div className="lg:col-span-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl sticky top-28">
                  <img
                    src={getFeaturedImageUrl(post)}
                    alt={getFeaturedImageAlt(post)}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}

            {/* Bio — starts from 2nd paragraph onward */}
            <div className={post.featuredImage ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <div
                className="wp-content"
                dangerouslySetInnerHTML={{ __html: bioContent }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Meet More Team Members</h2>
          <Link
            href="/team"
            className="inline-flex items-center px-8 py-4 bg-[#1e5c45] text-white rounded-full font-semibold hover:bg-[#14432e] transition-all duration-300"
          >
            View Full Team
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
