import React from 'react';
import { Helmet } from 'react-helmet-async';
import { splitParagraphs, useCmsContent } from '../lib/cms';

const defaultContent = { hero_title: 'Privacy Policy', intro: 'We value your privacy and are committed to protecting your personal data.', body: 'This is a placeholder page for the Privacy Policy.\n\nPlease update this page with your actual privacy policy content.' };

export const PrivacyPolicy = () => {
  const content = useCmsContent('privacy', defaultContent);
  const bodyParagraphs = splitParagraphs(content.body);
  return <div className="pt-32 pb-20 max-w-4xl mx-auto px-6"><Helmet><title>Privacy Policy</title><meta name="description" content="Read the MrGardenr Privacy Policy." /></Helmet><h1 className="text-4xl font-display font-bold mb-8 text-on-surface">{content.hero_title}</h1><div className="prose prose-lg dark:prose-invert"><p className="text-on-surface-variant mb-6">{content.intro}</p>{bodyParagraphs.map((paragraph, index) => <p key={index} className="text-on-surface-variant mb-6">{paragraph}</p>)}</div></div>;
};
