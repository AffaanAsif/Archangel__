import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: '00 // Core' },
  { id: 'manifesto', label: '01 // Manifesto' },
  { id: 'scope', label: '02 // Scope' },
  { id: 'pipeline', label: '03 // Pipeline' },
  { id: 'capabilities', label: '04 // Capabilities' },
  { id: 'contact', label: '05 // Technology' },
  { id: 'section-6', label: '06 // Network' }
];

export const TabScrollNav = () => {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = section.id;
          }
        }
      }
      if (current) setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const targetY = el.offsetTop - 80;
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(targetY, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 mix-blend-difference pointer-events-auto">
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => scrollTo(sec.id)}
          className={`text-left font-mono text-[10px] uppercase tracking-widest transition-all duration-300 border-l-2 pl-3 py-1 ${
            activeId === sec.id
              ? 'text-white border-white'
              : 'text-white/30 border-transparent hover:text-white/60 hover:border-white/30'
          }`}
        >
          {sec.label}
        </button>
      ))}
    </div>
  );
};
