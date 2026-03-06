import Link from 'next/link';
import { getHeroImage } from '@/lib/wordpress';

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

export default async function Hero() {
  const heroImageUrl = await getHeroImage();
  const backgroundImage = heroImageUrl || FALLBACK_HERO;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14432e]/95 via-[#1e5c45]/85 to-[#264653]/90" />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#b86e32]/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2d7a5a]/20 rounded-full blur-3xl animate-float delay-500" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              <span className="w-2 h-2 bg-[#b86e32] rounded-full mr-2 animate-pulse"></span>
              Based in Abuja, Nigeria
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Empowering Lives,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b86e32] to-[#d4915a]">
              Building Futures
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up delay-200 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 leading-relaxed">
            Deeds Support Initiative International is dedicated to empowering, educating, 
            and supporting disadvantaged individuals with a focus on girl-child education, 
            gender equality, and climate justice.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/donate"
              className="group bg-[#b86e32] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#d4915a] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-center"
            >
              Donate Now
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <Link
              href="/about"
              className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#14432e] transition-all duration-300 flex items-center"
            >
              Learn More
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-400 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
            {[
              { number: '1000+', label: 'Lives Impacted' },
              { number: '15+', label: 'Projects Completed' },
              { number: '5', label: 'Focus Areas' },
              { number: '2020', label: 'Established' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  );
}
