import { useEffect, useState } from "react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import FloatingWhatsApp from "@/components/global/FloatingWhatsApp";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import SecondaryForm from "@/components/global/SecondaryForm";
// Import from the adapter that converts V3 (Portuguese) to V2 (English) format
import universalData from "@/data/universalAdapter";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
      <Header />

      <main>
        {universalData.sections.hero.active && <HeroSection data={universalData.hero} />}
        {universalData.sections.benefits.active && <BenefitsSection data={universalData.benefits} />}
        {universalData.sections.services.active && <ServicesSection data={universalData.services} />}
        {universalData.sections.about.active && <AboutSection data={universalData.about} />}
        {universalData.sections.testimonials.active && <TestimonialsSection data={universalData.testimonials} />}
        {universalData.sections.cta.active && <CTASection data={universalData.cta} />}
        {universalData.sections.faq.active && <FAQSection data={universalData.faq} />}
        <SecondaryForm />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
