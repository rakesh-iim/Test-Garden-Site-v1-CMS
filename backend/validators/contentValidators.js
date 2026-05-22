const allowedPages = new Set([
  'homepage',
  'services',
  'contact',
  'about',
  'gallery',
  'projects',
  'booking',
  'privacy',
  'terms',
  'global_navigation',
  'global_footer',
  'service_terrace_transformation',
  'service_balcony_makeover',
  'service_penthouse_transformation',
  'service_office_landscaping',
]);

const isPlainObject = (value) => (
  value !== null && typeof value === 'object' && !Array.isArray(value)
);

const isString = (value) => typeof value === 'string';

const isOptionalString = (value) => value === undefined || isString(value);

const validateFields = (value, fields, label) => {
  const errors = [];

  if (!isPlainObject(value)) {
    return [`${label} must be an object`];
  }

  fields.requiredStrings.forEach((field) => {
    if (!isString(value[field])) errors.push(`${label}.${field} must be a string`);
  });

  fields.optionalStrings.forEach((field) => {
    if (!isOptionalString(value[field])) errors.push(`${label}.${field} must be a string`);
  });

  return errors;
};

const validateHomepage = (data) => {
  const errors = validateFields(data, {
    requiredStrings: [],
    optionalStrings: ['hero_top_text', 'hero_main_text', 'hero_sub_text', 'about_title', 'about_text'],
  }, 'homepage');

  if (data.testimonials !== undefined) {
    if (!Array.isArray(data.testimonials)) {
      errors.push('homepage.testimonials must be an array');
    } else {
      data.testimonials.forEach((item, index) => {
        errors.push(...validateFields(item, {
          requiredStrings: [],
          optionalStrings: ['quote', 'name', 'location', 'avatar'],
        }, `homepage.testimonials[${index}]`));
      });
    }
  }

  return errors;
};

const validateServices = (data) => {
  const errors = [];

  if (!isPlainObject(data)) return ['services payload must be an object'];
  if (!Array.isArray(data.services)) return ['services.services must be an array'];

  data.services.forEach((service, index) => {
    errors.push(...validateFields(service, {
      requiredStrings: ['id', 'title', 'desc', 'image'],
      optionalStrings: [],
    }, `services.services[${index}]`));
  });

  return errors;
};

const validateContact = (data) => {
  const errors = validateFields(data, {
    requiredStrings: [],
    optionalStrings: ['headerTitle'],
  }, 'contact');

  if (data.locations !== undefined) {
    if (!Array.isArray(data.locations)) {
      errors.push('contact.locations must be an array');
    } else {
      data.locations.forEach((location, index) => {
        errors.push(...validateFields(location, {
          requiredStrings: ['id', 'city'],
          optionalStrings: ['address', 'phone', 'email', 'hours', 'mapSrc', 'directionsLink'],
        }, `contact.locations[${index}]`));

        if (
          isPlainObject(location)
          && location.comingSoon !== undefined
          && typeof location.comingSoon !== 'boolean'
        ) {
          errors.push(`contact.locations[${index}].comingSoon must be a boolean`);
        }
      });
    }
  }

  return errors;
};

const validateGenericObjectPage = (data, label) => {
  if (!isPlainObject(data)) {
    return [`${label} payload must be an object`];
  }

  return [];
};

const validators = {
  homepage: validateHomepage,
  services: validateServices,
  contact: validateContact,
  about: (data) => validateGenericObjectPage(data, 'about'),
  gallery: (data) => validateGenericObjectPage(data, 'gallery'),
  projects: (data) => validateGenericObjectPage(data, 'projects'),
  booking: (data) => validateGenericObjectPage(data, 'booking'),
  privacy: (data) => validateGenericObjectPage(data, 'privacy'),
  terms: (data) => validateGenericObjectPage(data, 'terms'),
  global_navigation: (data) => validateGenericObjectPage(data, 'global_navigation'),
  global_footer: (data) => validateGenericObjectPage(data, 'global_footer'),
  service_terrace_transformation: (data) => validateGenericObjectPage(data, 'service_terrace_transformation'),
  service_balcony_makeover: (data) => validateGenericObjectPage(data, 'service_balcony_makeover'),
  service_penthouse_transformation: (data) => validateGenericObjectPage(data, 'service_penthouse_transformation'),
  service_office_landscaping: (data) => validateGenericObjectPage(data, 'service_office_landscaping'),
};

const validatePageContent = (pageId, data) => {
  const normalizedPageId = String(pageId || '').toLowerCase();

  if (!allowedPages.has(normalizedPageId)) {
    return [`Unsupported pageId "${pageId}"`];
  }

  return validators[normalizedPageId](data);
};

module.exports = {
  allowedPages,
  validatePageContent,
};
