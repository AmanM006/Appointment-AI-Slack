
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 mt-20">
              AI work management and <span className="gradient-text neon-glow">productivity tools</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl ">
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
              <div className="flex items-center justify-center  h-[500px] bg-black rounded-2xl">

              <div className="relative w-full h-[500px] max-w-4xl mx-auto p-[4px] rounded-2xl overflow-hidden">
  {/* Flowing Gradient Border */}
  <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500
                    animate-flow bg-[length:300%_300%] rounded-2xl blur-sm"></div>

  {/* Inner Content Container */}
  <div className="relative h-full z-10 rounded-[inherit] bg-[#111] px-8 py-20 text-center
              flex items-center justify-center"> {/* Added flex, items-center, justify-center */}
    <h1 className="text-4xl font-bold text-purple-400"> {/* Removed 'center' and 'mt-100' */}
      AI Appointment Dashboard
    </h1>
  </div>
</div>

</div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
