import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, type LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceBooking from './ServiceBooking';
import { HowItWorks } from './HowItWorks';
import { ServiceTestimonials } from './ServiceTestimonials';
import { mergeCollection, splitLines, useCmsContent } from '../lib/cms';

type TextItem = {
  text: string;
};

type FeatureItem = {
  title: string;
  desc: string;
};

type BookingStat = {
  value: string;
  label: string;
};

type ServiceDetailContent = {
  breadcrumb_label: string;
  hero_title: string;
  hero_description: string;
  hero_cta_label: string;
  intro_title: string;
  intro_text_1: string;
  intro_text_2: string;
  challenges_title: string;
  challenges_text: string;
  challenge_points: TextItem[];
  features_title: string;
  features_description: string;
  features: FeatureItem[];
  booking_title: string;
  booking_description: string;
  booking_stats: BookingStat[];
  highlights: TextItem[];
};

type ServiceDetailPageProps = {
  pageId: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  introImage: string;
  introImageAlt: string;
  challengesImage: string;
  challengesImageAlt: string;
  bookingImageAlt: string;
  bookingBackgroundClass: string;
  accentClass: string;
  featureIconClass: string;
  bookingAccentClass: string;
  featureIcons: LucideIcon[];
  defaults: ServiceDetailContent;
};

const AccentHeading = ({ value, accentClass, className }: { value: string; accentClass: string; className: string }) => {
  const [firstLine, ...rest] = splitLines(value);
  const accentLine = rest.join(' ');

  return (
    <h1 className={className}>
      {firstLine}
      {accentLine ? (
        <>
          <br />
          <span className={accentClass}>{accentLine}</span>
        </>
      ) : null}
    </h1>
  );
};

export const ServiceDetailPage = ({
  pageId,
  metaTitle,
  metaDescription,
  heroImage,
  heroImageAlt,
  introImage,
  introImageAlt,
  challengesImage,
  challengesImageAlt,
  bookingImageAlt,
  bookingBackgroundClass,
  accentClass,
  featureIconClass,
  bookingAccentClass,
  featureIcons,
  defaults,
}: ServiceDetailPageProps) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const content = useCmsContent<ServiceDetailContent>(pageId, defaults);

  const challengePoints = mergeCollection<TextItem, TextItem>(defaults.challenge_points, content.challenge_points, (item) => ({ text: String(item.text || '').trim() }));
  const bookingStats = mergeCollection<BookingStat, BookingStat>(defaults.booking_stats, content.booking_stats, (item) => ({ value: String(item.value || ''), label: String(item.label || '') }));
  const features = mergeCollection<FeatureItem, FeatureItem>(defaults.features, content.features, (item, index) => ({
    title: String(item.title || defaults.features[index]?.title || ''),
    desc: String(item.desc || defaults.features[index]?.desc || ''),
  }));

  return (
    <div className="bg-surface relative overflow-hidden">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <section className="relative h-[80vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-black">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 opacity-80">
          <img src={heroImage} alt={heroImageAlt} fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 flex flex-col md:flex-row gap-8 justify-between items-end">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="max-w-3xl">
            <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-white/80 hover:text-primary mb-6 font-bold uppercase tracking-widest text-sm transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            <div className="flex items-center gap-2 text-white/80 mb-6 text-sm font-bold uppercase tracking-widest">
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-primary">{content.breadcrumb_label}</span>
            </div>
            <AccentHeading value={content.hero_title} accentClass={accentClass} className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6" />
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-2xl">{content.hero_description}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <a href="#book-now" className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group whitespace-nowrap">
              {content.hero_cta_label}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative z-10 bg-surface">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface leading-tight">{content.intro_title}</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">{content.intro_text_1}</p>
              <p className="text-lg text-on-surface-variant leading-relaxed">{content.intro_text_2}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-100px' }} className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src={introImage} alt={introImageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse mb-24">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} className="space-y-8 lg:pl-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface leading-tight">{content.challenges_title}</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">{content.challenges_text}</p>
              <ul className="space-y-4">
                {challengePoints.map((item, index) => (
                  <li key={`${item.text}-${index}`} className="flex items-start gap-3 text-on-surface-variant font-medium">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-100px' }} className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src={challengesImage} alt={challengesImageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-lowest relative">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface mb-4">{content.features_title}</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">{content.features_description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = featureIcons[index] || featureIcons[0];
              return (
                <motion.div key={`${feature.title}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative bg-surface p-8 rounded-[2rem] shadow-sm border border-black/5 dark:border-white/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${featureIconClass}`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-on-surface-variant relative z-10 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorks />
      <ServiceTestimonials />

      <section id="book-now" className={`relative py-24 overflow-hidden ${bookingBackgroundClass}`}>
        <div className="absolute inset-0 z-0">
          <img src="/images/booking-bg.webp" alt={bookingImageAlt} className="w-full h-full object-cover opacity-10 mix-blend-luminosity grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <AccentHeading value={content.booking_title} accentClass={bookingAccentClass} className="text-4xl md:text-5xl lg:text-[4rem] font-display font-bold text-white leading-tight" />
              <p className="text-xl text-white/80 max-w-lg leading-relaxed">{content.booking_description}</p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {bookingStats.map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <h4 className="text-3xl font-bold text-white mb-2">{stat.value}</h4>
                    <p className="text-white/70 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <ServiceBooking className="w-full lg:max-w-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border-white/10 backdrop-blur-xl bg-surface/95 mx-0 lg:ml-auto rounded-[2.5rem]" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
