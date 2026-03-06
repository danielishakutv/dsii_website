import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="DSII team in action"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#b86e32]/20 rounded-2xl -z-0" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1e5c45]/20 rounded-2xl -z-0" />
            
            {/* Stats Card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 z-20">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#1e5c45]">5+</div>
                <div className="text-gray-500 text-sm">Years of Impact</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1 bg-[#1e5c45]/10 text-[#1e5c45] rounded-full text-sm font-medium mb-4">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] leading-tight">
                Building Independent, Confident Futures
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              Deeds Support Initiative International (DSII) is a registered non-governmental 
              organization focused on empowering, educating, and supporting disadvantaged 
              individuals in Nigeria and beyond.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our work centers on providing care, education, and emotional support to 
              vulnerable children, rehabilitating marginalized groups, and creating 
              opportunities for independence. We believe in strengthening communities 
              through inclusive action.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: '🎓', title: 'Education', desc: 'School supplies & resources' },
                { icon: '💪', title: 'Empowerment', desc: 'Skills & opportunities' },
                { icon: '🌍', title: 'Climate Action', desc: 'Environmental awareness' },
                { icon: '❤️', title: 'Support', desc: 'Rehabilitation services' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e]">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center text-[#1e5c45] font-semibold hover:text-[#14432e] transition-colors group"
            >
              Learn more about our mission
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
