import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getGalleryPosts, formatDate, getFeaturedImageUrl, getFeaturedImageAlt, extractImagesFromContent } from '@/lib/wordpress';
import ImageViewer from '@/components/ImageViewer';

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Album Not Found' };
  }

  return {
    title: `${post.title} | DSII Gallery`,
    description: post.excerpt.replace(/<[^>]*>/g, '').trim().slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.replace(/<[^>]*>/g, '').trim().slice(0, 160),
      type: 'article',
      images: post.featuredImage?.node?.sourceUrl
        ? [{ url: post.featuredImage.node.sourceUrl }]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getGalleryPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function GalleryAlbumPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Extract all images from the post content
  const contentImages = extractImagesFromContent(post.content);
  // Include featured image at the start if it exists and isn't already in content
  const featuredUrl = post.featuredImage?.node?.sourceUrl;
  const allImages = featuredUrl && !contentImages.some((img) => img.src === featuredUrl)
    ? [{ src: featuredUrl, alt: getFeaturedImageAlt(post) }, ...contentImages]
    : contentImages.length > 0
    ? contentImages
    : featuredUrl
    ? [{ src: featuredUrl, alt: getFeaturedImageAlt(post) }]
    : [];

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
            href="/gallery"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.nodes
              .filter((cat) => cat.slug !== 'gallery')
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

          <div className="flex items-center gap-4">
            <time className="text-gray-300 text-sm">{formatDate(post.date)}</time>
            {allImages.length > 0 && (
              <span className="text-gray-400 text-sm">
                {allImages.length} photo{allImages.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Image Viewer */}
      {allImages.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageViewer images={allImages} albumTitle={post.title} />
          </div>
        </section>
      )}

      {/* Back to Gallery CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center px-8 py-4 bg-[#1e5c45] text-white rounded-full font-semibold hover:bg-[#14432e] transition-all duration-300"
          >
            Browse All Albums
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
