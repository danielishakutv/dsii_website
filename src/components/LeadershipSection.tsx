import Link from 'next/link';

const CREDENTIALS = [
  'Development Sociologist',
  'Social Work Professional',
  'Chartered Administrator',
  'HSE Expert',
  'Researcher',
];

export default function LeadershipSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/dr-emmanuella-dike.jpg"
                  alt="Dr. Emmanuella Dike, Founder and Chief Executive Officer of Deeds Support Initiative International"
                  width={900}
                  height={900}
                  className="w-full h-auto"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-24 h-24 bg-[#b86e32]/20 rounded-2xl z-0" />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-32 h-32 bg-[#1e5c45]/20 rounded-2xl z-0" />

              {/* Experience badge */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl px-6 py-5 z-20">
                <div className="text-3xl font-bold text-[#1e5c45] leading-none">
                  18+
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Years in social development
                </div>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="lg:col-span-3 space-y-8 mt-12 lg:mt-0">
            <div>
              <span className="inline-block px-4 py-1 bg-[#1e5c45]/10 text-[#1e5c45] rounded-full text-sm font-medium mb-4">
                Our Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] leading-tight">
                Dr. Emmanuella Dike
              </h2>
              <p className="text-[#b86e32] font-semibold mt-3 text-lg">
                Founder &amp; Chief Executive Officer
              </p>
              <p className="text-gray-500 text-sm">
                Deeds Support Initiative International (DSII)
              </p>
            </div>

            {/* Credentials */}
            <ul className="flex flex-wrap gap-2">
              {CREDENTIALS.map((credential) => (
                <li
                  key={credential}
                  className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full"
                >
                  {credential}
                </li>
              ))}
            </ul>

            <p className="text-gray-600 text-lg leading-relaxed">
              A Development Sociologist and humanitarian practitioner with over
              18 years in social development, community outreach, research and
              advocacy. She holds a Ph.D. in Development Sociology from the
              University of Calabar and founded DSII in 2020 to give women,
              girls and children a stronger voice.
            </p>

            {/* Vision pull-quote */}
            <blockquote className="border-l-4 border-[#b86e32] bg-white rounded-r-2xl px-6 py-5 shadow-sm">
              <p className="text-[#1a1a2e] leading-relaxed">
                &ldquo;I want to see a Nigeria where mental health support is
                within reach of everyone &mdash; where professional counselling
                can be just a call away.&rdquo;
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/team/emmanuella-dike-phd"
                className="inline-flex items-center px-8 py-3.5 bg-[#1e5c45] text-white rounded-full font-semibold hover:bg-[#14432e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Read full profile
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
              <Link
                href="/team"
                className="inline-flex items-center px-8 py-3.5 border-2 border-[#1e5c45] text-[#1e5c45] rounded-full font-semibold hover:bg-[#1e5c45] hover:text-white transition-all duration-300"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
