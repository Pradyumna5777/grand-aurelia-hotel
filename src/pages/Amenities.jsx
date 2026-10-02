import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight,
  FiPhone,
  FiChevronDown,
  FiClock,
  FiSliders,
} from 'react-icons/fi';
import AmenityCard from '../components/AmenityCard';
import { amenities, hotelInfo } from '../data/hotelData';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const Amenities = () => {
  const [filter, setFilter] = useState('all');

  /* Signature / hero amenities — the ones marked featured */
  const signature = amenities.filter((a) => a.featured).slice(0, 2);
  const signatureIds = signature.map((a) => a.id);

  /* Grid amenities (excluding signature ones) */
  const gridAmenities = amenities.filter((a) => !signatureIds.includes(a.id));

  /* Filters */
  const filters = [
    { key: 'all', label: 'All Amenities' },
    { key: 'wellness', label: 'Wellness' },
    { key: 'dining', label: 'Dining' },
    { key: 'relax', label: 'Relaxation' },
    { key: 'service', label: 'Services' },
  ];

  const filteredGrid =
    filter === 'all'
      ? gridAmenities
      : gridAmenities.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-ivory">
      {/* ==================== HERO ==================== */}
      <section className="relative pt-40 pb-28 sm:pt-48 sm:pb-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80')",
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
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-display text-[10px] tracking-[0.3em] font-medium">
              Facilities & Experience
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-5 leading-[1.05]">
            Amenities
          </h1>

          <div className="divider-gold" />

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            From sunrise yoga to midnight cocktails, every experience at{' '}
            {hotelInfo.name} is designed to make your stay effortless and unforgettable.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== STAT RIBBON ==================== */}
      <section className="relative -mt-12 z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 shadow-[0_20px_60px_0_rgba(15,15,15,0.12)]">
            {[
              { value: '12+', label: 'Curated Amenities' },
              { value: '24/7', label: 'Concierge & Room Service' },
              { value: '5★', label: 'Forbes Rated Facility' },
              { value: '365', label: 'Days Open a Year' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-2xl sm:text-3xl font-medium bg-gradient-to-br from-primary-dark to-primary bg-clip-text text-transparent mb-1">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-xs text-secondary/60 tracking-[0.15em] uppercase font-medium leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== SIGNATURE AMENITIES (BENTO) ==================== */}
      <section className="py-20 sm:py-24 lg:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14 sm:mb-16"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              Signature Experiences
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Not To Be Missed
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.p variants={fadeUp} className="section-subtitle">
              Two experiences our guests return for, again and again.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {signature.map((a, i) => (
              <motion.div
                key={a.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-3xl h-[420px] sm:h-[480px]"
              >
                {/* Image */}
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1400ms] ease-out"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* Icon badge (top) */}
                <div className="absolute top-6 left-6 glass-dark rounded-2xl w-14 h-14 flex items-center justify-center text-2xl">
                  {a.icon}
                </div>

                {/* Signature label (top right) */}
                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-primary text-secondary text-[10px] font-semibold tracking-[0.2em] uppercase">
                  {i === 0 ? 'Most Loved' : 'Guest Favorite'}
                </div>

                {/* Content (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="font-display text-[10px] tracking-[0.3em] text-primary mb-2">
                    {a.category === 'wellness'
                      ? 'Wellness'
                      : a.category === 'dining'
                        ? 'Dining'
                        : a.category === 'relax'
                          ? 'Relaxation'
                          : 'Service'}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium mb-3">
                    {a.name}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base max-w-md leading-relaxed mb-4">
                    {a.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.15em] uppercase hover:gap-3 transition-all">
                    Explore <FiArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== ALL AMENITIES ==================== */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 bg-gradient-to-b from-stone-50 to-ivory">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              Everything Else
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              The Full Collection
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.p variants={fadeUp} className="section-subtitle">
              Filter by what matters most to you — from wellness to workspace.
            </motion.p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                    active
                      ? 'text-secondary'
                      : 'text-secondary/60 hover:text-secondary bg-white/60 backdrop-blur-md border border-white/60'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="amenityPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-dark shadow-lg shadow-primary/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{f.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredGrid.map((a) => (
                <motion.div key={a.id} variants={fadeUp}>
                  <AmenityCard amenity={a} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredGrid.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">✨</div>
              <h3 className="font-serif text-2xl text-secondary mb-2">
                Nothing here yet
              </h3>
              <p className="text-secondary/60 mb-6">
                Try another category to see more.
              </p>
              <button onClick={() => setFilter('all')} className="btn-primary">
                <span>View All</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ==================== CONCIERGE CTA ==================== */}
      <section className="px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-secondary/40" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-display text-[10px] tracking-[0.3em] text-primary mb-3">
                Personal Assistance
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-light mb-3">
                Let us plan your perfect day
              </h3>
              <p className="text-white/60 text-sm sm:text-base font-light max-w-lg">
                Our concierge team is available around the clock to arrange
                anything — from spa reservations to private city tours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${hotelInfo.phone}`}
                className="btn-glass whitespace-nowrap inline-flex items-center gap-2"
              >
                <FiPhone size={14} />
                <span>Call Concierge</span>
              </a>
              <button className="btn-primary whitespace-nowrap">
                <span>Book a Stay</span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Amenities;