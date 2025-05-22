
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactSection = () => {
  const contactRef = useRef<HTMLDivElement>(null);

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

    const element = contactRef.current;
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
    <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 bottom-1/3 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-20" />
        <div className="absolute right-1/4 top-1/3 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contactRef} className="slide-up">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 gradient-text">
                  Contact our sales team
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  We're happy to answer questions and get you acquainted with Aura AI.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-300">Schedule a demo</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-300">Get pricing information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-300">Explore use cases for your team</span>
                  </li>
                </ul>
                
                <div className="mt-10 flex items-center">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-400">
                    For technical issues and product questions, please visit our {" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 underline">Help Center</a>.
                  </p>
                </div>
              </div>
              
              <div>
                <div className="backdrop-blur-lg bg-gray-900/40 border border-purple-500/30 rounded-xl p-8 shadow-[0_0_20px_rgba(138,43,226,0.3)]">
                  <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-300">
                          First name <span className="text-red-500">*</span>
                        </label>
                        <Input id="first_name" placeholder="Your first name" required className="bg-gray-800 border-gray-700 text-white" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-300">
                          Surname <span className="text-red-500">*</span>
                        </label>
                        <Input id="surname" placeholder="Your surname" required className="bg-gray-800 border-gray-700 text-white" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                          Work email address <span className="text-red-500">*</span>
                        </label>
                        <Input id="email" type="email" placeholder="you@company.com" required className="bg-gray-800 border-gray-700 text-white" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                          Role <span className="text-red-500">*</span>
                        </label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Please select one" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="ceo">CEO</SelectItem>
                            <SelectItem value="cto">CTO</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300">
                          Company <span className="text-red-500">*</span>
                        </label>
                        <Input id="company" placeholder="Company name" required className="bg-gray-800 border-gray-700 text-white" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="company_size" className="block text-sm font-medium text-gray-300">
                          Company size <span className="text-red-500">*</span>
                        </label>
                        <Select>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Please select one" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="501+">501+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="help" className="block text-sm font-medium text-gray-300 mb-2">
                        How can our sales team help you? <span className="text-red-500">*</span>
                      </label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Please select one" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="demo">I'd like to see a demo</SelectItem>
                          <SelectItem value="pricing">I'd like pricing information</SelectItem>
                          <SelectItem value="questions">I have specific questions</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="glow-button w-full py-6">
                      Submit Request
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
