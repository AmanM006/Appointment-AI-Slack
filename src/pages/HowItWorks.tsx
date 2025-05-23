
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
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

  // Steps data
  const steps = [
    {
      number: 1,
      title: "Connect Your Calendars",
      description: "Link all your calendars and scheduling tools in one place with our one-click integration system.",
      image: "https://placehold.co/600x400/1a1a1a/8A2BE2?text=Calendar+Integration&font=source-sans-pro"
    },
    {
      number: 2,
      title: "Configure Smart Automation",
      description: "Set up AI-driven workflows that automatically handle booking, rescheduling, and follow-ups.",
      image: "https://placehold.co/600x400/1a1a1a/8A2BE2?text=Smart+Automation&font=source-sans-pro"
    },
    {
      number: 3,
      title: "Analyze Performance",
      description: "Track key metrics and receive AI-generated insights to optimize your scheduling efficiency.",
      image: "https://placehold.co/600x400/1a1a1a/8A2BE2?text=Analytics+Dashboard&font=source-sans-pro"
    },
    {
      number: 4,
      title: "Scale With Confidence",
      description: "As your business grows, our system scales automatically to handle increasing appointment volumes.",
      image: "https://placehold.co/600x400/1a1a1a/8A2BE2?text=Scaling+Solutions&font=source-sans-pro"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="slide-up">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 gradient-text">How It Works</h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl">
              Our intuitive platform streamlines your appointment management in just a few steps.
            </p>
          </div>
          
          <div className="mt-16 space-y-24">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center slide-up`}
              >
                <div className="md:w-1/2">
                  <Card className="glass-card overflow-hidden border-purple-900/30">
                    <CardContent className="p-0">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-auto object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="md:w-1/2 space-y-6">
                  <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-700/30">
                    {step.number}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{step.title}</h2>
                  <p className="text-xl text-gray-300">{step.description}</p>
                  <p className="text-gray-400">
                    {step.number === 1 && "Begin by connecting your existing calendar accounts through our secure OAuth integration. No data is lost, and all events sync in real-time across platforms."}
                    {step.number === 2 && "Our intelligent system learns from your scheduling patterns and client behaviors to suggest optimal meeting times and automate routine communications."}
                    {step.number === 3 && "Gain insights into meeting frequency, duration, cancellation rates, and client engagement through our comprehensive analytics dashboard."}
                    {step.number === 4 && "Whether you're a solo entrepreneur or an enterprise with thousands of employees, our platform scales to meet your needs without performance degradation."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
