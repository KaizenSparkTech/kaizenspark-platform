import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustedCompanies from "@/components/TrustedCompanies";
import ServicesShowcase from "@/components/ServicesShowcase";
import ExecutiveOverview from "@/components/ExecutiveOverview";
import CoreCapabilities from "@/components/CoreCapabilities";
import TestimonialsSection from "@/components/TestimonialsSection";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ProductPortfolio from "@/components/ProductPortfolio";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="relative">
      <ScrollProgress />
      <Navbar />
      <CookieConsent />
      <main className="relative">
        <HeroSection />
        <TrustedCompanies />
        <ServicesShowcase />
        <ExecutiveOverview />
        <CoreCapabilities />
        <TestimonialsSection />
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
