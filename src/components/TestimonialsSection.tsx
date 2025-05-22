
import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    content: "Aura AI has completely transformed how we manage client appointments. We've saved at least 10 hours per week on administrative tasks.",
    author: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechNova Solutions",
    result: "Saved 10 hrs/week"
  },
  {
    content: "The Google Sheets integration is seamless. Our team can update appointments anywhere, and the AI automatically keeps everything in sync.",
    author: "Michael Chen",
    title: "Operations Manager",
    company: "Quantum Designs",
    result: "Eliminated double bookings"
  },
  {
    content: "Voice commands to update appointments have been a game-changer for our busy team. Now we can manage our schedule hands-free.",
    author: "Alex Rivera",
    title: "Sales Director",
    company: "Pinnacle Group",
    result: "30% faster scheduling"
  }
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

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

    const element = testimonialsRef.current;
    if (element) {
      observer.observe(element);
    }

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={testimonialsRef} className="slide-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how businesses are transforming their appointment management with Aura AI.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="glass-card p-8 sm:p-10 rounded-xl text-center">
                      <div className="mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-300 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                        </svg>
                      </div>
                      <p className="text-xl text-gray-700 mb-8">{testimonial.content}</p>
                      <div className="flex items-center justify-center">
                        <div className="mr-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-700 font-bold">
                              {testimonial.author.substring(0, 1)}
                            </span>
                          </div>
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                          <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
                        </div>
                        <div className="ml-auto">
                          <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                            {testimonial.result}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentTestimonial === index ? 'bg-purple-700' : 'bg-purple-200'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
