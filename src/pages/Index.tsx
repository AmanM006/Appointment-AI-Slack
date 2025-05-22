
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoCloud from "@/components/LogoCloud";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.slide-up');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        if (isVisible) {
          element.classList.add('in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once for elements already in view on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Spline 3D Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div style="position: fixed; inset: 0; z-index: -1; overflow: hidden;">
  <iframe 
    src="https://my.spline.design/animatedbackgroundgradientforweb-XNvYjTQKpqpGJIvRAq0SQbGG/" 
    frameborder="0" 
    width="100%" 
    height="100%" 
    loading="lazy"
    style="pointer-events: none; transform: scale(1.1);" 
    title="3D Background">
  </iframe>
</div>

      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <LogoCloud />
          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
