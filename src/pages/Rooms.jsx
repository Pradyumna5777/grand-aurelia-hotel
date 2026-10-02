import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiSliders } from 'react-icons/fi';
import RoomCard from '../components/RoomCard';
import { rooms } from '../data/hotelData';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const Rooms = () => {
  const [filter, setFilter] = useState('all');

  // Indian rupee price buckets (realistic 5-star hotel rates)
  const filters = [
    { key: 'all', label: 'All Rooms', hint: 'Every suite' },
    { key: 'low', label: 'Under ₹15,000', hint: 'Smart luxury' },
    { key: 'mid', label: '₹15K – ₹30K', hint: 'Signature stays' },
    { key: 'high', label: '₹30,000+', hint: 'Ultra premium' },
  ];

  const filtered = rooms.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'low') return r.price < 15000;
    if (filter === 'mid') return r.price >= 15000 && r.price <= 30000;
    if (filter === 'high') return r.price > 30000;
    return true;
  });

  return (
    <div className="min-h-screen bg-ivory">
      {/* ==================== HERO HEADER ==================== */}
      <section className="relative pt-40 pb-28 sm:pt-48 sm:pb-32 px-4 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=80')",
          }}
        />
        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-secondary" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10 max-w-4xl mx-auto text-center text-white"
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-display text-[10px] tracking-[0.3em] font-medium">
              Accommodations
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-5 leading-[1.05]">
            Rooms & Suites
          </h1>

          <div className="divider-gold" />

          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Each space is thoughtfully designed with warm textures, natural light, and quiet
            luxury — a private retreat in the heart of the city.
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
          <div className="glass-card rounded-2xl p-4 sm:p-5 shadow-[0_20px_60px_0_rgba(15,15,15,0.12)]">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Icon + label */}
              <div className="hidden sm:flex items-center gap-2 pl-2 pr-4 border-r border-secondary/10">
                <FiSliders className="text-primary" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary/60">
                  Filter
                </span>
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap justify-center gap-2 flex-1">
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
                          layoutId="filterPill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-dark shadow-lg shadow-primary/30"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 whitespace-nowrap">{f.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Live count */}
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-secondary/10">
                <span className="font-serif text-2xl text-primary font-medium">
                  {filtered.length.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-secondary/50 leading-tight">
                  Rooms<br />Available
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== ROOMS GRID ==================== */}
      <section className="py-16 sm:py-20 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile result count */}
          <div className="md:hidden text-center mb-8">
            <p className="text-sm text-secondary/60">
              Showing{' '}
              <span className="font-semibold text-primary">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'room' : 'rooms'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filtered.map((room) => (
                <motion.div key={room.id} variants={fadeUp}>
                  <RoomCard room={room} />
                </motion.div>
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
              <div className="text-6xl mb-4">🛏️</div>
              <h3 className="font-serif text-2xl text-secondary mb-2">
                No rooms in this range
              </h3>
              <p className="text-secondary/60 mb-6">
                Try adjusting your filter to see more options.
              </p>
              <button onClick={() => setFilter('all')} className="btn-primary">
                <span>View All Rooms</span>
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
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/40" />

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-display text-[10px] tracking-[0.3em] text-primary mb-3">
                Need Help Choosing?
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-light mb-2">
                Let our concierge assist you
              </h3>
              <p className="text-white/60 text-sm sm:text-base font-light">
                Personalized recommendations for your perfect stay.
              </p>
            </div>
            <button className="btn-glass whitespace-nowrap">
              <span>Contact Concierge</span>
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Rooms;