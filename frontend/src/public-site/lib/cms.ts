import { useEffect, useState } from 'react';
import { LATEST_PROJECTS, PORTFOLIO_ITEMS } from '../constants';

const DEFAULT_CMS_ORIGIN = 'http://127.0.0.1:5000';

const normalizeCmsBaseUrl = (value?: string) => {
  const raw = String(value || DEFAULT_CMS_ORIGIN).trim().replace(/\/$/, '');

  if (raw.endsWith('/api/public')) return raw;
  if (raw.endsWith('/api')) return `${raw}/public`;

  return `${raw}/api/public`;
};

export const CMS_API_URL = normalizeCmsBaseUrl(import.meta.env.VITE_CMS_API_URL);

type CmsEnvelope<T> = {
  status?: string;
  data?: T;
};

export type NavItem = {
  name: string;
  path: string;
};

export type FooterLink = {
  label: string;
  path: string;
};

export type SocialLink = {
  platform: string;
  href: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  location: string;
  avatar?: string;
};

export type TextFeature = {
  text: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
  location: string;
  year: string;
  services: string[];
};

export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
  location: string;
  year: string;
  services: string[];
  colSpan?: string;
};

export type ServiceCardContent = {
  id: string;
  title: string;
  desc: string;
  image?: string;
};

export type AboutStat = {
  value: number;
  suffix: string;
  label: string;
};

export type AboutValue = {
  title: string;
  desc: string;
};

export type LocationItem = {
  id: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  mapSrc?: string;
  directionsLink?: string;
  comingSoon?: boolean;
};

export type BookingStat = {
  value: string;
  label: string;
};

export type ServiceDetailFeature = {
  title: string;
  desc: string;
};

export type GlobalNavigationContent = {
  logoAlt: string;
  ctaLabel: string;
  ctaPath: string;
  navItems: NavItem[];
};

export type GlobalFooterContent = {
  copyrightText: string;
  contactCtaLabel: string;
  contactCtaPath: string;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
};

export type HomepageContent = {
  hero_top_text: string;
  hero_main_text: string;
  hero_sub_text: string;
  hero_description: string;
  hero_primary_cta_label: string;
  hero_primary_cta_path: string;
  hero_secondary_cta_label: string;
  hero_secondary_cta_path: string;
  expertise_title: string;
  expertise_description: string;
  projects_title: string;
  projects_description: string;
  testimonials_title: string;
  testimonials_description: string;
  about_title: string;
  about_text: string;
  consultation_features: TextFeature[];
  testimonials: TestimonialItem[];
};

export type AboutContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  stats: AboutStat[];
  philosophy_eyebrow: string;
  philosophy_title: string;
  philosophy_text_1: string;
  philosophy_text_2: string;
  established_label: string;
  values_eyebrow: string;
  values_title: string;
  values_description: string;
  values: AboutValue[];
};

export type ServicesContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  services: Array<Partial<ServiceCardContent>>;
};

export type GalleryContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  portfolioItems: Array<Partial<PortfolioItem> & { services?: unknown }>;
};

export type ProjectsContent = {
  hero_title: string;
  hero_description: string;
  featuredProjects: Array<Partial<FeaturedProject> & { services?: unknown }>;
};

export type ContactContent = {
  headerTitle: string;
  leadgen_title: string;
  leadgen_description: string;
  leadgen_features: TextFeature[];
  locations: LocationItem[];
};

export type BookingContent = {
  hero_title: string;
  hero_description: string;
  features: TextFeature[];
};

export type LegalContent = {
  hero_title: string;
  intro: string;
  body: string;
};

export type ServiceDetailContent = {
  breadcrumb_label: string;
  hero_title: string;
  hero_description: string;
  hero_cta_label: string;
  intro_title: string;
  intro_text_1: string;
  intro_text_2: string;
  challenges_title: string;
  challenges_text: string;
  challenge_points: TextFeature[];
  features_title: string;
  features_description: string;
  features: ServiceDetailFeature[];
  booking_title: string;
  booking_description: string;
  booking_stats: BookingStat[];
  highlights: TextFeature[];
};

