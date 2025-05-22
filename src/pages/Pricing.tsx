
import React, { useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";

const Pricing = () => {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 gradient-text">Our Pricing</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl">
            Choose the plan that best fits your team's needs and transform your workflow with Aura AI.
          </p>
        </div>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
