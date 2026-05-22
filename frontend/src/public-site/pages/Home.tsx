import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Palette, Sprout, Grid2X2, Leaf, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import { LandscapesInAction } from '../components/LandscapesInAction';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ClientMarquee } from '../components/ClientMarquee';
import { StoreLocator } from '../components/StoreLocator';
import { type HomepageContent, type ProjectsContent, type ServicesContent, type TextFeature, mergeFeaturedProjects, mergeServices, useCmsContent } from '../lib/cms';
const ServiceBooking = React.lazy(() => import('../components/ServiceBooking'));

type HomeServiceCard = {
  title: string;
  id: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  textColor: string;
  large?: boolean;
  image?: string;
  theme?: 'magnetic';
  decoration?: 'grid' | 'blob' | 'leaf';
  border?: string;
};

const defaultServices: HomeServiceCard[] = [
  { title: 'Terrace Transformation', id: 'terrace-transformation', desc: 'Turn your underutilized rooftop or terrace into a sky-high sanctuary. We design bespoke urban gardens with custom planters, optimal drainage, and resilient planting schemes.', icon: Palette, color: 'bg-primary-container/10', textColor: 'text-primary-container', large: true, image: '/images/service-terrace.webp' },
  { title: 'Balcony Makeover', id: 'balcony-makeover', desc: 'Maximize limited space with vertical gardens, custom-built seating, and curated container planting to create a lush, intimate retreat right outside your door.', icon: Sprout, color: 'bg-primary-container', textColor: 'text-on-primary', theme: 'magnetic', image: '/images/booking-bg.webp', decoration: 'leaf' },
  { title: 'Penthouse Transformation', id: 'penthouse-transformation', desc: 'Elevate your penthouse exteriors with luxury landscaping, incorporating architectural stonework, dynamic lighting, and elegant, wind-resilient flora.', icon: Grid2X2, color: 'bg-secondary-container/30', textColor: 'text-on-secondary-container', decoration: 'blob' },
  { title: 'Office Landscaping', id: 'office-landscaping', desc: 'Develop vibrant, low-maintenance green spaces for educational or corporate campuses, establishing outdoor areas that inspire collaboration and provide a natural haven.', icon: Leaf, color: 'bg-primary/10', textColor: 'text-primary', border: 'border-t-4 border-primary', decoration: 'grid' },
];

const defaultHomepage: HomepageContent = {
  hero_top_text: 'Premium Landscaping Services',
  hero_main_text: 'Crafting Nature\'s',
  hero_sub_text: 'Masterpieces',
  hero_description: 'Transform your outdoor space into a vibrant, high-energy sanctuary. We blend professional precision with organic vitality to create tropical environments that breathe.',
  hero_primary_cta_label: 'Get a Free Quote',
  hero_primary_cta_path: '/contact#book',
  hero_secondary_cta_label: 'View Gallery',
  hero_secondary_cta_path: '/gallery',
  expertise_title: 'Our Expertise',
  expertise_description: 'Comprehensive landscaping solutions designed to cultivate vibrant, healthy, and structurally sound environments.',
  projects_title: 'Our landscapes in action',
  projects_description: 'Estates designed for scale, complexity, and growth. Each project reflects the expertise of landscape designers for outdoor environments, balancing form, function, and identity.',
  testimonials_title: 'Client Stories',
  testimonials_description: 'See what our clients have to say about the lush escapes we\'ve built for them.',
  about_title: 'Cultivate your\nperfect space.',
  about_text: 'Ready to bring breathing room and lush vitality to your landscape? Schedule an expert consultation and let our design team cultivate your vision into reality.',
  consultation_features: [{ text: 'Personalized styling advice' }, { text: 'Precise site measurements' }, { text: 'Tailored plant selection' }],
  testimonials: [],
};

