import Link from 'next/link';
import { getNewsPosts, formatDate, getExcerpt, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress';

export default async function NewsSection() {
  const posts = await getNewsPosts(3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="inline-block px-4 py-1 bg-[#1e5c45]/10 text-[#1e5c45] rounded-full text-sm font-medium mb-4">
              Latest Updates
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
              News & Events
            </h2>
          </div>
          <Link
            href="/news"
            className="mt-6 md:mt-0 inline-flex items-center text-[#1e5c45] font-semibold hover:text-[#14432e] transition-colors group"
          >
            View all news
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
            >
              {/* Image */}
              <Link href={`/news/${item.slug}`} className="relative h-48 overflow-hidden block">
                <img
                  src={getFeaturedImageUrl(item)}
                  alt={getFeaturedImageAlt(item)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#1e5c45] text-white text-xs font-medium rounded-full">
                    {item.categories.nodes[0]?.name || 'News'}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(item.date)}
                </div>

                <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#1e5c45] transition-colors line-clamp-2">
                  <Link href={`/news/${item.slug}`}>{item.title}</Link>
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {getExcerpt(item.excerpt)}
                </p>

                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center text-[#1e5c45] font-medium text-sm group-hover:text-[#14432e] transition-colors"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
