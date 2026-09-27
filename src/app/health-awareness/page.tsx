import { Metadata } from 'next';
import Link from 'next/link';
import {
  getHealthAwarenessPosts,
  formatDate,
  getExcerpt,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  hasFeaturedImage,
} from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Health Awareness | Deeds Support Initiative International',
  description:
    'Health awareness articles from DSII on public health, mental health and psychosocial support, menstrual hygiene, safety and wellbeing for women, girls and communities across Nigeria.',
  openGraph: {
    title: 'Health Awareness | DSII',
    description:
      'Public health, mental health and wellbeing resources from Deeds Support Initiative International.',
    type: 'website',
  },
};

export const revalidate = 60;

const FOCUS_TOPICS = [
  {
    title: 'Mental Health & Psychosocial Support',
    desc: 'Reducing stigma and making counselling and emotional support easier to reach.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
  },
  {
    title: 'Women & Girls’ Health',
    desc: 'Menstrual hygiene, reproductive health and the everyday care that gets overlooked.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
  {
    title: 'Community & Public Health',
    desc: 'Prevention, early warning signs and knowing when to seek professional care.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: 'Safety, Health & Environment',
    desc: 'Safe homes, safe workplaces and safe communities — practical HSE guidance.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M12 3l8 4v5c0 4.418-3.134 8.418-8 9.945C7.134 20.418 4 16.418 4 12V7l8-4z"
      />
    ),
  },
];

export default async function HealthAwarenessPage() {
  const posts = await getHealthAwarenessPosts();
  const [lead, ...rest] = posts;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
            Know Better, Live Better
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Health <span className="text-[#b86e32]">Awareness</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Clear, practical health information for women, girls, children and
            communities — so that knowing what to do is never the thing standing
            in the way of care.
          </p>
        </div>
      </section>

      {/* What we cover */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#1e5c45]/10 text-[#1e5c45] rounded-full text-sm font-medium mb-4">
              What We Cover
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e]">
              Health Topics We Write About
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FOCUS_TOPICS.map((topic) => (
              <div
                key={topic.title}
                className="bg-gray-50 rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1e5c45]/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-[#1e5c45]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {topic.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {topic.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Article */}
      {lead && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">
              Latest Article
            </h2>

            <article
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                hasFeaturedImage(lead) ? 'grid lg:grid-cols-2 gap-0' : ''
              }`}
            >
              {hasFeaturedImage(lead) && (
                <Link
                  href={`/health-awareness/${lead.slug}`}
                  className="relative h-64 sm:h-80 lg:h-full lg:min-h-[24rem] overflow-hidden block"
                >
                  <img
                    src={getFeaturedImageUrl(lead)}
                    alt={getFeaturedImageAlt(lead)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#b86e32] text-white text-xs font-medium rounded-full">
                      Latest
                    </span>
                  </div>
                </Link>
              )}

              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  {!hasFeaturedImage(lead) && (
                    <span className="px-3 py-1 bg-[#b86e32] text-white text-xs font-medium rounded-full">
                      Latest
                    </span>
                  )}
                  <span className="px-3 py-1 bg-[#1e5c45]/10 text-[#1e5c45] text-xs font-medium rounded-full">
                    Health Awareness
                  </span>
                  <span className="text-gray-500 text-sm">
                    {formatDate(lead.date)}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-4 group-hover:text-[#1e5c45] transition-colors">
                  <Link href={`/health-awareness/${lead.slug}`}>
                    {lead.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {getExcerpt(lead.excerpt, 240)}
                </p>
                <Link
                  href={`/health-awareness/${lead.slug}`}
                  className="inline-flex items-center text-[#1e5c45] font-semibold hover:text-[#14432e] transition-colors"
                >
                  Read this article
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* All Articles */}
      {rest.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">
              More Health Articles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((item) => (
                <article
                  key={item.id}
                  className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {hasFeaturedImage(item) && (
                    <Link
                      href={`/health-awareness/${item.slug}`}
                      className="relative h-48 overflow-hidden block"
                    >
                      <img
                        src={getFeaturedImageUrl(item)}
                        alt={getFeaturedImageAlt(item)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-[#1e5c45]/10 text-[#1e5c45] text-xs font-medium rounded-full">
                        Health Awareness
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a2e] mb-3 line-clamp-2 group-hover:text-[#1e5c45] transition-colors">
                      <Link href={`/health-awareness/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {getExcerpt(item.excerpt)}
                    </p>
                    <Link
                      href={`/health-awareness/${item.slug}`}
                      className="inline-flex items-center text-[#1e5c45] font-medium text-sm group-hover:text-[#14432e] transition-colors"
                    >
                      Read more
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1e5c45]/10 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#1e5c45]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">
              Our first health articles are on the way
            </h2>
            <p className="text-gray-600">
              We are preparing practical health awareness resources for our
              communities. Check back shortly, or reach out if there is a health
              topic you would like us to cover.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center mt-8 px-8 py-4 bg-[#1e5c45] text-white rounded-full font-semibold hover:bg-[#14432e] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Suggest a topic
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Support note */}
      <section className="py-16 lg:py-20 bg-[#1e5c45]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Someone to Talk To?
          </h2>
          <p className="text-gray-200 mb-8 leading-relaxed">
            Health awareness is only the first step. If you or someone you know
            needs psychosocial support, reach out to our team — and if this is a
            medical emergency, please contact a qualified health professional or
            your nearest health facility immediately.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-[#b86e32] text-white rounded-full font-semibold hover:bg-[#d4915a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            Contact Our Team
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
