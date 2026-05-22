import React from 'react';
import { Droplets, Gem, Sparkles, Wind } from 'lucide-react';
import { ServiceDetailPage } from '../../components/ServiceDetailPage';

export const PenthouseTransformation = () => (
  <ServiceDetailPage
    pageId="service_penthouse_transformation"
    metaTitle="Luxury Penthouse Landscaping | Premium Landscaping | MrGardenr"
    metaDescription="Elevate your penthouse exteriors with luxury landscaping, incorporating architectural stonework, dynamic lighting, and elegant flora."
    heroImage="/images/service-penthouse.webp"
    heroImageAlt="Penthouse landscape"
    introImage="/images/latest-dlf-botanicals.webp"
    introImageAlt="Luxury penthouse architecture"
    challengesImage="/images/latest-sumadhura.webp"
    challengesImageAlt="Penthouse elements"
    bookingImageAlt="Penthouse background"
    bookingBackgroundClass="bg-[#050505]"
    accentClass="text-primary italic"
    featureIconClass="bg-primary/20 text-on-surface"
    bookingAccentClass="text-primary italic"
    featureIcons={[Gem, Wind, Droplets, Sparkles]}
    defaults={{
      breadcrumb_label: 'Penthouse',
      hero_title: 'Ultra-luxury\nelevation.',
      hero_description: 'Craft exteriors that rival your interiors. We engineer structural landscapes with premium stonework and bespoke water features.',
      hero_cta_label: 'Commission Project',
      intro_title: 'An Extension of Excellence',
      intro_text_1: 'Our penthouse transformation service is tailored specifically for high-end luxury requirements, where architecture and nature blend seamlessly.',
      intro_text_2: 'We view the outdoor terrace not just as an add-on, but as the crowning jewel of your residence. By matching interior sightlines and utilizing premium imported materials, we ensure the transition from inside to out is flawlessly executed.',
      challenges_title: 'Engineered for the Elements',
      challenges_text: 'High-altitude gardening introduces severe wind shear, intense sun exposure, and strict structural weight capacities. Our horticultural engineers mitigate these risks flawlessly.',
      challenge_points: [
        { text: 'Rigorous structural load assessments and weight distribution strategies.' },
        { text: 'Wind-baffling planting designs and resilient glass balustrades.' },
        { text: 'Fully automated micro-drip irrigation and architectural lighting.' },
      ],
      features_title: 'Uncompromising Quality',
      features_description: 'Every penthouse project features ultra-premium materials and smart home integration.',
      features: [
        { title: 'Architectural Stonework', desc: 'Custom travertine and luxury stone paving.' },
        { title: 'Specimen Trees', desc: 'Mature, architectural flora craned in for immediate impact.' },
        { title: 'Bespoke Water Features', desc: 'Sleek, integrated pools and reflection ponds.' },
        { title: 'Smart Automation', desc: 'App-controlled lighting, heating, and irrigation.' },
      ],
      booking_title: 'Commission your\nSkyline Retreat.',
      booking_description: 'Connect with our principal landscape architects to begin drafting the blueprint for your ultimate penthouse exterior.',
      booking_stats: [
        { value: 'Exclusive', label: 'Bespoke Design' },
        { value: 'Discreet', label: 'White-Glove Service' },
      ],
      highlights: [{ text: 'Wind-resilient planting schemes' }],
    }}
  />
);
