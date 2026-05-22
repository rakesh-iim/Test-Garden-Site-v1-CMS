import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { type ProjectsContent, mergeFeaturedProjects, useCmsContent } from '../lib/cms';

const defaultContent: ProjectsContent = { hero_title: 'Our landscapes in action', hero_description: 'Explore our recently completed projects showcasing our expertise in transforming outdoor and commercial spaces into vibrant, high-energy sanctuaries.', featuredProjects: [] };

export const Projects = () => {
  const content = useCmsContent<ProjectsContent>('projects', defaultContent);
  const projects = useMemo(() => mergeFeaturedProjects(content.featuredProjects), [content.featuredProjects]);
  return <div className="pt-24 pb-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24"><Helmet><title>Our Projects</title><meta name="description" content="Explore our featured landscaping projects." /></Helmet><div className="mb-12"><Link to="/" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-8 hover:text-primary-container transition-colors"><ArrowLeft size={18} />Back to Home</Link><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl"><h1 className="text-5xl font-display font-bold mb-6">{content.hero_title}</h1><p className="text-xl text-on-surface-variant">{content.hero_description}</p></motion.div></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map((project, index) => <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }} className={`relative group overflow-hidden bg-surface-container-low rounded-xl h-[400px] ${project.colSpan || ''}`}><Link to={`/projects/${project.id}`} className="absolute inset-0 z-20"><span className="sr-only">View {project.title}</span></Link><img src={project.img} alt={project.title} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end"><p className="text-white/80 font-medium text-sm tracking-wider uppercase mb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">{project.category}</p><h3 className="text-white font-montserrat font-bold text-2xl md:text-3xl tracking-wide opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">{project.title}</h3></div></motion.div>)}</div></div>;
};

