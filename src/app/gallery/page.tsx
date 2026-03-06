import { Metadata } from 'next';
import Link from 'next/link';
import { getGalleryPosts, getFeaturedImageUrl, getFeaturedImageAlt, formatDate, getExcerpt } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Gallery | Deeds Support Initiative International',
  description: 'Photo gallery showcasing DSII events, programs, and community impact across Nigeria.',
};

export const revalidate = 60;

export default async function GalleryPage() {
  const posts = await getGalleryPosts();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')` }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
            Our Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Moments of <span className="text-[#b86e32]">Impact</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Browse through photos from our events, programs, and community engagements.
          </p>
        </div>
      </section>

      {/* Gallery Albums Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/gallery/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Cover Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getFeaturedImageUrl(post)}
                      alt={getFeaturedImageAlt(post)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Category badges */}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
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

                    {/* Album icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#1e5c45]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    {/* Title on image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg">{post.title}</h3>
                      <p className="text-gray-300 text-sm">{formatDate(post.date)}</p>
                    </div>
                  </div>

                  {/* Content preview */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {getExcerpt(post.excerpt, 120)}
                    </p>
                    <span className="inline-flex items-center text-[#1e5c45] font-medium text-sm mt-4 group-hover:text-[#14432e] transition-colors">
                      View Album
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No gallery items available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
