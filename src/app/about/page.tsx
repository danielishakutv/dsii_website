import { Metadata } from 'next';
import Link from 'next/link';
import { getAboutImage, getTeamPosts, getFeaturedImageUrl, getFeaturedImageAlt, extractParagraphs } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'About Us | Deeds Support Initiative International',
  description: 'Learn about DSII - our mission, vision, team, and commitment to empowering disadvantaged individuals in Nigeria.',
};

export const revalidate = 60;

const values = [
  {
    title: 'Empowerment',
    description: 'We believe in giving individuals the tools and opportunities they need to become self-reliant.',
    icon: '💪',
  },
  {
    title: 'Inclusion',
    description: 'Everyone deserves support regardless of their background, ability, or circumstances.',
    icon: '🤝',
  },
  {
    title: 'Education',
    description: 'Knowledge is the foundation of change. We prioritize educational support in all our programs.',
    icon: '📚',
  },
  {
    title: 'Sustainability',
    description: 'We create programs with lasting impact that communities can maintain long-term.',
    icon: '🌱',
  },
  {
    title: 'Integrity',
    description: 'We operate with transparency and accountability in all our activities.',
    icon: '⭐',
  },
  {
    title: 'Compassion',
    description: 'We approach every individual with care, respect, and understanding.',
    icon: '❤️',
  },
];

const FALLBACK_ABOUT_IMAGE = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

export default async function AboutPage() {
  const [aboutImageUrl, team] = await Promise.all([
    getAboutImage(),
    getTeamPosts(),
  ]);
  const aboutBg = aboutImageUrl || FALLBACK_ABOUT_IMAGE;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${aboutBg}')` }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
            About DSII
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Story of <span className="text-[#b86e32]">Impact</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Since 2020, we have been dedicated to transforming lives through education, 
            empowerment, and inclusive community action.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-[#1e5c45] to-[#2d7a5a] rounded-3xl p-10 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To educate, empower, rehabilitate, and uplift disadvantaged individuals, 
                with a specific focus on supporting the girl-child, addressing gender-based 
                violence, and promoting environmental sustainability.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-[#b86e32] to-[#d4915a] rounded-3xl p-10 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To build independent, confident futures for individuals and strengthen 
                communities through inclusive action, creating a world where everyone 
                has equal opportunities to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-[#1e5c45]/10 text-[#1e5c45] rounded-full text-sm font-medium mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-6">
                Established in 2020
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Deeds Support Initiative International was established on September 10, 2020, 
                  with CAC registration number RC: 172339. Born from a passion to create 
                  meaningful change in communities across Nigeria, DSII has grown to become 
                  a recognized force for good.
                </p>
                <p>
                  Based in Abuja, FCT, we work tirelessly to support disadvantaged individuals, 
                  particularly focusing on girl-child education, gender equality, and environmental 
                  awareness.
                </p>
                <p>
                  Our team of dedicated professionals brings together expertise in social work, 
                  development studies, engineering, law, and administration to create comprehensive 
                  programs that address the root causes of inequality.
                </p>
              </div>
              
              {/* Timeline highlights */}
              <div className="mt-8 space-y-4">
                {[
                  { year: '2020', event: 'DSII Founded & CAC Registered' },
                  { year: '2023', event: 'Expanded Programs to Multiple Communities' },
                  { year: '2024', event: 'Climate Awareness in 5+ Schools' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[#1e5c45] text-white rounded-xl flex items-center justify-center font-bold">
                      {item.year}
                    </div>
                    <p className="text-gray-700 font-medium">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="DSII community work"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1e5c45]">RC: 172339</div>
                  <div className="text-gray-500 text-sm">CAC Registered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-[#b86e32]/10 text-[#b86e32] rounded-full text-sm font-medium mb-4">
              Our Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-6">
              Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              These values guide everything we do, from program design to community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 group-hover:text-[#1e5c45] transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-[#1e5c45]/10 text-[#1e5c45] rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-6">
              Meet the People Behind DSII
            </h2>
            <p className="text-gray-600 text-lg">
              Our dedicated team brings together diverse expertise to create meaningful impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.length > 0 ? (
              team.map((member) => (
                <Link
                  key={member.id}
                  href={`/team/${member.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getFeaturedImageUrl(member)}
                      alt={getFeaturedImageAlt(member)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    {(() => {
                      const paras = extractParagraphs(member.content);
                      const designation = paras[0] || '';
                      const description = paras[1] || '';
                      return (
                        <>
                          <h3 className="text-lg font-bold text-[#1a1a2e]">{member.title}</h3>
                          {designation && (
                            <p className="text-[#1e5c45] text-sm font-medium mb-3">{designation}</p>
                          )}
                          {description && (
                            <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Team information coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1e5c45]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            Whether through donations, volunteering, or partnerships, your support helps us 
            reach more people in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="px-8 py-4 bg-[#b86e32] text-white rounded-full font-semibold hover:bg-[#d4915a] transition-all duration-300"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#1e5c45] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
