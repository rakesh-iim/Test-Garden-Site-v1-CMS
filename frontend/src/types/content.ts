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

export type TextFeature = {
  text: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  location: string;
  avatar?: string;
};

export type ServiceCardContent = {
  id: string;
  title: string;
  desc: string;
  image?: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
  location: string;
  year: string;
  services: string;
};

export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
  location: string;
  year: string;
  services: string;
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
  services: ServiceCardContent[];
};

export type GalleryContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  portfolioItems: PortfolioItem[];
};

export type ProjectsContent = {
  hero_title: string;
  hero_description: string;
  featuredProjects: FeaturedProject[];
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

export type PageContentMap = {
  global_navigation: GlobalNavigationContent;
  global_footer: GlobalFooterContent;
  homepage: HomepageContent;
  about: AboutContent;
  services: ServicesContent;
  service_terrace_transformation: ServiceDetailContent;
  service_balcony_makeover: ServiceDetailContent;
  service_penthouse_transformation: ServiceDetailContent;
  service_office_landscaping: ServiceDetailContent;
  gallery: GalleryContent;
  projects: ProjectsContent;
  contact: ContactContent;
  booking: BookingContent;
  privacy: LegalContent;
  terms: LegalContent;
};

export type PageId = keyof PageContentMap;
