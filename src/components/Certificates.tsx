import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BadgeCheck, ZoomIn } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const CERTS = [
  { title: 'Intro to Cybersecurity',           issuer: 'Cyberium Arena · 2025',          img: `${BASE}certs/intro-to-cyber.png`,        color: 'text-cyan-400',    border: 'border-cyan-500/30',    glow: 'hover:shadow-[0_12px_40px_hsl(185_100%_52%/0.15)]' },
  { title: 'Penetration Testing',              issuer: 'Cyberium Arena · 2025',          img: `${BASE}certs/penetration-testing.png`,   color: 'text-rose-400',    border: 'border-rose-500/30',    glow: 'hover:shadow-[0_12px_40px_rgba(251,113,133,0.15)]' },
  { title: 'Network Research',                 issuer: 'Cyberium Arena · 2025',          img: `${BASE}certs/network-research.png`,      color: 'text-violet-400',  border: 'border-violet-500/30',  glow: 'hover:shadow-[0_12px_40px_rgba(167,139,250,0.15)]' },
  { title: 'Python Fundamentals',              issuer: 'Cyberium Arena · 2025',          img: `${BASE}certs/python-fundamentals.png`,   color: 'text-amber-400',   border: 'border-amber-500/30',   glow: 'hover:shadow-[0_12px_40px_rgba(251,191,36,0.15)]'  },
  { title: 'Linux Fundamentals',               issuer: 'Cyberium Arena · 2025',          img: `${BASE}certs/linux-fundamentals.png`,    color: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'hover:shadow-[0_12px_40px_rgba(52,211,153,0.15)]'  },
  { title: 'SAP Analytics Cloud & Build Apps', issuer: 'ASEAN Data Science Explorers · 2024', img: `${BASE}certs/sap-analytics.png`,   color: 'text-blue-400',    border: 'border-blue-500/30',    glow: 'hover:shadow-[0_12px_40px_rgba(96,165,250,0.15)]'  },
  { title: 'Data Science Camp',                issuer: 'UNESCO UNITWIN · 2023',          img: `${BASE}certs/data-science-camp.jpg`,    color: 'text-primary',     border: 'border-primary/30',     glow: 'hover:shadow-[0_12px_40px_hsl(var(--primary)/0.15)]'},
];

const Certificates = () => {
  const [active, setActive] = useState<typeof CERTS[0] | null>(null);

  return (
    <section className="py-24 relative" id="certificates">
      <div className="container mx-auto px-4 sm:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gradient inline-block mb-3">
            Certifications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Issued by <span className="text-foreground font-medium">Cyberium Arena</span> — click any certificate to view it full size.
          </p>
        </motion.div>

        {/* Certificate image cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTS.map((cert, i) => (
            <motion.button
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              onClick={() => setActive(cert)}
              className={[
                'group relative text-left rounded-2xl overflow-hidden',
                'border bg-card/40 backdrop-blur-sm',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-1.5',
                cert.border,
                cert.glow,
              ].join(' ')}
            >
              {/* Certificate image */}
              <div className="relative overflow-hidden bg-white">
                <img
                  src={cert.img}
                  alt={cert.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-4 flex items-center gap-3 border-t border-border/40">
                <BadgeCheck className={`w-4 h-4 flex-shrink-0 ${cert.color}`} />
                <div className="min-w-0">
                  <p className="font-heading font-bold text-sm text-foreground truncate">{cert.title}</p>
                  <p className={`text-xs ${cert.color}`}>{cert.issuer}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              {/* Close button */}
              <button
                onClick={() => setActive(null)}
                className="absolute -top-10 right-0 flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" /> Close
              </button>

              {/* Certificate image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={active.img}
                  alt={active.title}
                  className="w-full h-auto block"
                />
              </div>

              {/* Label */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="font-heading font-bold text-white text-sm">{active.title}</span>
                <span className="text-white/50 text-xs">· {active.issuer}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
