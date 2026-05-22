import type { PageId } from '../types/content';

export type CollectionSubField = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'checkbox';
  placeholder?: string;
};

export type EditorField =
  | {
      key: string;
      label: string;
      type: 'text' | 'textarea' | 'number';
      placeholder?: string;
      helperText?: string;
    }
  | {
      key: string;
      label: string;
      type: 'collection';
      helperText?: string;
      itemLabel: string;
      fields: CollectionSubField[];
    };

const text = (
  key: string,
  label: string,
  placeholder = '',
  helperText = ''
): EditorField => ({ key, label, type: 'text', placeholder, helperText });

const textarea = (
  key: string,
  label: string,
  placeholder = '',
  helperText = ''
): EditorField => ({ key, label, type: 'textarea', placeholder, helperText });

const collection = (
  key: string,
  label: string,
  itemLabel: string,
  fields: CollectionSubField[],
  helperText = ''
): EditorField => ({ key, label, type: 'collection', itemLabel, fields, helperText });

const serviceDetailFields = (
  heroTitle: string,
  heroDescription: string,
  highlightPlaceholder: string
): EditorField[] => [
  text('breadcrumb_label', 'Breadcrumb label', heroTitle),
  text('hero_title', 'Hero title', heroTitle),
  textarea('hero_description', 'Hero description', heroDescription),
  text('hero_cta_label', 'Hero CTA label', 'Book This Service'),
  text('intro_title', 'Intro section title', 'Section introduction'),
  textarea('intro_text_1', 'Intro paragraph 1', 'Explain the service scope and design approach.'),
  textarea('intro_text_2', 'Intro paragraph 2', 'Describe the experience and use-case in more depth.'),
  text('challenges_title', 'Challenges section title', 'Engineered for the site conditions'),
  textarea('challenges_text', 'Challenges section intro', 'Describe the design and technical constraints you solve for.'),
  collection('challenge_points', 'Challenge bullet points', 'Bullet point', [
    { key: 'text', label: 'Bullet text', type: 'text', placeholder: 'Weight-conscious planting systems and drainage.' },
  ]),
  text('features_title', 'Features section title', 'What is included'),
  textarea('features_description', 'Features section description', 'Summarize the inclusions and premium touches.'),
  collection('features', 'Feature cards', 'Feature', [
    { key: 'title', label: 'Title', type: 'text', placeholder: 'Custom planning' },
    { key: 'desc', label: 'Description', type: 'textarea', placeholder: 'Describe the feature and why it matters.' },
  ]),
  text('booking_title', 'Booking section title', 'Ready to begin?'),
  textarea('booking_description', 'Booking section description', 'Call to action text for the booking section.'),
  collection('booking_stats', 'Booking stat cards', 'Stat', [
    { key: 'value', label: 'Value', type: 'text', placeholder: '300+' },
    { key: 'label', label: 'Label', type: 'text', placeholder: 'Projects Delivered' },
  ]),
  collection('highlights', 'Highlights', 'Highlight', [
    { key: 'text', label: 'Highlight text', type: 'text', placeholder: highlightPlaceholder },
  ]),
];

