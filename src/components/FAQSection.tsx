
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
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={faqRef} className="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Aura AI's appointment management platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="glass-card rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-gray-900">How does the Google Sheets integration work?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                  Our platform connects to your Google Sheets through a secure OAuth connection. You can either use our template or your existing sheet. Once connected, any changes made in the sheet will automatically update in Aura AI, and vice versa. This provides seamless two-way synchronization without any manual work.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="glass-card rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-gray-900">What kinds of reminders can I set up?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                  You can create various types of reminders, including time-based (e.g., 24 hours before an appointment), action-based (e.g., when a client confirms), or custom triggers using our n8n integration. Reminders can be sent via email, SMS, or as notifications in your team's dashboard.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="glass-card rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-gray-900">Is my data secure with Aura AI?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                  Absolutely. We take security very seriously. All data is encrypted both in transit and at rest. We use OAuth for authentication and never store your Google credentials. Our platform is compliant with industry security standards, and we regularly conduct security audits to ensure your data remains protected.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="glass-card rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-gray-900">How does the voice command feature work?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                  The voice command feature uses advanced natural language processing to understand your spoken instructions. Simply click the microphone button and say what you want to do, such as "Schedule a meeting with John on Tuesday at 2 PM" or "Reschedule my 3 PM meeting to tomorrow." The AI will process your request and make the appropriate changes to your calendar and sheets.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="glass-card rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-gray-900">Can I customize the appearance of my dashboard?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
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
