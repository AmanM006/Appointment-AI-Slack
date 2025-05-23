
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureItemsRef = useRef<HTMLDivElement[]>([]);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    // Observe the main features section
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    // Observe individual feature items with staggered animation
    featureItemsRef.current.forEach((item, index) => {
      if (item) {
        // Add custom delay based on index for staggered animation
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
      }
    });

    // Observe how it works section
    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current);
    }

    // Observe individual steps with staggered animation
    stepsRef.current.forEach((item, index) => {
      if (item) {
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
      }
    });

    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      featureItemsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
      if (howItWorksRef.current) observer.unobserve(howItWorksRef.current);
      stepsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  // Feature card data
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      title: "Smart Calendar Integration",
      description: "Seamlessly sync with Google Calendar, Outlook, and Apple Calendar to manage all your appointments in one unified platform."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
        </svg>
      ),
      title: "AI-Powered Reminders",
      description: "Our AI analyzes client behavior to send personalized reminders at the optimal time, reducing no-shows by up to 80%."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
      title: "Voice Command Booking",
      description: "Book and manage appointments with natural language voice commands powered by our state-of-the-art AI assistant technology."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
        </svg>
      ),
      title: "Advanced Data Analytics",
      description: "Gain deep insights into your business with our comprehensive analytics dashboard, visualizing trends and optimizing your schedule."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      ),
      title: "Smart Conflict Resolution",
      description: "AI-powered conflict detection automatically resolves scheduling conflicts and suggests optimal alternative times."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      title: "API Integration Ecosystem",
      description: "Connect with over 5,000 apps through our robust API platform, automating your entire workflow from end to end."
    },
  ];

  // How it works steps data
  const steps = [
    {
      number: 1,
      title: "Connect Your Calendars",
      description: "Link all your calendars and scheduling tools in one place with our one-click integration system."
    },
    {
      number: 2,
      title: "Configure Smart Automation",
      description: "Set up AI-driven workflows that automatically handle booking, rescheduling, and follow-ups."
    },
    {
      number: 3,
      title: "Analyze Performance",
      description: "Track key metrics and receive AI-generated insights to optimize your scheduling efficiency."
    },
    {
      number: 4,
      title: "Scale With Confidence",
      description: "As your business grows, our system scales automatically to handle increasing appointment volumes."
    }
  ];

  const addToRefs = (el: HTMLDivElement | null, arr: React.MutableRefObject<HTMLDivElement[]>) => {
    if (el && !arr.current.includes(el)) {
      arr.current.push(el);
    }
  };

  return (
    <section id="features" className="py-24 bg-background relative">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={featuresRef} className="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 gradient-text">Key Features</h2>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to revolutionize your appointment management process and save valuable time every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => addToRefs(el, featureItemsRef)}
                className="slide-up glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-xl group hover:translate-y-[-5px]"
              >
                <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-800 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <div id="how-it-works" className="mt-32" ref={howItWorksRef}>
            <div className="text-center mb-16 slide-up">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 gradient-text">How It Works</h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Our intuitive platform streamlines your appointment management in just a few steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => addToRefs(el, stepsRef)}
                  className="glass-card p-8 rounded-xl relative hover:shadow-xl transition-all duration-300 slide-up border border-purple-900/30 hover:border-purple-700/50"
                >
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-700/30">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 pt-4">{step.title}</h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Demo Video */}
            <div className="mt-24 slide-up" ref={(el) => el && addToRefs(el, stepsRef)}>
              <Card className="bg-gray-900/50 border border-purple-900/30 overflow-hidden">
                <CardContent className="p-0 relative aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800/70">
                    <div className="text-center p-8">
                      <h3 className="text-2xl font-semibold text-white mb-4">See How It Works</h3>
                      <p className="text-gray-300 mb-6">Watch our quick demo video to see our platform in action</p>
                      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:bg-purple-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white ml-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
