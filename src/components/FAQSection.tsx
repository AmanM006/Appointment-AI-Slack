
import React, { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqRef = useRef<HTMLDivElement>(null);

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

    const element = faqRef.current;
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
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Neon glow effect backgrounds */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20" />
        <div className="absolute right-1/4 bottom-1/3 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={faqRef} className="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about Aura AI's appointment management platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="backdrop-blur-lg bg-gray-900/40 border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(138,43,226,0.2)]">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-purple-900/20 text-white">
                  <span className="text-left font-medium">How does the Google Sheets integration work?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-300">
                  Our platform connects to your Google Sheets through a secure OAuth connection. You can either use our template or your existing sheet. Once connected, any changes made in the sheet will automatically update in Aura AI, and vice versa. This provides seamless two-way synchronization without any manual work.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="backdrop-blur-lg bg-gray-900/40 border border-blue-500/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(66,153,225,0.2)]">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-blue-900/20 text-white">
                  <span className="text-left font-medium">What kinds of reminders can I set up?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-300">
                  You can create various types of reminders, including time-based (e.g., 24 hours before an appointment), action-based (e.g., when a client confirms), or custom triggers using our n8n integration. Reminders can be sent via email, SMS, or as notifications in your team's dashboard.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="backdrop-blur-lg bg-gray-900/40 border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(138,43,226,0.2)]">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-purple-900/20 text-white">
                  <span className="text-left font-medium">Is my data secure with Aura AI?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-300">
                  Absolutely. We take security very seriously. All data is encrypted both in transit and at rest. We use OAuth for authentication and never store your Google credentials. Our platform is compliant with industry security standards, and we regularly conduct security audits to ensure your data remains protected.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="backdrop-blur-lg bg-gray-900/40 border border-blue-500/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(66,153,225,0.2)]">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-blue-900/20 text-white">
                  <span className="text-left font-medium">How does the voice command feature work?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-300">
                  The voice command feature uses advanced natural language processing to understand your spoken instructions. Simply click the microphone button and say what you want to do, such as "Schedule a meeting with John on Tuesday at 2 PM" or "Reschedule my 3 PM meeting to tomorrow." The AI will process your request and make the appropriate changes to your calendar and sheets.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="backdrop-blur-lg bg-gray-900/40 border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(138,43,226,0.2)]">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-purple-900/20 text-white">
                  <span className="text-left font-medium">Can I customize the appearance of my dashboard?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-300">
                  Yes, you can customize your dashboard to fit your preferences and workflow. You can change the layout, color schemes, and which widgets appear on your dashboard. Pro and Enterprise plans also allow for team-specific customizations and branding options.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
