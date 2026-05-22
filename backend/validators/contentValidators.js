const allowedPages = new Set([
  'homepage',
  'homepage_process',
  'homepage_clients',
  'services',
  'contact',
  'about',
  'gallery',
  'projects',
  'booking',
  'floating_contact',
  'privacy',
  'terms',
  'global_navigation',
  'global_footer',
  'service_terrace_transformation',
  'service_balcony_makeover',
  'service_penthouse_transformation',
  'service_office_landscaping',
  'service_testimonials',
]);

const isPlainObject = (value) => (
  value !== null && typeof value === 'object' && !Array.isArray(value)
);

const isString = (value) => typeof value === 'string';

const isOptionalString = (value) => value === undefined || isString(value);
const isOptionalArray = (value) => value === undefined || Array.isArray(value);

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
    optionalStrings: [
      'hero_top_text',
      'hero_main_text',
      'hero_sub_text',
      'hero_description',
      'hero_primary_cta_label',
      'hero_primary_cta_path',
      'hero_secondary_cta_label',
      'hero_secondary_cta_path',
      'expertise_title',
      'expertise_description',
      'projects_title',
      'projects_description',
      'projects_cta_label',
      'testimonials_title',
      'testimonials_description',
      'about_title',
      'about_text',
      'consultation_quote',
      'consultation_quote_author',
    ],
  }, 'homepage');

  if (!isOptionalArray(data.consultation_features)) {
    errors.push('homepage.consultation_features must be an array');
  } else if (Array.isArray(data.consultation_features)) {
    data.consultation_features.forEach((item, index) => {
      errors.push(...validateFields(item, {
        requiredStrings: [],
        optionalStrings: ['text'],
      }, `homepage.consultation_features[${index}]`));
    });
  }

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
  const errors = validateFields(data, {
    requiredStrings: [],
    optionalStrings: ['hero_eyebrow', 'hero_title', 'hero_description'],
  }, 'services');

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

const validateBooking = (data) => {
  const errors = validateFields(data, {
    requiredStrings: [],
    optionalStrings: [
      'hero_title',
      'hero_description',
      'form_title',
      'service_label',
      'price',
      'original_price',
      'discount_badge',
      'summary_description',
      'success_title',
      'success_message',
    ],
  }, 'booking');

  ['features', 'cities', 'property_types', 'time_slots'].forEach((key) => {
    if (!isOptionalArray(data[key])) {
      errors.push(`booking.${key} must be an array`);
      return;
    }

    if (Array.isArray(data[key])) {
      data[key].forEach((item, index) => {
        errors.push(...validateFields(item, {
          requiredStrings: [],
          optionalStrings: key === 'features' ? ['text'] : ['label'],
        }, `booking.${key}[${index}]`));
      });
    }
  });

  return errors;
};

const validateContact = (data) => {
  const errors = validateFields(data, {
    requiredStrings: [],
    optionalStrings: [
      'headerTitle',
      'leadgen_title',
      'leadgen_description',
      'locations_eyebrow',
      'locations_title',
      'locations_description',
    ],
  }, 'contact');

  if (!isOptionalArray(data.leadgen_features)) {
    errors.push('contact.leadgen_features must be an array');
  } else if (Array.isArray(data.leadgen_features)) {
    data.leadgen_features.forEach((item, index) => {
      errors.push(...validateFields(item, {
        requiredStrings: [],
        optionalStrings: ['text'],
      }, `contact.leadgen_features[${index}]`));
    });
  }

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
  homepage_process: (data) => validateGenericObjectPage(data, 'homepage_process'),
  homepage_clients: (data) => validateGenericObjectPage(data, 'homepage_clients'),
  services: validateServices,
  contact: validateContact,
  about: (data) => validateGenericObjectPage(data, 'about'),
  gallery: (data) => validateGenericObjectPage(data, 'gallery'),
  projects: (data) => validateGenericObjectPage(data, 'projects'),
  booking: validateBooking,
  floating_contact: (data) => validateGenericObjectPage(data, 'floating_contact'),
  privacy: (data) => validateGenericObjectPage(data, 'privacy'),
  terms: (data) => validateGenericObjectPage(data, 'terms'),
  global_navigation: (data) => validateGenericObjectPage(data, 'global_navigation'),
  global_footer: (data) => validateGenericObjectPage(data, 'global_footer'),
  service_terrace_transformation: (data) => validateGenericObjectPage(data, 'service_terrace_transformation'),
  service_balcony_makeover: (data) => validateGenericObjectPage(data, 'service_balcony_makeover'),
  service_penthouse_transformation: (data) => validateGenericObjectPage(data, 'service_penthouse_transformation'),
  service_office_landscaping: (data) => validateGenericObjectPage(data, 'service_office_landscaping'),
  service_testimonials: (data) => validateGenericObjectPage(data, 'service_testimonials'),
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
