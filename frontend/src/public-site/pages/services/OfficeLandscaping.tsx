import React from 'react';
import { Building, Droplets, Sun, Users } from 'lucide-react';
import { ServiceDetailPage } from '../../components/ServiceDetailPage';

export const OfficeLandscaping = () => (
  <ServiceDetailPage
    pageId="service_office_landscaping"
    metaTitle="Office & Corporate Landscaping | Premium Landscaping | MrGardenr"
    metaDescription="Develop vibrant, low-maintenance green spaces for corporate campuses that inspire collaboration and boost employee morale."
    heroImage="/images/service-office.webp"
    heroImageAlt="Corporate office landscaping"
    introImage="/images/latest-amway.webp"
    introImageAlt="Corporate courtyard landscaping"
    challengesImage="/images/latest-campari.webp"
    challengesImageAlt="Sustainable corporate landscaping"
    bookingImageAlt="Corporate background"
    bookingBackgroundClass="bg-[#081017]"
    accentClass="text-primary italic"
    featureIconClass="bg-primary/10 text-primary"
    bookingAccentClass="text-primary italic"
    featureIcons={[Users, Building, Sun, Droplets]}
    defaults={{
      breadcrumb_label: 'Office Landscaping',
      hero_title: 'Green minds.\nGreat work.',
      hero_description: 'Transform corporate campuses into vibrant hubs of productivity. We design low-maintenance green spaces that inspire collaboration.',
      hero_cta_label: 'Partner With Us',
      intro_title: 'Enhance Morale & Productivity',
      intro_text_1: 'Modern workspaces require more than just desks and screens. Integrating biophilic design into corporate environments has been proven to reduce stress, improve air quality, and boost overall employee morale.',
      intro_text_2: 'From striking entrance landscapes that impress visiting clients to serene courtyards that offer employees a mental reset, our corporate landscaping services balance aesthetic impact with practical, low-maintenance longevity.',
      challenges_title: 'Sustainable & Scalable',
      challenges_text: 'Corporate landscaping must be scalable and sustainable. We prioritize water conservation and resilient native planting to ensure your campus looks pristine year-round with minimal intervention.',
      challenge_points: [
        { text: 'Smart irrigation systems that adapt to local weather patterns.' },
        { text: 'Drought-resistant flora that reduces long-term water consumption.' },
        { text: 'Comprehensive maintenance plans tailored to commercial properties.' },
      ],
      features_title: 'Corporate Inclusions',
      features_description: 'Our office landscaping services include premium features designed for high-traffic environments.',
      features: [
        { title: 'Collaborative Zones', desc: 'Outdoor seating and meeting areas designed for focus and teamwork.' },
        { title: 'Biophilic Design', desc: 'Seamless integration of indoor and outdoor plant life.' },
        { title: 'Drought-Tolerant Plants', desc: 'Low-maintenance native species that thrive in corporate settings.' },
        { title: 'Smart Irrigation', desc: 'Water-efficient drip systems tailored to large-scale campuses.' },
      ],
      booking_title: 'Transform your\nCorporate Campus.',
      booking_description: 'Partner with us to create a landscape that reflects your brand\'s excellence and commitment to sustainability.',
      booking_stats: [
        { value: '50+', label: 'Corporate Clients' },
        { value: '1M+', label: 'Sq. Ft. Landscaped' },
      ],
      highlights: [{ text: 'Low-maintenance planting plans' }],
    }}
  />
);
