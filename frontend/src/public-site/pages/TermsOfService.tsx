import React from 'react';
import { Helmet } from 'react-helmet-async';
import { splitParagraphs, useCmsContent } from '../lib/cms';

const defaultContent = { hero_title: 'Terms of Service', intro: 'By accessing and using our website, you accept and agree to be bound by these terms.', body: 'This is a placeholder page for the Terms of Service.\n\nPlease update this page with your actual terms and conditions.' };

export const TermsOfService = () => {
  const content = useCmsContent('terms', defaultContent);
  const bodyParagraphs = splitParagraphs(content.body);
  return <div className="pt-32 pb-20 max-w-4xl mx-auto px-6"><Helmet><title>Terms of Service</title><meta name="description" content="Review the Terms of Service for MrGardenr." /></Helmet><h1 className="text-4xl font-display font-bold mb-8 text-on-surface">{content.hero_title}</h1><div className="prose prose-lg dark:prose-invert"><p className="text-on-surface-variant mb-6">{content.intro}</p>{bodyParagraphs.map((paragraph, index) => <p key={index} className="text-on-surface-variant mb-6">{paragraph}</p>)}</div></div>;
};
