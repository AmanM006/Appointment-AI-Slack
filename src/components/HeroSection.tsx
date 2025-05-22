
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <section className="relative pt-20 pb-16 overflow-hidden gradient-bg bg-mesh">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20" />
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-purple-700 rounded-full blur-[150px] opacity-20" />
        <div className="absolute left-1/2 top-1/3 w-64 h-64 bg-purple-300 rounded-full blur-[100px] opacity-10" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div ref={heroRef} className="slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              AI work management and <span className="gradient-text neon-glow">productivity tools</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Transform how your team works with Aura AI.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="glow-button text-lg px-8 py-6 group">
                Try for free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/contact">
                <Button variant="outline" className="secondary-button text-lg px-8 py-6">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="relative mx-auto max-w-5xl">
              {/* Dashboard Image */}
              <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://placehold.co/1200x675/1a1a1a/8A2BE2?text=AI+Appointment+Dashboard&font=source-sans-pro"
                  alt="Aura AI Dashboard"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-900/30 rounded-full blur-md -z-10"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-purple-800/20 rounded-full blur-md -z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
