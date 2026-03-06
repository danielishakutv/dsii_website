import Link from 'next/link';
import { getProjectsPosts, getExcerpt, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress';

export default async function ProjectsSection() {
  const posts = await getProjectsPosts(3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-[#1e5c45]/10 text-[#1e5c45] rounded-full text-sm font-medium mb-4">
            Our Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-6">
            Making Impact Through Action
          </h2>
          <p className="text-gray-600 text-lg">
            We implement projects that create lasting change in communities, focusing on
            education, health, and environmental sustainability.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover block"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={getFeaturedImageUrl(project)}
                  alt={getFeaturedImageAlt(project)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {project.categories.nodes
                  .filter((cat) => cat.slug !== 'projects')
                  .slice(0, 1)
                  .map((cat) => (
                    <span
                      key={cat.slug}
                      className="absolute top-4 left-4 px-3 py-1 bg-[#b86e32] text-white text-xs font-medium rounded-full"
                    >
                      {cat.name}
                    </span>
                  ))}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#1e5c45] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {getExcerpt(project.excerpt, 150)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 bg-[#1e5c45] text-white rounded-full font-semibold hover:bg-[#14432e] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            View All Projects
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
