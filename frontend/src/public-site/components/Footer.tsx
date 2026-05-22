import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { useCmsContent } from '../lib/cms';

const defaultFooter = {
  copyrightText: `© ${new Date().getFullYear()} MrGardenr.`,
  contactCtaLabel: 'Contact Us',
  contactCtaPath: '/contact',
  footerLinks: [
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Gallery Showcase', path: '/gallery' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ],
  socialLinks: [
    { platform: 'Instagram', href: '#' },
    { platform: 'Facebook', href: '#' },
  ],
};

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
};

export const Footer = () => {
  const footer = useCmsContent('global_footer', defaultFooter);
  const links = Array.isArray(footer.footerLinks) && footer.footerLinks.length > 0 ? footer.footerLinks : defaultFooter.footerLinks;
  const socialLinks = Array.isArray(footer.socialLinks) && footer.socialLinks.length > 0 ? footer.socialLinks : defaultFooter.socialLinks;

  return (
    <footer className="bg-surface-container-highest/95 backdrop-blur-md py-4 md:py-6 px-6 border-t border-black/5 shadow-[0_-4px_25px_rgba(0,0,0,0.1)]">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
          <div className="flex items-center gap-2 md:mr-10">
            <Link to="/" className="flex items-center">
              <img src="/logo.webp" alt="MrGardenr Logo" loading="lazy" className="h-12 sm:h-14 scale-[1.8] sm:scale-[2.2] origin-center md:origin-left object-contain w-auto mix-blend-multiply [clip-path:inset(0_0_25%_0)] translate-y-1 sm:translate-y-1 -translate-x-3 sm:-translate-x-6" />
            </Link>
          </div>
          <div className="hidden md:block w-px h-6 bg-black/10 mx-2" />
          <p className="text-sm text-on-surface-variant font-medium hidden lg:block">{footer.copyrightText || defaultFooter.copyrightText}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 w-full md:w-auto">
          {links.map((link) => (
            <Link key={link.label} to={link.path} className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium relative group overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-300">{link.label}</span>
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-primary">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.platform.toLowerCase() as keyof typeof socialIcons];
              if (!Icon) return null;
              return (
                <a key={social.platform} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-md transition-all duration-300 shadow-sm" aria-label={social.platform}>
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
          <Link to={footer.contactCtaPath || defaultFooter.contactCtaPath} className="relative overflow-hidden group flex items-center gap-2 bg-primary-container text-on-primary px-5 py-2.5 rounded-full font-bold text-sm hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-lg transition-transform duration-300 shadow-sm whitespace-nowrap">
            <span className="absolute inset-0 w-full h-full bg-white origin-top-right group-hover:origin-bottom-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] z-0"></span>
            <Phone size={16} className="relative z-10 group-hover:text-primary-container transition-colors duration-[0.5s] shrink-0" />
            <span className="relative z-10 group-hover:text-primary-container transition-colors duration-[0.5s]">{footer.contactCtaLabel || defaultFooter.contactCtaLabel}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
