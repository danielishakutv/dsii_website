import { Metadata } from 'next';
import Link from 'next/link';
import { getTeamPosts, getFeaturedImageUrl, getFeaturedImageAlt, extractParagraphs } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Our Team | Deeds Support Initiative International',
  description: 'Meet the dedicated team behind DSII working to empower communities across Nigeria.',
};

export const revalidate = 60;

export default async function TeamPage() {
  const members = await getTeamPosts();

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
            The People Behind DSII
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our <span className="text-[#b86e32]">Team</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Meet the dedicated individuals working to empower communities and create lasting change across Nigeria.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {members.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {members.map((member) => (
                <Link
                  key={member.id}
                  href={`/team/${member.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Photo */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={getFeaturedImageUrl(member)}
                      alt={getFeaturedImageAlt(member)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    {(() => {
                      const paras = extractParagraphs(member.content);
                      const designation = paras[0] || '';
                      const description = paras[1] || '';
                      return (
                        <>
                          <h3 className="text-lg font-bold text-[#1a1a2e] group-hover:text-[#1e5c45] transition-colors">
                            {member.title}
                          </h3>
                          {designation && (
                            <p className="text-[#b86e32] text-sm font-medium mt-1">
                              {designation}
                            </p>
                          )}
                          {description && (
                            <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                              {description}
                            </p>
                          )}
                        </>
                      );
                    })()}
                    <span className="inline-flex items-center text-[#1e5c45] font-medium text-sm mt-4 group-hover:text-[#14432e] transition-colors">
                      View Profile
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
              <p className="text-gray-500 text-lg">Team information coming soon. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-[#1e5c45]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            Passionate about making a difference? We are always looking for dedicated volunteers
            and team members to join our mission.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-[#b86e32] text-white rounded-full font-semibold hover:bg-[#d4915a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            Get In Touch
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