const Hero = ({ cmsData }: { cmsData: HomepageContent }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <header ref={ref} className="relative pt-20 overflow-hidden bg-surface-container-low min-h-[90vh] flex items-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0 scale-[1.2] origin-top will-change-transform">
        <img src={IMAGES.hero} alt="Lush garden" loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-black/40" />
      </motion.div>
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <span className="inline-block bg-secondary-container text-on-secondary-container text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">{cmsData.hero_top_text}</span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-on-surface mb-6 leading-[1.1] tracking-tight">{cmsData.hero_main_text} <br /><span className="text-primary-container">{cmsData.hero_sub_text}</span></h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed font-medium max-w-xl">{cmsData.hero_description}</p>
          <div className="flex flex-wrap gap-4">
            <Link to={cmsData.hero_primary_cta_path} className="relative overflow-hidden group bg-primary-container text-on-primary font-bold px-8 py-4 rounded-full flex items-center gap-3 w-fit shadow-lg border border-transparent transition-transform duration-300 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1"><span className="absolute inset-0 w-full h-full bg-white origin-top-right group-hover:origin-bottom-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] z-0"></span><span className="relative z-10 group-hover:text-primary-container transition-colors duration-500">{cmsData.hero_primary_cta_label}</span><ArrowRight className="w-5 h-5 relative z-10 group-hover:text-primary-container transition-colors duration-500" /></Link>
            <Link to={cmsData.hero_secondary_cta_path} className="relative overflow-hidden group border-2 border-secondary text-secondary font-bold px-8 py-4 rounded-full transition-transform duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 w-fit text-center"><span className="absolute inset-0 w-full h-full bg-secondary origin-top-right group-hover:origin-bottom-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] z-0"></span><span className="relative z-10 group-hover:text-surface transition-colors duration-500">{cmsData.hero_secondary_cta_label}</span></Link>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

const Expertise = ({ title, description, servicesToRender }: { title: string; description: string; servicesToRender: HomeServiceCard[] }) => (
  <section className="py-24 w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-24">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{title}</h2><p className="text-lg text-on-surface-variant max-w-2xl mx-auto">{description}</p></motion.div>
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }} className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {servicesToRender.map((s, i) => (
        <motion.div key={s.title || i} variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } } }} whileHover={{ y: -8, transition: { type: 'tween', duration: 0.25 } }} className={`${s.large ? 'md:col-span-8' : i === 1 ? 'md:col-span-4' : 'md:col-span-6'} rounded-2xl p-8 ambient-shadow relative overflow-hidden group transition-colors duration-500 ${s.theme === 'magnetic' ? 'bg-primary-container text-on-primary shadow-lg' : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface hover:shadow-xl border border-surface-container-low'} ${s.border || ''}`}>
          {s.theme === 'magnetic' && <span className="absolute inset-0 w-full h-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.5s] ease-[cubic-bezier(0.8,0,0.2,1)] z-0"></span>}
          {s.decoration === 'grid' && <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>}
          {s.decoration === 'blob' && <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-[40px] group-hover:bg-primary/40 transition-colors duration-700"></div>}
          {s.decoration === 'leaf' && <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:-rotate-12 group-hover:scale-110 pointer-events-none"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-full h-full text-primary-container"><path d="M17.5,3 C17.5,3 22,7 22,13 C22,18 18.5,21.5 13.5,22 C8.5,22.5 2.5,17 2,12 C1.5,7 6,2.5 11.5,2 C15.5,1.5 17.5,3 17.5,3 Z" /></svg></div>}
          {s.image && <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 group-hover:opacity-[0.14] transition-opacity duration-500 [mask-image:linear-gradient(to_left,white_0%,transparent_100%)]"><img src={s.image} loading="lazy" decoding="async" alt="" className="w-full h-full object-cover object-right" /></div>}
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${s.theme === 'magnetic' ? 'bg-white/20 group-hover:bg-primary-container/10 transition-colors duration-[0.5s]' : s.color} ${s.theme === 'magnetic' ? 'text-on-primary' : s.textColor}`}><s.icon className={`w-6 h-6 transform transition-transform duration-300 group-hover:scale-110 ${s.theme === 'magnetic' ? 'group-hover:text-primary-container transition-colors duration-[0.5s]' : ''}`} /></div>
              <Link to={`/services/${s.id}`}><h3 className={`relative group/title inline-block text-2xl font-display font-bold mb-3 ${s.theme === 'magnetic' ? 'text-on-primary group-hover:text-primary-container transition-colors duration-[0.5s]' : 'text-on-surface group-hover:text-primary transition-colors'}`}>{s.title}<span className={`absolute -bottom-1 left-0 w-full h-[2px] ${s.theme === 'magnetic' ? 'bg-primary-container' : 'bg-primary'} origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/title:scale-x-100`}></span></h3></Link>
              <p className={`${s.theme === 'magnetic' ? 'text-on-primary/90 group-hover:text-primary-container/90 transition-colors duration-[0.5s]' : 'text-on-surface-variant group-hover:text-on-surface transition-colors'} mb-6 leading-relaxed`}>{s.desc}</p>
            </div>
            <Link to={`/services/${s.id}`} className={`relative group/learn inline-flex w-fit items-center gap-1 font-bold text-sm ${s.theme === 'magnetic' ? 'text-on-primary group-hover:text-primary-container transition-colors duration-[0.5s]' : 'text-primary-container group-hover:text-primary'} group-hover:gap-2 transition-all`}>Learn more<span className="sr-only"> about {s.title}</span> <ArrowRight className="w-4 h-4" /><span className={`absolute -bottom-1 left-0 w-full h-[2px] ${s.theme === 'magnetic' ? 'bg-primary-container' : 'bg-primary'} origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/learn:scale-x-100`}></span></Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export const Home = () => {
  const homepage = useCmsContent<HomepageContent>('homepage', defaultHomepage);
  const servicesPage = useCmsContent<ServicesContent>('services', { hero_eyebrow: 'What We Do', hero_title: 'Our Services', hero_description: '', services: [] });
  const projectsPage = useCmsContent<{ hero_title: string; hero_description: string; featuredProjects: ProjectsContent['featuredProjects'] }>('projects', { hero_title: '', hero_description: '', featuredProjects: [] });
  const servicesToRender = mergeServices(defaultServices, servicesPage.services);
  const featuredProjects = mergeFeaturedProjects(projectsPage.featuredProjects);
  const consultationFeatures = Array.isArray(homepage.consultation_features) && homepage.consultation_features.length > 0 ? homepage.consultation_features : defaultHomepage.consultation_features;

  return (
    <>
      <Helmet><title>MrGardenr</title><meta name="description" content="MrGardenr provides professional landscaping services. Specializing in high-end terrace transformations, balcony makeovers, and commercial office landscaping." /><meta name="keywords" content="expert landscape design, urban landscaping, terrace transformations, bespoke outdoor spaces, landscaping services" /></Helmet>
      <div id="home"><Hero cmsData={homepage} /></div>
      <div id="services" className="bg-surface relative z-10"><Expertise title={homepage.expertise_title} description={homepage.expertise_description} servicesToRender={servicesToRender} /></div>
      <div id="projects" className="bg-surface-container-lowest border-y border-black/5 dark:border-white/5 relative z-10"><LandscapesInAction title={homepage.projects_title} description={homepage.projects_description} projects={featuredProjects} /></div>
      <div id="testimonials" className="bg-surface relative z-10"><TestimonialsSection cmsTestimonials={homepage.testimonials} title={homepage.testimonials_title} description={homepage.testimonials_description} /></div>
      <div className="bg-surface-container-low border-t border-black/5 dark:border-white/5 relative z-10"><ClientMarquee /></div>
      <div id="contact" className="relative z-10 bg-white">
        <StoreLocator />
        <div className="bg-[#0b1612] text-white py-12 lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#13261f] hidden lg:block rounded-l-[4rem]"></div>
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
          <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }} className="space-y-10">
                <div>
                  <span className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-4 py-2 rounded-full mb-8 tracking-wide uppercase text-sm shadow-sm backdrop-blur-sm"><Leaf className="w-4 h-4" />Book a Consultation</span>
                  <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-bold mb-6 text-white leading-[1.1] tracking-tight whitespace-pre-line">{homepage.about_title}</h2>
                  <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">{homepage.about_text}</p>
                  <div className="mt-8 space-y-4 max-w-md">
                    {consultationFeatures.map((feature: TextFeature, index: number) => (
                      <div key={`${feature.text}-${index}`} className="flex items-center gap-4 text-white font-medium"><div className="bg-white/20 p-1.5 rounded-full shrink-0"><CheckCircle2 className="w-5 h-5 text-white" /></div>{feature.text}</div>
                    ))}
                  </div>
                </div>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] max-w-lg hidden md:block group"><img src={IMAGES.project1} alt="Landscaping transformation" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div><div className="absolute bottom-8 left-8 right-8"><p className="text-white font-medium text-lg lg:text-xl leading-snug">"The team completely transformed our space into a lush oasis. Best decision we've made."</p><p className="text-white/70 mt-3 font-semibold tracking-wide uppercase text-sm">— Sarah Jenkins</p></div></div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} className="relative"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-primary-container/20 blur-[50px] rounded-full -z-10"></div><React.Suspense fallback={<div className="w-full lg:max-w-xl min-h-[400px] flex items-center justify-center bg-surface/95 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.2)] border-white/10 backdrop-blur-xl mx-0 lg:ml-auto"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>}><ServiceBooking className="w-full lg:max-w-xl shadow-[0_8px_40px_rgba(0,0,0,0.2)] border-white/10 backdrop-blur-xl bg-surface/95 mx-0 lg:ml-auto" /></React.Suspense></motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