export const pageFieldSets: Record<PageId, EditorField[]> = {
  global_navigation: [
    text('logoAlt', 'Logo alt text', 'MrGardenr logo'),
    text('ctaLabel', 'Primary CTA label', 'Book a Visit'),
    text('ctaPath', 'Primary CTA path', '/booking'),
    collection(
      'navItems',
      'Navigation items',
      'Nav item',
      [
        { key: 'name', label: 'Label', type: 'text', placeholder: 'Home' },
        { key: 'path', label: 'Path', type: 'text', placeholder: '/#home' },
      ],
      'Used by both desktop and mobile navigation.'
    ),
  ],
  global_footer: [
    text('copyrightText', 'Copyright text', '© 2026 MrGardenr.'),
    text('contactCtaLabel', 'Footer CTA label', 'Contact Us'),
    text('contactCtaPath', 'Footer CTA path', '/contact'),
    collection('footerLinks', 'Footer links', 'Footer link', [
      { key: 'label', label: 'Label', type: 'text', placeholder: 'Services' },
      { key: 'path', label: 'Path', type: 'text', placeholder: '/services' },
    ]),
    collection('socialLinks', 'Social links', 'Social link', [
      { key: 'platform', label: 'Platform', type: 'text', placeholder: 'Instagram' },
      { key: 'href', label: 'URL', type: 'text', placeholder: 'https://instagram.com/mrgardenr' },
    ]),
  ],
  homepage: [
    text('hero_top_text', 'Hero eyebrow', 'Premium Landscaping Services'),
    text('hero_main_text', 'Hero headline line 1', "Crafting Nature's"),
    text('hero_sub_text', 'Hero accent line', 'Masterpieces'),
    textarea('hero_description', 'Hero description', 'Transform your outdoor space...'),
    text('hero_primary_cta_label', 'Hero primary CTA label', 'Get a Free Quote'),
    text('hero_primary_cta_path', 'Hero primary CTA path', '/contact#book'),
    text('hero_secondary_cta_label', 'Hero secondary CTA label', 'View Gallery'),
    text('hero_secondary_cta_path', 'Hero secondary CTA path', '/gallery'),
    text('expertise_title', 'Expertise section title', 'Our Expertise'),
    textarea('expertise_description', 'Expertise section description', 'Comprehensive landscaping solutions...'),
    text('projects_title', 'Projects section title', 'Landscapes in Action'),
    textarea('projects_description', 'Projects section description', 'Selected transformations and recent work.'),
    text('testimonials_title', 'Testimonials section title', 'Client Stories'),
    textarea('testimonials_description', 'Testimonials section description', 'See what our clients have to say...'),
    text('about_title', 'Consultation title', 'Cultivate your perfect space.'),
    textarea('about_text', 'Consultation description', 'Ready to bring breathing room...'),
    collection('consultation_features', 'Consultation features', 'Feature', [
      { key: 'text', label: 'Feature text', type: 'text', placeholder: 'Personalized styling advice' },
    ]),
    collection('testimonials', 'Testimonials', 'Testimonial', [
      { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Their landscaping work was outstanding...' },
      { key: 'name', label: 'Client name', type: 'text', placeholder: 'Sarah Jenkins' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'The Oaks' },
      { key: 'avatar', label: 'Avatar URL', type: 'text', placeholder: '/images/avatar-1.webp' },
    ]),
  ],
  about: [
    text('hero_eyebrow', 'Hero eyebrow', 'Heritage of Excellence'),
    text('hero_title', 'Hero title', "We don't just transform. We orchestrate ecosystems."),
    textarea('hero_description', 'Hero description', 'Rooted in quality, we have been cultivating...'),
    collection('stats', 'Stats', 'Stat', [
      { key: 'value', label: 'Value', type: 'number', placeholder: '15' },
      { key: 'suffix', label: 'Suffix', type: 'text', placeholder: '+' },
      { key: 'label', label: 'Label', type: 'text', placeholder: 'Years Cultivating' },
    ]),
    text('philosophy_eyebrow', 'Philosophy eyebrow', 'Our Philosophy'),
    text('philosophy_title', 'Philosophy title', 'Bridging nature & architecture'),
    textarea('philosophy_text_1', 'Philosophy paragraph 1', 'From initial concept to final execution...'),
    textarea('philosophy_text_2', 'Philosophy paragraph 2', 'We believe every outdoor space holds untapped potential...'),
    text('established_label', 'Established label', 'Est. 2010'),
    text('values_eyebrow', 'Values eyebrow', 'What Drives Us'),
    text('values_title', 'Values title', 'Our Core Values'),
    textarea('values_description', 'Values description', 'These principles shape every design decision...'),
    collection('values', 'Values', 'Value', [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Organic Precision' },
      { key: 'desc', label: 'Description', type: 'textarea', placeholder: 'Every leaf, every stone...' },
    ]),
  ],
  services: [
    text('hero_eyebrow', 'Hero eyebrow', 'What We Do'),
    text('hero_title', 'Hero title', 'Our Services'),
    textarea('hero_description', 'Hero description', 'From full masterplans to meticulous maintenance...'),
    collection('services', 'Service cards', 'Service', [
      { key: 'id', label: 'Service id', type: 'text', placeholder: 'terrace-transformation' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Terrace Transformation' },
      { key: 'desc', label: 'Description', type: 'textarea', placeholder: 'Turn your underutilized rooftop...' },
      { key: 'image', label: 'Image URL', type: 'text', placeholder: '/images/service-terrace.webp' },
    ]),
  ],
  service_terrace_transformation: serviceDetailFields(
    'Terrace Transformation',
    'Sky-high sanctuaries tailored to your terrace.',
    'Custom drainage planning'
  ),
  service_balcony_makeover: serviceDetailFields(
    'Balcony Makeover',
    'Compact, lush outdoor retreats with high function.',
    'Vertical garden systems'
  ),
  service_penthouse_transformation: serviceDetailFields(
    'Penthouse Transformation',
    'Luxury exterior environments for elevated living.',
    'Wind-resilient planting schemes'
  ),
  service_office_landscaping: serviceDetailFields(
    'Office Landscaping',
    'Campus-scale green environments that support work and wellbeing.',
    'Low-maintenance planting plans'
  ),
  gallery: [
    text('hero_eyebrow', 'Hero eyebrow', 'Gallery'),
    text('hero_title', 'Hero title', 'Recent Transformations'),
    textarea('hero_description', 'Hero description', 'A glimpse into the lush, vibrant environments...'),
    collection('portfolioItems', 'Portfolio items', 'Portfolio item', [
      { key: 'id', label: 'Item id', type: 'text', placeholder: 'oasis-estate' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'The Oasis Estate' },
      { key: 'category', label: 'Category', type: 'text', placeholder: 'Complete redesign & installation' },
      { key: 'img', label: 'Image URL', type: 'text', placeholder: '/images/project-1.webp' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'A complete overhaul of a traditional property...' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'Paradise Valley' },
      { key: 'year', label: 'Year', type: 'text', placeholder: '2023' },
      { key: 'services', label: 'Services (comma separated)', type: 'textarea', placeholder: 'Garden Design, Hardscaping, Lawn Care' },
    ]),
  ],
  projects: [
    text('hero_title', 'Hero title', 'Our landscapes in action'),
    textarea('hero_description', 'Hero description', 'Explore our recently completed projects...'),
    collection('featuredProjects', 'Featured projects', 'Project', [
      { key: 'id', label: 'Project id', type: 'text', placeholder: 'hero-estates' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'HERO ESTATES' },
      { key: 'category', label: 'Category', type: 'text', placeholder: 'Commercial Landscaping' },
      { key: 'img', label: 'Image URL', type: 'text', placeholder: '/images/latest-hero-estates.webp' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'A sprawling estate requiring a sophisticated landscape strategy.' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'Hero City' },
      { key: 'year', label: 'Year', type: 'text', placeholder: '2023' },
      { key: 'services', label: 'Services (comma separated)', type: 'textarea', placeholder: 'Commercial Landscaping, Estate Design' },
    ]),
  ],
  contact: [
    text('headerTitle', 'Hero title', "Let's Cultivate Something Beautiful"),
    text('leadgen_title', 'Lead form title', 'Start Your Project Today'),
    textarea('leadgen_description', 'Lead form description', 'Ready to bring breathing room and lush vitality...'),
    collection('leadgen_features', 'Lead form features', 'Feature', [
      { key: 'text', label: 'Feature text', type: 'text', placeholder: 'Customized Design Plans' },
    ]),
    collection('locations', 'Locations', 'Location', [
      { key: 'id', label: 'Location id', type: 'text', placeholder: 'ahmedabad' },
      { key: 'city', label: 'City', type: 'text', placeholder: 'Ahmedabad' },
      { key: 'address', label: 'Address', type: 'textarea', placeholder: 'MrGardenr, Iskcon Cross Rd...' },
      { key: 'phone', label: 'Phone', type: 'text', placeholder: '+91-9761655546' },
      { key: 'email', label: 'Email', type: 'text', placeholder: 'hello@mrgardenr.in' },
      { key: 'hours', label: 'Working hours', type: 'text', placeholder: 'Mon - Sat: 10:00 AM - 7:00 PM' },
      { key: 'mapSrc', label: 'Google Maps embed URL', type: 'textarea', placeholder: 'https://www.google.com/maps/embed?...' },
      { key: 'directionsLink', label: 'Directions link', type: 'text', placeholder: 'https://maps.app.goo.gl/...' },
      { key: 'comingSoon', label: 'Coming soon', type: 'checkbox' },
    ]),
  ],
  booking: [
    text('hero_title', 'Hero title', 'Start Your Project Today'),
    textarea('hero_description', 'Hero description', 'Ready to bring breathing room and lush vitality...'),
    collection('features', 'Booking features', 'Feature', [
      { key: 'text', label: 'Feature text', type: 'text', placeholder: 'Professional Execution' },
    ]),
  ],
  privacy: [
    text('hero_title', 'Hero title', 'Privacy Policy'),
    textarea('intro', 'Intro text', 'Explain how MrGardenr collects and uses data.'),
    textarea('body', 'Body content', 'Full privacy policy content...'),
  ],
  terms: [
    text('hero_title', 'Hero title', 'Terms of Service'),
    textarea('intro', 'Intro text', 'Summarize the terms and conditions.'),
    textarea('body', 'Body content', 'Full terms of service content...'),
  ],
};
