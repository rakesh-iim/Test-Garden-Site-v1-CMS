import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth out the scroll progress ring animation
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90
  });

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 300);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-32 right-6 md:bottom-24 md:right-8 z-50 group cursor-pointer w-14 h-14 flex items-center justify-center rounded-full hover:-translate-y-1 transition-all duration-500"
          aria-label="Back to top"
        >
          {/* Circular Progress SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle 
              cx="50" cy="50" r="48" 
              className="stroke-surface-container-highest/50 fill-none" 
              strokeWidth="2" 
            />
            {/* Progress Stroke */}
            <motion.circle 
              cx="50" cy="50" r="48" 
              className="stroke-primary fill-none" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          {/* Inner Button Circle with Arrow */}
          <div className="relative z-10 w-11 h-11 bg-surface/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-surface-container-highest overflow-hidden transition-all duration-500 group-hover:shadow-[0_8px_25px_rgba(91,165,133,0.3)] group-hover:border-primary/30">
            <div className="absolute inset-0 bg-primary origin-top-right group-hover:origin-bottom-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] z-0"></div>
            <ArrowUp strokeWidth={2} className="w-5 h-5 relative z-10 group-hover:text-white transition-all duration-500 group-hover:-translate-y-0.5" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
