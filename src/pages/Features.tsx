
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";

const Features = () => {
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
          <div className="slide-up">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 gradient-text">Features</h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl">
              Discover how Aura AI streamlines your workflow and boosts productivity with our powerful features.
            </p>
          </div>
        </div>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
