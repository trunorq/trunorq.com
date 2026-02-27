import { PortfolioNavbar } from "../components/PortfolioNavbar"
import { ProductTeaserCard } from "../components/ProductTeaser"
import { BankingScaleHero } from "../components/BankingScale"
import { CaseStudiesCarousel } from "../components/CaseStudyCorousel"
import { IntegrationCarousel } from "../components/IntegrationCorousel"
import { PricingSection } from "../components/PricingSection"
import { FAQSection } from "../components/FAQSection"
import { Footer } from "../components/Footer"

export default function Page() {
  return (
    <>
      <PortfolioNavbar />
      <ProductTeaserCard />
      <BankingScaleHero />
      <CaseStudiesCarousel />
      <IntegrationCarousel />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  )
}
