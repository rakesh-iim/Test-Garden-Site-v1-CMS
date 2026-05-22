import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { FeaturedProject } from '../lib/cms';

export const LandscapesInAction = ({
  title = 'Our landscapes in action',
  description = 'Estates designed for scale, complexity, and growth. Each project reflects the expertise of landscape designers for outdoor environments, balancing form, function, and identity.',
  projects,
}: {
  title?: string;
  description?: string;
  projects: FeaturedProject[];
}) => {
  return (
    <section className="py-24 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{title}</h2>
        <p className="text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">{description}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {projects.slice(0, 4).map((project, index) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }} className={`relative group overflow-hidden bg-surface-container-low rounded-2xl h-[300px] md:h-[400px] ${project.colSpan || ''}`}>
            <Link to={`/projects/${project.id}`} className="absolute inset-0 z-20">
              <span className="sr-only">View {project.title}</span>
            </Link>
            <img src={project.img} alt={project.title} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white font-montserrat font-bold text-xl md:text-2xl tracking-wider">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/projects" className="relative overflow-hidden group bg-[#141414] text-white w-full sm:w-[500px] py-4 rounded-md font-medium text-center flex items-center justify-center shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-[1.03] hover:-translate-y-0.5">
          <span className="absolute inset-0 w-full h-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.5s] ease-[cubic-bezier(0.8,0,0.2,1)] z-0"></span>
          <span className="relative z-10 group-hover:text-[#141414] transition-colors duration-[0.5s] flex items-center gap-1">See all projects →</span>
        </Link>
      </div>
    </section>
  );
};
