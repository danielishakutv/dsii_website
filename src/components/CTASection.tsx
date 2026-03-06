import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#b86e32]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Join Us in Making a 
              <span className="text-[#b86e32]"> Difference</span>
            </h2>
            <p className="text-gray-200 text-lg max-w-xl">
              Your support can help us reach more disadvantaged individuals, provide essential 
              resources, and create lasting change in communities across Nigeria.
            </p>

            {/* Donation info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-white font-semibold mb-4">Bank Details for Donations</h4>
              <div className="space-y-2 text-gray-200 text-sm">
                <p><strong>Account Name:</strong> Deeds Support Initiative International</p>
                <p><strong>Naira Account:</strong> 1865533892 (Access Bank)</p>
                <p><strong>Dollar Account:</strong> 1870933638 (Access Bank)</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#b86e32] text-white rounded-full font-semibold text-lg hover:bg-[#d4915a] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                Donate Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-[#14432e] transition-all duration-300"
              >
                Partner With Us
              </Link>
            </div>
          </div>

          {/* Stats/Impact */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: '1000+', label: 'Girls Supported', icon: '👧' },
              { number: '5', label: 'Schools Reached', icon: '🏫' },
              { number: '15+', label: 'Programs Run', icon: '📋' },
              { number: '100%', label: 'Commitment', icon: '💯' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors duration-300"
              >
                <span className="text-4xl mb-2 block">{stat.icon}</span>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
