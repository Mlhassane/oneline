import { Navbar } from "@/components/bento/navbar"
import { Hero } from "@/components/bento/hero"
import { CreatorsShowcase } from "@/components/bento/creators-showcase"
import { BentoGrid } from "@/components/bento/bento-grid"
import { DashboardShowcase } from "@/components/bento/dashboard-showcase"
import { IntegrationsGrid } from "@/components/bento/integrations-grid"
import { FreeSection } from "@/components/bento/free-section"
import { Footer } from "@/components/bento/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* <CreatorsShowcase /> */}
      <BentoGrid />
      <DashboardShowcase />
      <IntegrationsGrid />
      <FreeSection />
      <Footer />
    </main>
  )
}
