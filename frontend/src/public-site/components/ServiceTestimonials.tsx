import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';

const testimonials = [
  {
    text: "The beauty and quality of the planters and exotic plants from Mr Gardenr are outstanding. They offer a wide variety of options, and everything I've purchased has exceeded my expectations. Their attention to detail and customer satisfaction is top-notch.",
    name: "MR ARPIT",
    title: "Builder",
    image: "https://i.pravatar.cc/150?u=arpit_builder"
  },
  {
    text: "Transforming our office space with Mr Gardenr was the best decision. The vertical gardens not only look stunning but have significantly improved the air quality and team morale.",
    name: "SARAH JENKINS",
    title: "Operations Manager",
    image: "https://i.pravatar.cc/150?u=sarah_jenkins"
  },
  {
    text: "Their team handled our penthouse terrace with incredible professionalism. The wind-resistant plants they selected are thriving, and the custom lighting makes it magical at night.",
    name: "DAVID CHEN",
    title: "Homeowner",
    image: "https://i.pravatar.cc/150?u=david_chen"
  }
];

export const ServiceTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-24 min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/images/service-terrace.webp" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a131a]/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6">
        <div className="bg-[#242728]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-10 md:p-16 relative shadow-2xl">
          
          <div className="flex flex-col text-center items-center">
            {/* Custom Quote Icon matching screenshot */}
            <div className="mb-6 flex gap-1 justify-center self-start md:self-center ml-0 md:-ml-8 opacity-90">
              <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 0H5C2.23858 0 0 2.23858 0 5V15.5C0 18.2614 2.23858 20.5 5 20.5H8.3845C7.26257 24.6062 4.09346 27.6743 0.654316 29.2155L0.26477 29.3901L2.46325 32L3.10915 31.7808C8.94903 29.8002 13.9169 24.8724 15.178 18.1578L15.5 16.442V15.5V0ZM39.5 0H29C26.2386 0 24 2.23858 24 5V15.5C0 18.2614 26.2386 20.5 29 20.5H32.3845C31.2626 24.6062 28.0935 27.6743 24.6543 29.2155L24.2648 29.3901L26.4632 32L27.1092 31.7808C32.949 29.8002 37.9169 24.8724 39.178 18.1578L39.5 16.442V15.5V0Z" fill="#5BA585"/>
              </svg>
            </div>
            
            <div className="min-h-[160px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <p className="text-white/90 text-[15px] md:text-[17px] leading-loose max-w-[800px] mx-auto mb-10 font-medium">
                    {testimonials[currentIndex].text}
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-[72px] h-[72px] rounded-full border-[3px] border-[#5BA585] bg-[#d1d5db] flex items-center justify-center overflow-hidden mb-4 shadow-lg">
                      {testimonials[currentIndex].image ? (
                        <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-black/20 mt-3" strokeWidth={3} />
                      )}
                    </div>
                    <h4 className="text-white font-bold tracking-widest text-sm uppercase">{testimonials[currentIndex].name}</h4>
                    <p className="text-white/50 text-sm mt-1">{testimonials[currentIndex].title}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation Arrows */}
            <button onClick={prev} className="absolute left-6 md:left-12 top-[60%] md:top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
              <ArrowLeft size={32} strokeWidth={1} />
            </button>
            <button onClick={next} className="absolute right-6 md:right-12 top-[60%] md:top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
              <ArrowRight size={32} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
