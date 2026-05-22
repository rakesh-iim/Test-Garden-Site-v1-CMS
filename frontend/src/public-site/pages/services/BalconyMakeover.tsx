import React from 'react';
import { Droplets, Leaf, Maximize, Shield } from 'lucide-react';
import { ServiceDetailPage } from '../../components/ServiceDetailPage';

export const BalconyMakeover = () => (
  <ServiceDetailPage
    pageId="service_balcony_makeover"
    metaTitle="Balcony Makeover | Premium Landscaping | MrGardenr"
    metaDescription="Maximize your apartment balcony with custom vertical gardens, built-in seating, and curated container planting to create a lush, intimate retreat."
    heroImage="/images/service-balcony.webp"
    heroImageAlt="Luxury balcony garden"
    introImage="/images/project-1.webp"
    introImageAlt="Detailed balcony greenery"
    challengesImage="/images/project-3.webp"
    challengesImageAlt="Urban balcony engineering"
    bookingImageAlt="Lush foliage background"
    bookingBackgroundClass="bg-[#0b1612]"
    accentClass="text-primary italic"
    featureIconClass="bg-primary-container/20 text-primary-container"
    bookingAccentClass="text-primary-container italic"
    featureIcons={[Leaf, Droplets, Maximize, Shield]}
    defaults={{
      breadcrumb_label: 'Balcony Makeover',
      hero_title: 'Small spaces.\nInfinite beauty.',
      hero_description: 'Turn your compact outdoor area into a lush, private sanctuary. We specialize in vertical designs that maximize space and tranquility.',
      hero_cta_label: 'Start Your Makeover',
      intro_title: 'An Extension of Your Living Space',
      intro_text_1: 'No balcony is too small for a green transformation. Our design philosophy focuses on extending your interior aesthetic to the outdoors, creating a seamless flow that makes your entire home feel larger and more connected to nature.',
      intro_text_2: 'By utilizing vertical space, hanging installations, and custom railing planters, we keep your floor space open for seating and movement while surrounding you with vibrant, air-purifying foliage.',
      challenges_title: 'Engineered for Urban Limits',
      challenges_text: 'Urban balconies come with unique challenges: strict weight limits, high winds, and unpredictable microclimates. Our engineering background ensures every design is safe and sustainable.',
      challenge_points: [
        { text: 'Ultra-lightweight potting mediums that reduce structural load by 60%.' },
        { text: 'Wind-resilient plant selection tailored for high-rise environments.' },
        { text: 'Self-contained drainage systems to protect your flooring and downstairs neighbors.' },
      ],
      features_title: 'Premium Inclusions',
      features_description: 'Every balcony makeover is equipped with high-end features designed for longevity and low maintenance.',
      features: [
        { title: 'Custom Vertical Gardens', desc: 'Space-saving living walls tailored to your sun exposure.' },
        { title: 'Smart Irrigation', desc: 'Automated, hidden drip systems for low-maintenance care.' },
        { title: 'Premium Planters', desc: 'Lightweight, weather-resistant materials for modern appeal.' },
        { title: 'Privacy Screens', desc: 'Natural bamboo or climbing plants to shield from neighbors.' },
      ],
      booking_title: 'Ready for your\nBalcony Makeover?',
      booking_description: 'Schedule a consultation today and let our experts design a customized oasis just steps from your living room.',
      booking_stats: [
        { value: '100+', label: 'Balconies Transformed' },
        { value: '5 Star', label: 'Customer Ratings' },
      ],
      highlights: [{ text: 'Vertical garden systems' }],
    }}
  />
);
