import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import {
  FiArrowRight,
  FiStar,
  FiAward,
  FiChevronDown,
  FiPlay,
} from 'react-icons/fi';
import BookingForm from '../components/BookingForm';
import RoomCard from '../components/RoomCard';
import AmenityCard from '../components/AmenityCard';
import TestimonialCard from '../components/TestimonialCard';
import { rooms, amenities, testimonials, hotelInfo } from '../data/hotelData';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ---------- Animated counter ---------- */
const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.floor(v).toString()),
    });
    return controls.stop;
  }, [inView, value, count]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

/* ---------- Marquee strip (India-contextual) ---------- */
const Marquee = () => {
  const items = [
    'Welcome to The Grand Aurelia',
    'Udaipur · Rajasthan · Since 1925',
    'Rated 4.9 by 2,847 Guests',
    'Condé Nast India Gold List',
    'Forbes India Five Star',
    'Complimentary Airport Transfer from Udaipur',
    'Overlooking Lake Pichola',
  ];
  return (
    <div className="relative py-6 sm:py-8 bg-secondary border-y border-primary/20 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marquee_45s_linear_infinite]">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="font-display text-xs sm:text-sm tracking-[0.3em] uppercase text-stone-100/60">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const Home = () => {
  /* ---------- Hero slideshow ---------- */
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = hotelInfo.heroImages;

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((p) => (p + 1) % heroImages.length),
      5500
    );
    return () => clearInterval(timer);
  }, [heroImages.length]);

  /* ---------- Parallax ---------- */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ---------- Page scroll progress ---------- */
  const { scrollYProgress: pageProgress } = useScroll();
  const progressWidth = useTransform(pageProgress, [0, 1], ['0%', '100%']);

  /* ---------- Featured room for hero card ---------- */
  const featuredRoom = rooms.find((r) => r.featured) || rooms[0];

  const stats = [
    { value: 98, suffix: '+', label: 'Years of Excellence' },
    { value: 50, suffix: 'K+', label: 'Happy Guests' },
    { value: 4.9, suffix: '', label: 'Guest Rating', isDecimal: true },
    { value: 120, suffix: '+', label: 'Countries Served' },
  ];

  return (
    <div className="overflow-x-hidden bg-ivory">
      {/* ============ SCROLL PROGRESS BAR ============ */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-primary-light via-primary to-primary-dark z-[60] origin-left"
      />

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[680px] flex items-center overflow-hidden"
      >
        {/* Slideshow */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-20 -bottom-20">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImages[currentSlide]}')` }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-black/40" />

        {/* Floating gold particles */}
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60 blur-[1px]"
            style={{
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 4) * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Content — split layout on large screens */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center"
        >
          {/* LEFT: headline */}
          <div className="text-white text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-dark mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
                Udaipur · Est. 1925 · Five Star
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light mb-6 leading-[1] tracking-tight"
            >
              Where Time
              <br />
              <span className="text-primary">Slows Down.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="text-base sm:text-lg md:text-xl mb-10 font-light max-w-xl mx-auto lg:mx-0 text-white/80 leading-relaxed"
            >
              {hotelInfo.tagline} — on the banks of Lake Pichola.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/booking" className="btn-primary w-full sm:w-auto">
                <span>Book Your Stay</span>
              </Link>
              <Link to="/rooms" className="btn-glass w-full sm:w-auto">
                <span>Explore Rooms</span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: floating room preview card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl" />

              <div className="relative glass-dark rounded-3xl overflow-hidden p-3">
                <div className="relative h-72 rounded-2xl overflow-hidden">
                  <img
                    src={featuredRoom.image}
                    alt={featuredRoom.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3 glass-dark rounded-full px-3 py-1.5 text-primary text-xs font-serif font-semibold">
                    From ₹{featuredRoom.price.toLocaleString('en-IN')}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display text-[9px] tracking-[0.3em] text-primary mb-1">
                      Featured Suite
                    </p>
                    <h3 className="font-serif text-2xl text-white font-medium">
                      {featuredRoom.name}
                    </h3>
                  </div>
                </div>

                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="text-white/70 text-xs">
                    <span>{featuredRoom.size}</span>
                    <span className="mx-2">·</span>
                    <span>{featuredRoom.capacity} guests</span>
                  </div>
                  <Link
                    to={`/rooms/${featuredRoom.id}`}
                    className="text-primary text-xs font-medium tracking-wider uppercase inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    View <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`transition-all duration-500 rounded-full ${
                i === currentSlide
                  ? 'w-10 h-2 bg-primary'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee />

      {/* ============ BOOKING WIDGET ============ */}
      <section className="relative -mt-12 z-30 px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="max-w-6xl mx-auto"
        >
          <BookingForm />
        </motion.div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-16 sm:py-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto glass-card rounded-3xl p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium bg-gradient-to-br from-primary-dark to-primary bg-clip-text text-transparent mb-2">
                {s.isDecimal ? (
                  <span>4.9</span>
                ) : (
                  <Counter value={s.value} suffix={s.suffix} />
                )}
              </div>
              <div className="text-[10px] sm:text-xs text-secondary/60 tracking-[0.2em] uppercase font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============ AWARDS (India) ============ */}
      <section className="py-10 sm:py-12 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16"
        >
          {[
            { icon: FiAward, label: 'Condé Nast India', sub: 'Gold List 2024' },
            { icon: FiStar, label: 'Forbes India', sub: 'Five Star' },
            { icon: FiAward, label: 'T+L India', sub: 'Top 50 Hotels' },
            { icon: FiStar, label: 'FHRAI', sub: 'Excellence 2024' },
          ].map((a, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
            >
              <a.icon className="text-primary text-2xl" />
              <div className="text-left">
                <p className="font-serif text-sm font-medium text-secondary">{a.label}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-secondary/50">
                  {a.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="py-20 sm:py-28 lg:py-36 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="eyebrow mb-4">About The Hotel</p>
            <h2 className="section-title">
              A Legacy of{' '}
              <span className="text-primary-dark">Quiet Luxury</span>
            </h2>
            <div className="divider-gold !mx-0 !ml-0" />
            <p className="text-secondary/70 mb-6 leading-relaxed text-lg font-light">
              {hotelInfo.description}
            </p>
            <p className="text-secondary/60 mb-8 leading-relaxed hidden sm:block">
              From our humble beginnings on the banks of Lake Pichola to becoming one of the
              most celebrated luxury hotels in Rajasthan, every corner of {hotelInfo.name} tells
              a story of elegance, tradition, and the timeless spirit of Mewar.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 text-secondary font-medium tracking-wider uppercase text-sm"
            >
              <span className="border-b border-primary pb-1">Discover Our Story</span>
              <FiArrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <div className="absolute -inset-4 glass-gold rounded-3xl -rotate-2 hidden sm:block" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80"
                  alt="Hotel lobby"
                  loading="lazy"
                  className="rounded-2xl h-44 sm:h-60 w-full object-cover shadow-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80"
                  alt="Hotel details"
                  loading="lazy"
                  className="rounded-2xl h-32 sm:h-44 w-full object-cover shadow-xl"
                />
              </div>
              <div className="space-y-4 pt-10">
                <img
                  src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80"
                  alt="Dining"
                  loading="lazy"
                  className="rounded-2xl h-32 sm:h-44 w-full object-cover shadow-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80"
                  alt="Room"
                  loading="lazy"
                  className="rounded-2xl h-44 sm:h-60 w-full object-cover shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURED ROOMS ============ */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 bg-gradient-to-b from-stone-50 to-ivory">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14 sm:mb-20"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              Accommodations
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Rooms & Suites
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.p variants={fadeUp} className="section-subtitle">
              Choose from our collection of elegantly appointed rooms designed for your comfort —
              all with views of the lake, gardens, or Aravalli hills.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {rooms
              .filter((r) => r.featured)
              .map((room) => (
                <motion.div key={room.id} variants={fadeUp}>
                  <RoomCard room={room} />
                </motion.div>
              ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link to="/rooms" className="btn-outline">
              View All Rooms
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ IMMERSIVE PARALLAX STRIP ============ */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-secondary/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            whileHover={{ scale: 1.08 }}
            className="w-20 h-20 rounded-full glass-dark flex items-center justify-center text-primary mb-6 hover:bg-primary hover:text-secondary transition-all duration-500"
            aria-label="Play tour"
          >
            <FiPlay size={28} className="ml-1" />
          </motion.button>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="font-display text-[10px] tracking-[0.4em] uppercase text-primary mb-2"
          >
            Take a Tour
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light"
          >
            Step Inside Aurelia
          </motion.h3>
        </div>
      </section>

      {/* ============ AMENITIES ============ */}
      <section className="py-20 sm:py-28 lg:py-36 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14 sm:mb-20"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              Experience
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Curated Amenities
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.p variants={fadeUp} className="section-subtitle">
              Indulge in our premium facilities crafted to make your stay unforgettable.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {amenities.slice(0, 8).map((amenity) => (
              <motion.div key={amenity.id} variants={fadeUp}>
                <AmenityCard amenity={amenity} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative py-20 sm:py-28 lg:py-36 px-4 overflow-hidden bg-secondary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14 sm:mb-20"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4 !text-primary">
              Testimonials
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4"
            >
              Words From Our Guests
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-3 text-stone-100/80"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-primary text-primary w-4 h-4" />
                ))}
              </div>
              <span className="text-sm tracking-wide">
                {hotelInfo.rating}/5 · {hotelInfo.reviews.toLocaleString()} verified reviews
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={fadeUp}>
                <TestimonialCard testimonial={t} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-28 sm:py-36 px-4 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="glass-dark rounded-3xl p-10 sm:p-14 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <motion.p variants={fadeUp} className="eyebrow !text-primary mb-4">
              Your Escape Awaits
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
            >
              Reserve an Unforgettable Stay
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-white/70 mb-10 max-w-xl mx-auto font-light"
            >
              Book directly with us and enjoy exclusive rates, complimentary upgrades, and
              personalized service from arrival to departure.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn-primary">
                <span>Reserve Your Room</span>
              </Link>
              <Link to="/contact" className="btn-glass">
                <span>Contact Concierge</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============ MOBILE FLOATING QUICK-BOOK ============ */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6, ease: EASE }}
          className="sm:hidden fixed bottom-5 right-5 z-40"
        >
          <Link
            to="/booking"
            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-2xl shadow-primary/40 flex items-center justify-center text-secondary"
            aria-label="Quick book"
          >
            <FiArrowRight size={22} />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;