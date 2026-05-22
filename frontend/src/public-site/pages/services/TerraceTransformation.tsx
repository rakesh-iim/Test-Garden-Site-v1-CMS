import React from 'react';
import { Leaf, Maximize, Sun, Waves } from 'lucide-react';
import { ServiceDetailPage } from '../../components/ServiceDetailPage';

export const TerraceTransformation = () => (
  <ServiceDetailPage
    pageId="service_terrace_transformation"
    metaTitle="Terrace Transformation | Premium Landscaping | MrGardenr"
    metaDescription="Turn your underutilized rooftop or terrace into a sky-high sanctuary. We design bespoke urban gardens with custom planters and resilient planting schemes."
    heroImage="/images/service-terrace.webp"
    heroImageAlt="Lush terrace garden"
    introImage="/images/project-2.webp"
    introImageAlt="Terrace entertainment area"
    challengesImage="/images/latest-indian.webp"
    challengesImageAlt="Rooftop landscaping"
    bookingImageAlt="Terrace background"
    bookingBackgroundClass="bg-[#05110c]"
    accentClass="text-primary-container italic"
    featureIconClass="bg-primary/10 text-primary"
    bookingAccentClass="text-primary-container italic"
    featureIcons={[Maximize, Leaf, Sun, Waves]}
    defaults={{
      breadcrumb_label: 'Terrace Transformation',
      hero_title: 'Elevate your\nurban view.',
      hero_description: 'Turn your underutilized rooftop or terrace into a sky-high sanctuary. We design and engineer bespoke outdoor living spaces.',
      hero_cta_label: 'Start Your Transformation',
      intro_title: 'A Sanctuary Above the City',
      intro_text_1: 'Terraces present a unique opportunity to create a private oasis elevated above the city bustle. Our terrace transformation service encompasses an end-to-end design and installation process that takes your outdoor space from concrete slab to an immersive green sanctuary.',
      intro_text_2: 'Whether you envision a sleek, modern entertainment area with integrated dining, or a wild, biodiverse rooftop garden that brings nature to your doorstep, our team works to seamlessly extend your living space outdoors.',
      challenges_title: 'Mastering Rooftop Challenges',
      challenges_text: 'We understand that rooftop environments are uniquely challenging. High winds, intense sun exposure, and strict structural weight limits define the space.',
      challenge_points: [
        { text: 'Specialized lightweight soil compounds engineered for terraces.' },
        { text: 'Wind-baffling plant structures that protect delicate flora.' },
        { text: 'Advanced irrigation systems to handle extreme urban heat without wasting water.' },
      ],
      features_title: 'Terrace Inclusions',
      features_description: 'Every terrace project is equipped with specialized elements designed to thrive at altitude.',
      features: [
        { title: 'Bespoke Hardscaping', desc: 'Custom decking, pergolas, and integrated seating.' },
        { title: 'Skyline Greenery', desc: 'Wind-baffling planting schemes tailored to altitude.' },
        { title: 'Architectural Lighting', desc: 'Ambient and task lighting for evening entertainment.' },
        { title: 'Advanced Drainage', desc: 'Invisible, high-capacity drainage and water management.' },
      ],
      booking_title: 'Unlock your\nRooftop Potential.',
      booking_description: 'Connect with our design team today and start planning the ultimate elevated escape.',
      booking_stats: [
        { value: '300+', label: 'Terraces Designed' },
        { value: 'Award', label: 'Winning Designs' },
      ],
      highlights: [{ text: 'Custom drainage planning' }],
    }}
  />
);
