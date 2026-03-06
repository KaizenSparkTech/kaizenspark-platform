import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExecutiveOverview from "@/components/ExecutiveOverview";
import CoreCapabilities from "@/components/CoreCapabilities";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ProductPortfolio from "@/components/ProductPortfolio";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <ExecutiveOverview />
        <CoreCapabilities />
        <IndustriesSection />
        <CaseStudiesSection />
        <ProductPortfolio />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
