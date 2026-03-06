import { Metadata } from 'next';
import Link from 'next/link';
import { getNewsPosts, formatDate, getExcerpt, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'News & Updates | Deeds Support Initiative International',
  description: 'Stay updated with the latest news, events, and stories from DSII.',
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getNewsPosts();
  const featuredNews = posts.slice(0, 2);
  const regularNews = posts.slice(2);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')` }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
            Stay Updated
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            News & <span className="text-[#b86e32]">Updates</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Latest stories, events, and updates from Deeds Support Initiative International.
          </p>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">Featured Stories</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <article
                  key={item.id}
                  className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <Link href={`/news/${item.slug}`} className="relative h-64 overflow-hidden block">
                    <img
                      src={getFeaturedImageUrl(item)}
                      alt={getFeaturedImageAlt(item)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#b86e32] text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  </Link>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-[#1e5c45]/10 text-[#1e5c45] text-xs font-medium rounded-full">
                        {item.categories.nodes[0]?.name || 'News'}
                      </span>
                      <span className="text-gray-500 text-sm">{formatDate(item.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mb-4 group-hover:text-[#1e5c45] transition-colors">
                      <Link href={`/news/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-6">{getExcerpt(item.excerpt)}</p>
                    <Link
                      href={`/news/${item.slug}`}
                      className="inline-flex items-center text-[#1e5c45] font-semibold group-hover:text-[#14432e] transition-colors"
                    >
                      Read Full Story
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News */}
      {regularNews.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">More Stories</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularNews.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <Link href={`/news/${item.slug}`} className="relative h-48 overflow-hidden block">
                    <img
                      src={getFeaturedImageUrl(item)}
                      alt={getFeaturedImageAlt(item)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-[#1e5c45]/10 text-[#1e5c45] text-xs font-medium rounded-full">
                        {item.categories.nodes[0]?.name || 'News'}
                      </span>
                      <span className="text-gray-500 text-xs">{formatDate(item.date)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a2e] mb-3 line-clamp-2 group-hover:text-[#1e5c45] transition-colors">
                      <Link href={`/news/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{getExcerpt(item.excerpt)}</p>
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
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 text-lg">No news articles available at the moment. Check back soon!</p>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-[#1e5c45]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-200 mb-8">
            Get the latest updates about our programs and how you can help make a difference.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b86e32]"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#b86e32] text-white rounded-full font-semibold hover:bg-[#d4915a] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
