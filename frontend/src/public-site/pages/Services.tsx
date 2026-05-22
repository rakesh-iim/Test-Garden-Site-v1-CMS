import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Palette, Sprout, Grid2X2, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type ServicesContent, mergeServices, useCmsContent } from '../lib/cms';

type ServiceCard = {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  textColor: string;
  image?: string;
};

const defaultServices: ServiceCard[] = [
  { id: 'terrace-transformation', title: 'Terrace Transformation', desc: 'Turn your underutilized rooftop or terrace into a sky-high sanctuary. We design bespoke urban gardens with custom planters, optimal drainage, and resilient planting schemes.', icon: Palette, color: 'bg-primary-container/10', textColor: 'text-primary-container', image: '/images/service-terrace.webp' },
  { id: 'balcony-makeover', title: 'Balcony Makeover', desc: 'Maximize limited space with vertical gardens, custom-built seating, and curated container planting to create a lush, intimate retreat right outside your door.', icon: Sprout, color: 'bg-primary-container/10', textColor: 'text-primary-container', image: '/images/service-balcony.webp' },
  { id: 'penthouse-transformation', title: 'Penthouse Transformation', desc: 'Elevate your penthouse exteriors with luxury landscaping, incorporating architectural stonework, dynamic lighting, and elegant, wind-resilient flora.', icon: Grid2X2, color: 'bg-primary-container/10', textColor: 'text-primary-container', image: '/images/service-penthouse.webp' },
  { id: 'office-landscaping', title: 'Office Landscaping', desc: 'Develop vibrant, low-maintenance green spaces for educational or corporate campuses, establishing outdoor areas that inspire collaboration and provide a natural haven.', icon: Leaf, color: 'bg-primary-container/10', textColor: 'text-primary-container', image: '/images/service-office.webp' },
];

const defaultContent: ServicesContent = { hero_eyebrow: 'What We Do', hero_title: 'Our Services', hero_description: 'From full masterplans to meticulous maintenance, our services are tailored to create and preserve the integrity of your landscape.', services: [] };

export const Services = () => {
  const content = useCmsContent<ServicesContent>('services', defaultContent);
  const services = mergeServices(defaultServices, content.services);

  return (
    <div className="pt-24 pb-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">
      <Helmet><title>Our Landscaping Services | MrGardenr</title><meta name="description" content="Discover our specialized landscaping services including Terrace Transformation, Balcony Makeovers, Penthouse Transformations, and Office Landscaping." /></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16"><span className="inline-block bg-primary-container/10 text-primary-container font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">{content.hero_eyebrow}</span><h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{content.hero_title}</h1><p className="text-xl text-on-surface-variant max-w-3xl leading-relaxed">{content.hero_description}</p></motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{services.map((service, index) => (<motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-2xl overflow-hidden shadow-lg bg-surface-container-lowest text-on-surface group">{service.image && <Link to={`/services/${service.id}`} className="block h-64 w-full relative overflow-hidden"><img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"><span className="text-white font-bold tracking-wider uppercase text-sm border-2 border-white px-6 py-2 rounded-full backdrop-blur-md hover:bg-white hover:text-primary transition-colors">View Details</span></div></Link>}<div className="p-6 md:p-8"><h3 className="text-2xl font-display font-bold mb-3 text-on-surface"><Link to={`/services/${service.id}`} className="relative group/title inline-block hover:text-primary transition-colors">{service.title}<span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/title:scale-x-100"></span></Link></h3><p className="text-base leading-relaxed mb-6 text-on-surface-variant">{service.desc}</p><Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="relative overflow-hidden group/btn inline-flex flex-none items-center gap-2 font-bold px-6 py-3 rounded-full transition-transform duration-300 bg-primary-container text-on-primary shadow-sm hover:shadow-lg hover:scale-[1.03] hover:-translate-y-0.5"><span className="absolute inset-0 w-full h-full bg-white origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-[0.5s] ease-[cubic-bezier(0.8,0,0.2,1)] z-0"></span><span className="relative z-10 group-hover/btn:text-primary-container transition-colors duration-[0.5s]">Request a Quote</span></Link></div></motion.div>))}</div>
    </div>
  );
};



