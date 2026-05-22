import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useCmsContent } from '../lib/cms';

const defaultNav = {
  logoAlt: 'MrGardenr Logo',
  ctaLabel: 'Book a Visit',
  ctaPath: '/booking',
  navItems: [
    { name: 'Home', path: '/#home' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blogs', path: '/projects' },
    { name: 'Store Locator', path: '/#locations' },
  ],
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigation = useCmsContent('global_navigation', defaultNav);
  const navItems = Array.isArray(navigation.navItems) && navigation.navItems.length > 0 ? navigation.navItems : defaultNav.navItems;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 h-14 sm:h-16 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img src="/logo.webp" alt={navigation.logoAlt || defaultNav.logoAlt} className="h-12 sm:h-14 scale-[2.8] sm:scale-[3.2] origin-left object-contain w-auto mix-blend-multiply [clip-path:inset(0_0_25%_0)] translate-y-1 sm:translate-y-2 -translate-x-12 sm:-translate-x-14" />
          </Link>
        </div>

        <div className="hidden lg:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = location.pathname + location.hash === item.path || (location.pathname === '/' && location.hash === '' && item.path === '/#home');
            return (
              <Link key={item.name} to={item.path} className={`relative group text-sm font-semibold inline-block origin-center transition-all duration-300 hover:scale-[1.05] hover:-translate-y-0.5 hover:text-primary hover:drop-shadow-sm ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                {item.name}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            );
          })}
          <Link to={navigation.ctaPath || defaultNav.ctaPath} className="relative overflow-hidden group bg-primary-container text-on-primary px-6 py-2.5 rounded-full font-semibold text-sm text-center shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-[1.03] hover:-translate-y-0.5 my-auto">
            <span className="absolute inset-0 w-full h-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.5s] ease-[cubic-bezier(0.8,0,0.2,1)] z-0"></span>
            <span className="relative z-10 group-hover:text-primary-container transition-colors duration-[0.5s]">{navigation.ctaLabel || defaultNav.ctaLabel}</span>
          </Link>
        </div>

        <button className="lg:hidden text-primary" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle mobile menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-surface border-t border-surface-container-highest overflow-hidden">
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => {
                const isActive = location.pathname + location.hash === item.path || (location.pathname === '/' && location.hash === '' && item.path === '/#home');
                return (
                  <Link key={item.name} to={item.path} className={`text-lg font-semibold ${isActive ? 'text-primary' : 'text-on-surface'}`} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                );
              })}
              <Link to={navigation.ctaPath || defaultNav.ctaPath} onClick={() => setIsOpen(false)} className="relative overflow-hidden group bg-primary-container text-on-primary px-6 py-3 rounded-full font-semibold mt-2 text-center text-base block shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-[1.03] hover:-translate-y-0.5">
                <span className="absolute inset-0 w-full h-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.5s] ease-[cubic-bezier(0.8,0,0.2,1)] z-0"></span>
                <span className="relative z-10 group-hover:text-primary-container transition-colors duration-[0.5s]">{navigation.ctaLabel || defaultNav.ctaLabel}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
