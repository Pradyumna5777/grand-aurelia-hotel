import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiCamera,
} from 'react-icons/fi';
import { gallery } from '../data/hotelData';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ---------- Bento size logic for visual rhythm ---------- */
const getBentoSpan = (index) => {
  const pattern = index % 8;
  if (pattern === 0) return 'lg:col-span-2 lg:row-span-2'; // hero square
  if (pattern === 3) return 'lg:col-span-2';               // wide
  if (pattern === 6) return 'sm:col-span-2';               // wide on tablet
  return '';
};

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Photos' },
    { key: 'rooms', label: 'Rooms & Suites' },
    { key: 'dining', label: 'Dining' },
    { key: 'wellness', label: 'Wellness' },
    { key: 'lobby', label: 'Lobby & Lounge' },
    { key: 'exterior', label: 'Exterior' },
  ];

  const filtered =
    filter === 'all' ? gallery : gallery.filter((g) => g.category === filter);

  const current = selectedIndex !== null ? filtered[selectedIndex] : null;

  /* ---------- Keyboard nav ---------- */
  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((i) => (i + 1) % filtered.length);
  }, [selectedIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [selectedIndex, filtered.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, goNext, goPrev]);

  /* Reset index when filter changes */
  useEffect(() => setSelectedIndex(null), [filter]);

  return (
    <div className="min-h-screen bg-ivory">
      {/* ==================== HERO ==================== */}
      <section className="relative pt-40 pb-28 sm:pt-48 sm:pb-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-secondary" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10 max-w-4xl mx-auto text-center text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
            <FiCamera className="text-primary w-3 h-3" />
            <span className="font-display text-[10px] tracking-[0.3em] font-medium">
              Moments at The Grand Aurelia
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-5 leading-[1.05]">
            Gallery
          </h1>

          <div className="divider-gold" />

          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            A glimpse into the world we've built for you.
          </p>
        </motion.div>
      </section>

      {/* ==================== FILTER BAR ==================== */}
      <section className="relative -mt-12 z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-4 shadow-[0_20px_60px_0_rgba(15,15,15,0.12)]">
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                      active
                        ? 'text-secondary'
                        : 'text-secondary/60 hover:text-secondary hover:bg-secondary/5'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="galleryPill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-dark shadow-lg shadow-primary/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== BENTO GRID ==================== */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Count line */}
          <motion.p
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center text-xs sm:text-sm text-secondary/50 mb-10 tracking-[0.15em] uppercase"
          >
            {filtered.length} {filtered.length === 1 ? 'photograph' : 'photographs'}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[240px]"
            >
              {filtered.map((item, i) => (
                <motion.button
                  key={item.id}
                  variants={fadeUp}
                  onClick={() => setSelectedIndex(i)}
                  className={`relative overflow-hidden rounded-2xl group text-left ${getBentoSpan(i)}`}
                >
                  {/* Image */}
                  <img
                    src={item.thumb}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1400ms] ease-out"
                  />

                  {/* Always-on subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-display text-[9px] tracking-[0.3em] text-primary mb-1">
                      {item.category.toUpperCase()}
                    </p>
                    <h3 className="font-serif text-base sm:text-lg text-white font-medium leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {item.caption}
                    </p>
                  </div>

                  {/* Expand icon on hover */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-dark flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                    <FiMaximize2 size={14} />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📷</div>
              <h3 className="font-serif text-2xl text-secondary mb-2">
                No photos yet
              </h3>
              <p className="text-secondary/60 mb-6">
                Try another category to see more.
              </p>
              <button onClick={() => setFilter('all')} className="btn-primary">
                <span>View All Photos</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ==================== LIGHTBOX ==================== */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top bar */}
            <div
              className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white/70 text-xs tracking-[0.2em] uppercase">
                {String(selectedIndex + 1).padStart(2, '0')}{' '}
                <span className="text-white/30 mx-1">/</span>{' '}
                {String(filtered.length).padStart(2, '0')}
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                aria-label="Close"
                className="w-11 h-11 rounded-full glass-dark flex items-center justify-center text-white hover:!bg-primary hover:text-secondary transition-all"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Main image + arrows */}
            <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 pb-4 overflow-hidden">
              {/* Prev */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:!bg-primary hover:text-secondary transition-all"
              >
                <FiChevronLeft size={22} />
              </button>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.src}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              {/* Next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:!bg-primary hover:text-secondary transition-all"
              >
                <FiChevronRight size={22} />
              </button>
            </div>

            {/* Caption bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="relative z-10 px-5 sm:px-8 pb-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-display text-[10px] tracking-[0.3em] text-primary mb-2">
                {current.category.toUpperCase()}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-1">
                {current.title}
              </h3>
              <p className="text-white/60 text-sm max-w-xl mx-auto">
                {current.caption}
              </p>

              {/* Thumbnail strip */}
              <div className="mt-5 flex justify-center gap-2 overflow-x-auto pb-1 max-w-3xl mx-auto">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(i);
                    }}
                    aria-label={`View ${item.title}`}
                    className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden transition-all duration-300 ${
                      i === selectedIndex
                        ? 'ring-2 ring-primary scale-105'
                        : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Keyboard hint (hidden on mobile) */}
              <p className="hidden sm:block text-white/30 text-[10px] tracking-[0.2em] uppercase mt-4">
                ← → to navigate · Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;