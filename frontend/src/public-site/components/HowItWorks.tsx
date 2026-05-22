import React from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, UsersRound, MousePointer2, Handshake, PartyPopper, Leaf } from 'lucide-react';

const steps = [
  { icon: CalendarCheck, text: "Book an appointment" },
  { icon: UsersRound, text: "Meet with our plant expert" },
  { icon: MousePointer2, text: "Complete the selection from a wide range of gardening products" },
  { icon: Handshake, text: "Shake hands with Mr Gardenr" },
  { icon: PartyPopper, text: "Enjoy in your new lush green paradise" }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Grid Overlay for Subtle Architectural Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Animated Floating Leaves (Theme Related) */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[5%] text-primary/10 -z-10 pointer-events-none hidden md:block"
      >
        <Leaf size={100} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-[5%] text-primary/10 -z-10 pointer-events-none hidden md:block"
      >
        <Leaf size={120} strokeWidth={1} />
      </motion.div>
      
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold text-on-surface">
            How it works
          </h2>
        </div>
        
        <div className="relative w-full">
          {/* Horizontal line (animated like a growing vine) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute top-[63px] left-[10%] right-[10%] h-[2px] bg-black/15 dark:bg-white/15 z-0 origin-left"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 60, damping: 20 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Circle with Icon (Blooming animation on hover) */}
                <div className="w-32 h-32 rounded-full border-[1.5px] border-black/15 dark:border-white/15 bg-surface flex items-center justify-center mb-6 group-hover:border-primary group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 ease-out relative z-10 group-hover:-translate-y-2">
                  <step.icon className="w-14 h-14 text-primary/80 group-hover:text-primary transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-6" strokeWidth={1.5} />
                </div>
                
                {/* Text */}
                <p className="text-[15px] leading-snug md:text-base text-on-surface font-medium max-w-[200px]">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Book A Free Consultation Button */}
          <div className="mt-16 text-center">
            <button className="bg-[#6a9b7e] hover:bg-[#528a67] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
              Book A Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