const endpointFor = (pageId: string) => `${CMS_API_URL}/content/${pageId}`;

export const fetchCmsContent = async <T,>(pageId: string): Promise<T | null> => {
  try {
    const response = await fetch(endpointFor(pageId));
    if (!response.ok) {
      throw new Error(`CMS request failed with ${response.status}`);
    }

    const json = (await response.json()) as CmsEnvelope<T>;
    if (json.status === 'success' && json.data !== undefined) {
      return json.data;
    }
  } catch (error) {
    console.error(`Error fetching CMS content for ${pageId}:`, error);
  }

  return null;
};

export const useCmsContent = <T,>(pageId: string, fallback: T) => {
  const [content, setContent] = useState<T>(fallback);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const cmsContent = await fetchCmsContent<T>(pageId);
      if (active && cmsContent) {
        setContent((previous) => ({ ...previous, ...cmsContent }));
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [pageId]);

  return content;
};

export const splitLines = (value?: string) =>
  String(value || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

export const splitParagraphs = (value?: string) =>
  String(value || '')
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const parseServices = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return [];
};

export const mergeServices = <T extends { id: string; title: string; desc: string; image?: string }>(
  defaults: T[],
  cmsItems?: Array<Partial<Pick<T, 'id' | 'title' | 'desc' | 'image'>>>
) => {
  if (!Array.isArray(cmsItems) || cmsItems.length === 0) return defaults;

  return defaults.map((item) => {
    const cmsItem = cmsItems.find((candidate) => candidate.id === item.id);
    return cmsItem ? { ...item, ...cmsItem } : item;
  });
};

export const mergePortfolioItems = (cmsItems?: GalleryContent['portfolioItems']): PortfolioItem[] => {
  if (!Array.isArray(cmsItems) || cmsItems.length === 0) {
    return PORTFOLIO_ITEMS;
  }

  const fallbackMap = new Map(PORTFOLIO_ITEMS.map((item) => [item.id, item]));

  return cmsItems.map((cmsItem, index) => {
    const fallback = cmsItem.id ? fallbackMap.get(cmsItem.id) : undefined;

    return {
      id: String(cmsItem.id || fallback?.id || `gallery-item-${index}`),
      title: String(cmsItem.title || fallback?.title || ''),
      category: String(cmsItem.category || fallback?.category || ''),
      img: String(cmsItem.img || fallback?.img || ''),
      description: String(cmsItem.description || fallback?.description || ''),
      location: String(cmsItem.location || fallback?.location || ''),
      year: String(cmsItem.year || fallback?.year || ''),
      services: parseServices(cmsItem.services).length > 0 ? parseServices(cmsItem.services) : (fallback?.services || []),
    };
  });
};

export const mergeFeaturedProjects = (cmsItems?: ProjectsContent['featuredProjects']): FeaturedProject[] => {
  if (!Array.isArray(cmsItems) || cmsItems.length === 0) {
    return LATEST_PROJECTS;
  }

  const fallbackMap = new Map(LATEST_PROJECTS.map((item) => [item.id, item]));

  return cmsItems.map((cmsItem, index) => {
    const fallback = cmsItem.id ? fallbackMap.get(cmsItem.id) : undefined;

    return {
      id: String(cmsItem.id || fallback?.id || `project-${index}`),
      title: String(cmsItem.title || fallback?.title || ''),
      category: String(cmsItem.category || fallback?.category || ''),
      img: String(cmsItem.img || fallback?.img || ''),
      description: String(cmsItem.description || fallback?.description || ''),
      location: String(cmsItem.location || fallback?.location || ''),
      year: String(cmsItem.year || fallback?.year || ''),
      services: parseServices(cmsItem.services).length > 0 ? parseServices(cmsItem.services) : (fallback?.services || []),
      colSpan: fallback?.colSpan,
    };
  });
};

export const mergeCollection = <TInput, TOutput>(
  fallback: TOutput[],
  cmsItems: unknown,
  mapItem: (item: TInput, index: number) => TOutput
): TOutput[] => {
  if (!Array.isArray(cmsItems) || cmsItems.length === 0) return fallback;
  return (cmsItems as TInput[]).map(mapItem);
};
