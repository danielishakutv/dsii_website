import { Metadata } from 'next';
import Link from 'next/link';
import { getProjectsPosts, getExcerpt, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Our Projects | Deeds Support Initiative International',
  description: 'Explore DSII projects - climate awareness, girl-child education, menstrual hygiene, and community support initiatives.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const posts = await getProjectsPosts();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')` }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Projects & <span className="text-[#b86e32]">Initiatives</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Discover the programs and initiatives driving change in communities across Nigeria.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={getFeaturedImageUrl(project)}
                      alt={getFeaturedImageAlt(project)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {project.categories.nodes
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
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {getExcerpt(project.excerpt, 200)}
                    </p>

                    <div className="pt-4 border-t">
                      <span className="inline-flex items-center text-[#1e5c45] font-medium text-sm group-hover:text-[#14432e] transition-colors">
                        Learn more
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Partner With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-6">
            Partner With Us
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            We welcome partnerships with organizations, institutions, and individuals who share
            our vision of empowering disadvantaged communities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-[#1e5c45] text-white rounded-full font-semibold hover:bg-[#14432e] transition-all duration-300"
          >
            Become a Partner
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
