
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const pricingRef = useRef<HTMLDivElement>(null);

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

    const element = pricingRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={pricingRef} className="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that's right for your team. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-gray-200">
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="mt-2 text-gray-600 h-12">The quickest way to try Aura AI</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Free forever</p>
                
                <Button className="w-full mt-8 py-6" variant="outline">
                  Get Started
                </Button>
                
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">90 days of message history</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Ten app integrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">1:1 audio and video meetings</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-purple-500 transform scale-105 relative z-10 shadow-xl">
              <div className="absolute top-0 right-0 bg-purple-500 text-white py-1 px-4 rounded-bl-lg text-sm font-medium">
                Popular
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                <p className="mt-2 text-gray-600 h-12">More power for small teams who want better collaboration</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">$29</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">per user/month, when paying yearly</p>
                
                <Button className="w-full mt-8 py-6 glow-button">
                  Get Started
                </Button>
                
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-purple-700">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="ml-2 text-gray-700">Unlimited message history</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-purple-700">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="ml-2 text-gray-700">Unlimited app integrations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-purple-700">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="ml-2 text-gray-700">AI Voice Assistant</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-purple-700">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="ml-2 text-gray-700">Automated n8n workflows</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-purple-700">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="ml-2 text-gray-700">Group video meetings</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-gray-200">
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
                <p className="mt-2 text-gray-600 h-12">Maximize performance across your entire organization</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">Contact Sales</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">for custom pricing</p>
                
                <Button className="w-full mt-8 py-6 secondary-button">
                  Contact Sales
                </Button>
                
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">All Pro features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Advanced security features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Custom integrations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
