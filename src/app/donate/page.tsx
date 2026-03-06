import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Donate | Deeds Support Initiative International',
  description: 'Support our mission. Your donation helps us empower communities across Nigeria.',
};

export default function DonatePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14432e] via-[#1e5c45] to-[#264653]" />
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')` }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
            Make a Difference
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Support Our <span className="text-[#b86e32]">Mission</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Your generous donation helps us empower communities, educate children, and create lasting positive change across Nigeria.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '₦10,000', label: 'Provides school supplies for 5 children' },
              { number: '₦25,000', label: 'Funds menstrual hygiene kits for 50 girls' },
              { number: '₦50,000', label: 'Sponsors climate education for a school' },
              { number: '₦100,000', label: 'Supports a community outreach program' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#1e5c45] mb-2">{item.number}</div>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-4">
              Ways to Give
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the donation method that works best for you. Every contribution, big or small, makes a difference.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bank Transfer - Naira */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🇳🇬</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a2e]">Naira Account (NGN)</h3>
                  <p className="text-gray-500">Bank Transfer</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Bank Name</span>
                  <span className="font-semibold text-[#1a1a2e]">Access Bank</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Account Number</span>
                  <span className="font-bold text-lg text-[#1e5c45]">1865533892</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Account Name</span>
                  <span className="font-semibold text-[#1a1a2e]">Deeds Support Initiative International</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-4 text-center">
                <p className="text-sm text-green-800">
                  💡 Tip: Include your email in the transfer narration so we can send you a receipt.
                </p>
              </div>
            </div>

            {/* Bank Transfer - Dollar */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🇺🇸</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a2e]">Dollar Account (USD)</h3>
                  <p className="text-gray-500">International Transfer</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Bank Name</span>
                  <span className="font-semibold text-[#1a1a2e]">Access Bank</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Account Number</span>
                  <span className="font-bold text-lg text-[#1e5c45]">1870933638</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Account Name</span>
                  <span className="font-semibold text-[#1a1a2e]">Deeds Support Initiative International</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 text-center">
                <p className="text-sm text-blue-800">
                  🌍 Perfect for international donors. Contact us for SWIFT/BIC details.
                </p>
              </div>
            </div>
          </div>

          {/* Other Ways to Give */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#b86e32]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#b86e32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">In-Kind Donations</h3>
              <p className="text-gray-600 text-sm mb-4">
                Donate items like books, sanitary pads, school supplies, food items, or other resources.
              </p>
              <Link href="/contact" className="text-[#1e5c45] font-semibold text-sm hover:text-[#14432e]">
                Contact Us →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#b86e32]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#b86e32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">Volunteer</h3>
              <p className="text-gray-600 text-sm mb-4">
                Give your time and skills to help us make a bigger impact in communities.
              </p>
              <Link href="/contact" className="text-[#1e5c45] font-semibold text-sm hover:text-[#14432e]">
                Join Us →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#b86e32]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#b86e32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">Corporate Partnership</h3>
              <p className="text-gray-600 text-sm mb-4">
                Partner with us for CSR initiatives and make a collective impact.
              </p>
              <Link href="/contact" className="text-[#1e5c45] font-semibold text-sm hover:text-[#14432e]">
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs You Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-4">
              Where Your Donation Goes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              100% of your donation goes directly to our programs. Here&apos;s how your contribution makes a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📚',
                title: 'Girl-Child Education',
                description: 'Providing educational support, scholarships, and school supplies to keep girls in school.',
              },
              {
                icon: '🩸',
                title: 'Menstrual Hygiene',
                description: 'Distributing sanitary products and providing menstrual health education to girls and women.',
              },
              {
                icon: '🌱',
                title: 'Climate Education',
                description: 'Teaching students about climate change, environmental conservation, and sustainable practices.',
              },
              {
                icon: '👂',
                title: 'Deaf Community Support',
                description: 'Creating inclusive programs and providing support for the Deaf community.',
              },
              {
                icon: '🤝',
                title: 'GBV Response',
                description: 'Supporting survivors of gender-based violence and running prevention programs.',
              },
              {
                icon: '🏠',
                title: 'Orphanage Support',
                description: 'Providing food, supplies, and care to orphanages and vulnerable children.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20 bg-[#1e5c45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Our Commitment to Transparency
              </h2>
              <p className="text-gray-200 mb-8 text-lg">
                We believe in complete transparency. Every naira you donate is accounted for and used efficiently to maximize impact.
              </p>
              <ul className="space-y-4">
                {[
                  'Registered NGO with CAC RC: 172339',
                  'Regular financial reports available upon request',
                  'Impact reports shared with all donors',
                  'Open communication and accountability',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <svg className="w-6 h-6 text-[#b86e32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Have Questions?</h3>
              <p className="text-gray-200 mb-6">
                We&apos;re happy to answer any questions about how your donation will be used.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <a href="mailto:info@dsii.ng" className="hover:text-[#b86e32] transition-colors">
                    info@dsii.ng
                  </a>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a href="tel:+2347030089631" className="hover:text-[#b86e32] transition-colors">
                    +234 703 008 9631
                  </a>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center px-6 py-3 bg-white text-[#1e5c45] rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🙏</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-6">
            Thank You for Your Generosity
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Every donation, no matter the size, helps us continue our mission of empowering communities and creating lasting positive change. Together, we can make a difference.
          </p>
          <p className="text-[#1e5c45] font-semibold italic text-xl">
            &ldquo;Supporting the welfare of the less privileged&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
}
