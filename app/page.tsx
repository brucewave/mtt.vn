import HeroShowcase from '@/components/HeroShowcase'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import {
  AboutSection,
  CategoryGrid,
  ContactSection,
  FeaturedProducts,
  Marquee,
  OneOffSection,
  ProcessSection,
  ProjectsSection,
  Testimonials,
} from '@/components/Sections'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroShowcase />
        <Marquee />
        <AboutSection />
        <CategoryGrid />
        <FeaturedProducts />
        <OneOffSection />
        <ProjectsSection />
        <ProcessSection />
        <Testimonials />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
