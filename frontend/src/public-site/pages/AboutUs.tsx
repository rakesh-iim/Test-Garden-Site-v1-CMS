import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Trees, Leaf, Gem, Recycle, Paintbrush, ShieldCheck, HeartHandshake } from 'lucide-react';
import { IMAGES } from '../constants';
import { type AboutContent, type AboutStat, type AboutValue, useCmsContent } from '../lib/cms';

const AnimatedCounter = ({ value, duration = 2, suffix = '' }: { value: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  React.useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [duration, inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 } }) };
const valueIcons = [Leaf, Recycle, Gem, Paintbrush, ShieldCheck, HeartHandshake];
const defaultAbout: AboutContent = {
  hero_eyebrow: 'Heritage of Excellence',
  hero_title: 'We don\'t just transform.\nWe orchestrate ecosystems.',
  hero_description: 'Rooted in quality, we have been cultivating lush, high-end environments for over a decade. Our passion for organic precision ensures that every project we touch thrives.',
  stats: [
    { value: 15, suffix: '+', label: 'Years Cultivating' },
    { value: 500, suffix: '', label: 'Estates Managed' },
    { value: 98, suffix: '%', label: 'Client Retention' },
    { value: 40, suffix: '+', label: 'Design Awards' },
  ],
  philosophy_eyebrow: 'Our Philosophy',
  philosophy_title: 'Bridging nature & architecture',
  philosophy_text_1: 'From initial concept to final execution, our design team works tirelessly to bridge the gap between nature and architecture. Our approach is founded on sustainable practices and breathtaking aesthetics.',
  philosophy_text_2: 'We believe every outdoor space holds untapped potential. Whether it\'s a compact balcony or an expansive estate, our interdisciplinary team of horticulturists, architects, and artisans collaborate to unlock it—crafting environments that are as functional as they are extraordinary.',
  established_label: 'Est. 2010',
  values_eyebrow: 'What Drives Us',
  values_title: 'Our Core Values',
  values_description: 'These principles shape every design decision, every plant selection, and every client relationship.',
  values: [
    { title: 'Organic Precision', desc: 'Every leaf, every stone, every bloom is placed with intention. We marry botanical science with artistic sensibility to engineer ecosystems that are as healthy as they are beautiful.' },
    { title: 'Sustainable Practices', desc: 'From rainwater harvesting systems to native, drought-resistant species, sustainability is not an afterthought—it is the foundation of every design we create.' },
    { title: 'Bespoke Design', desc: 'No templates, no shortcuts. Each project is a one-of-a-kind composition crafted around your lifestyle, architecture, and the unique microclimate of your property.' },
    { title: 'Master Craftsmanship', desc: 'Our artisans bring decades of combined experience in stonework, carpentry, and horticulture—delivering finishes that rival the finest interior design.' },
    { title: 'Enduring Quality', desc: 'We select materials and species for longevity. Our landscapes are built to mature gracefully, growing more stunning with each passing season.' },
    { title: 'Client Partnership', desc: 'We listen before we design. Our collaborative process ensures your vision is honoured at every stage, from the first sketch to the final walkthrough.' },
  ],
};

export const AboutUs = () => {
  const about = useCmsContent<AboutContent>('about', defaultAbout);
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const [firstHeroLine, ...heroRest] = String(about.hero_title).split(/\r?\n/);
  const heroAccent = heroRest.join(' ');

  return (
    <div className="pt-24 pb-0 bg-surface overflow-hidden">
      <Helmet><title>About Us</title><meta name="description" content="Learn about MrGardenr, our expert team passionate about crafting bespoke botanical environments." /></Helmet>
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 mb-24 md:mb-32">
        <motion.div initial="hidden" animate="visible" className="max-w-4xl">
          <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary-container/10 text-primary-container font-bold px-5 py-2 rounded-full mb-8 tracking-wide uppercase text-xs"><Trees className="w-4 h-4" />{about.hero_eyebrow}</motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 text-on-surface leading-[1.08] tracking-tight">{firstHeroLine} {heroAccent ? <span className="text-primary italic">{heroAccent}</span> : null}</motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-xl md:text-2xl text-on-surface-variant max-w-3xl leading-relaxed font-light">{about.hero_description}</motion.p>
        </motion.div>
      </section>
      <section className="relative w-full mb-24 md:mb-32"><div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary-container/10 to-secondary/5"></div><div className="absolute inset-0 backdrop-blur-[1px]"></div><div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 py-16 md:py-20"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">{about.stats.map((stat: AboutStat, i: number) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center md:text-left"><div className="text-5xl md:text-6xl font-display font-extrabold text-primary mb-2"><AnimatedCounter value={Number(stat.value) || 0} suffix={stat.suffix || ''} /></div><div className="font-semibold text-on-surface-variant text-sm uppercase tracking-widest">{stat.label}</div></motion.div>))}</motion.div></div></section>
      <section ref={parallaxRef} className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 mb-12 md:mb-16"><div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"><motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="space-y-8"><div><span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-container mb-4">{about.philosophy_eyebrow}</span><h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface mb-6 leading-[1.1]">{about.philosophy_title}</h2><p className="text-lg text-on-surface-variant leading-relaxed">{about.philosophy_text_1}</p></div><p className="text-lg text-on-surface-variant leading-relaxed">{about.philosophy_text_2}</p><div className="flex items-center gap-6 pt-4"><div className="w-16 h-[3px] bg-primary rounded-full"></div><p className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">{about.established_label}</p></div></motion.div><div className="relative h-[550px] md:h-[650px]"><motion.div style={{ y: y1 }} className="absolute left-0 top-0 w-[80%] h-[75%] z-10 will-change-transform"><img src={IMAGES.landscaper} alt="Professional landscaper at work" loading="lazy" className="w-full h-full object-cover rounded-2xl shadow-2xl" /><div className="absolute -bottom-3 -left-3 w-24 h-24 border-l-4 border-b-4 border-primary rounded-bl-2xl"></div></motion.div><motion.div style={{ y: y2 }} className="absolute right-0 bottom-0 w-[60%] h-[60%] z-20 will-change-transform"><img src={IMAGES.foliage} alt="Lush foliage detail" loading="lazy" className="w-full h-full object-cover rounded-2xl shadow-2xl border-[8px] border-surface" /></motion.div></div></div></section>
      <section className="relative w-full mb-0"><div className="absolute inset-0 bg-gradient-to-b from-surface via-primary/[0.03] to-surface"></div><div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 pt-12 md:pt-16 pb-24 md:pb-32"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16 md:mb-20"><span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-container mb-4">{about.values_eyebrow}</span><h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface mb-6">{about.values_title}</h2><p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">{about.values_description}</p></motion.div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{about.values.map((value: AboutValue, i: number) => { const Icon = valueIcons[i] || Leaf; return (<motion.div key={value.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="group relative bg-surface-container-lowest rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow duration-500 border border-transparent hover:border-primary/10 overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div><div className="relative z-10"><div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"><Icon className="w-6 h-6" /></div><h3 className="text-xl font-display font-bold text-on-surface mb-3">{value.title}</h3><p className="text-on-surface-variant leading-relaxed text-[15px]">{value.desc}</p></div></motion.div>); })}</div></div></section>
    </div>
  );
};

