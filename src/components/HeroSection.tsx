
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      },
      {
        threshold: 0.1,
      }
    );

    const heroElement = heroRef.current;
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20" />
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={heroRef} className="slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Smarter Appointment Management for <span className="text-purple-700">Modern Teams</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Automate reminders, manage bookings, and sync everything — effortlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="glow-button text-lg px-8 py-6">
                View Plans
              </Button>
              <Button variant="outline" className="secondary-button text-lg px-8 py-6">
                Sign In
              </Button>
            </div>
          </div>

          <div className="mt-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="relative mx-auto max-w-5xl">
              {/* Dashboard Image */}
              <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://placehold.co/1200x675/f8f9fa/6b21a8?text=AI+Appointment+Dashboard&font=source-sans-pro"
                  alt="Aura AI Dashboard"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-100 rounded-full blur-md -z-10"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-blue-100 rounded-full blur-md -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
