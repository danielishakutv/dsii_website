import { Suspense } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FocusAreas from "@/components/FocusAreas";
import ProjectsSection from "@/components/ProjectsSection";
import NewsSection from "@/components/NewsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <AboutSection />
      <FocusAreas />
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <NewsSection />
      </Suspense>
      <CTASection />
    </>
  );
}

function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#14432e]/95 via-[#1e5c45]/85 to-[#264653]/90">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          <div className="h-8 w-48 bg-white/10 rounded-full mx-auto animate-pulse" />
          <div className="h-16 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
          <div className="h-6 w-80 bg-white/10 rounded mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-10 w-80 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-56 bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
