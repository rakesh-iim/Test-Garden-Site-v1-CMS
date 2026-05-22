import React from 'react';

const clients = [
  {
    name: 'KAYA',
    node: (
      <div className="flex items-center">
        <span className="font-black text-2xl md:text-3xl tracking-tighter text-slate-800">KAYA</span>
      </div>
    )
  },
  {
    name: 'BluSmart',
    node: (
      <div className="flex items-center gap-1 text-blue-700">
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
        <span className="font-bold text-xl md:text-2xl tracking-tight">BluSmart</span>
      </div>
    )
  },
  {
    name: 'Amway',
    node: (
      <div className="flex flex-col items-center">
        <span className="font-bold italic text-2xl md:text-3xl text-[#002f6c] leading-none mb-1">Amway</span>
        <div className="w-full h-1 bg-gradient-to-r from-red-500 to-blue-800 rounded-full"></div>
      </div>
    )
  },
  {
    name: 'MEDCELL',
    node: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-bold text-xl md:text-2xl tracking-[0.2em] text-[#2c3e50] leading-none">MEDCELL</span>
        <span className="text-[0.5rem] md:text-[0.6rem] tracking-[0.3em] font-medium uppercase text-slate-500 mt-1">THE NETHERLANDS</span>
      </div>
    )
  },
  {
    name: 'IHG',
    node: (
      <div className="flex items-center gap-2 text-slate-900">
        <span className="font-serif font-medium text-3xl md:text-4xl leading-none">IHG</span>
        <div className="flex flex-col font-sans text-[0.4rem] md:text-[0.5rem] leading-[1.1] tracking-[0.2em] font-medium uppercase mt-1">
          <span>Hotels &</span>
          <span>Resorts</span>
        </div>
      </div>
    )
  },
  {
    name: 'Hero',
    node: (
      <div className="flex items-center gap-1 text-[#e31837]">
        <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4z"/></svg>
        <span className="font-black text-2xl md:text-4xl tracking-tighter italic">Hero</span>
      </div>
    )
  }
];

export const ClientMarquee = () => {
  return (
    <section className="pt-20 pb-16 bg-transparent overflow-hidden relative z-10">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 mb-12">
        <h3 className="text-center text-2xl md:text-3xl font-display font-medium text-on-surface-variant tracking-wide">
          Designed for workplaces of every scale
        </h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-container-low to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface-container-low to-transparent z-10 pointer-events-none"></div>
        
        <div
          className="flex whitespace-nowrap items-center py-4 animate-marquee group-hover:[animation-play-state:paused]"
        >
          {/* Double the array for seamless scrolling */}
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={`${client.name}-${index}`} 
              className="px-12 md:px-20 transition-transform duration-300 hover:scale-105"
            >
              {client.node}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
