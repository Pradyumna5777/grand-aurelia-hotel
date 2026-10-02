import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from 'framer-motion';
import {
  FiArrowRight,
  FiAward,
  FiHeart,
  FiUsers,
  FiGlobe,
  FiStar,
  FiCoffee,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { hotelInfo } from '../data/hotelData';

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
const Counter = ({ value, suffix = '', decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) =>
        setDisplay(
          decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toString()
        ),
    });
    return controls.stop;
  }, [inView, value, count, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const About = () => {
  /* ---------- Parallax on the hero ---------- */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ---------- Stats ---------- */
  const stats = [
    { icon: FiAward, value: 98, suffix: '+', label: 'Years of Excellence' },
    { icon: FiUsers, value: 50, suffix: 'K+', label: 'Happy Guests' },
    { icon: FiHeart, value: 4.9, suffix: '', label: 'Guest Rating', decimals: 1 },
    { icon: FiGlobe, value: 120, suffix: '+', label: 'Countries Served' },
  ];

  /* ---------- Timeline (India-contextual) ---------- */
  const timeline = [
    {
      year: '1925',
      title: 'The Founding',
      text: 'Established on the banks of Lake Pichola with 24 rooms and a single promise — Indian hospitality without compromise.',
    },
    {
      year: '1962',
      title: 'The Golden Era',
      text: 'Hosted Maharajas of Rajasthan, dignitaries, and legendary artists. Renamed "The Grand Aurelia" in honour of its founding architect.',
    },
    {
      year: '1998',
      title: 'A Modern Restoration',
      text: 'A three-year restoration preserved every handcrafted detail — jharokhas, frescoes, and marble — while introducing modern luxuries.',
    },
    {
      year: '2024',
      title: 'A New Chapter',
      text: 'Recognised by Condé Nast India, Forbes India, and Travel + Leisure India — the legacy continues, stronger than ever.',
    },
  ];

  /* ---------- Philosophy pillars ---------- */
  const pillars = [
    {
      icon: FiCoffee,
      title: 'Unhurried Mornings',
      text: 'Slow breakfasts on the terrace, hand-poured masala chai, and the softest linens to wake up in.',
    },
    {
      icon: FiSun,
      title: 'Considered Days',
      text: 'From curated old-city walks to private Ayurvedic spa rituals — every hour, purposefully yours.',
    },
    {
      icon: FiMoon,
      title: 'Quiet Evenings',
      text: 'Candlelit Rajasthani dining, a rooftop nightcap over the lake, and a room that welcomes you back.',
    },
  ];

  /* ---------- Awards (India-focused) ---------- */
  const awards = [
    { name: 'Condé Nast Traveller India', sub: 'Gold List 2024' },
    { name: 'Forbes India', sub: 'Five Star Hotel' },
    { name: 'Travel + Leisure India', sub: 'Top 50 Hotels' },
    { name: 'Luxury Hotel Awards', sub: 'Best Heritage Hotel' },
    { name: 'FHRAI', sub: 'Excellence 2024' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* ==================== HERO ==================== */}
      <section
        ref={heroRef}
        className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        {/* Parallax image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-20 -bottom-20">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-secondary" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto text-center text-white px-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-display text-[10px] tracking-[0.3em] font-medium">
              Udaipur · Since 1925 · Our Story
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-5 leading-[1.05]"
          >
            Ninety-Eight Years
            <br />
            <span className="text-primary">of Quiet Hospitality.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="divider-gold"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {hotelInfo.tagline}
          </motion.p>
        </motion.div>
      </section>

      {/* ==================== STATS RIBBON ==================== */}
      <section className="relative -mt-12 z-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto glass-card rounded-2xl p-6 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-[0_20px_60px_0_rgba(15,15,15,0.12)]"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <s.icon size={20} />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-medium bg-gradient-to-br from-primary-dark to-primary bg-clip-text text-transparent mb-1">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                />
              </div>
              <div className="text-[10px] sm:text-xs text-secondary/60 tracking-[0.15em] uppercase font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==================== FOUNDER'S STORY ==================== */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative order-2 md:order-1"
          >
            {/* Decorative gold frame */}
            <div className="absolute -inset-4 glass-gold rounded-3xl rotate-2 hidden sm:block" />

            <div className="relative grid grid-cols-5 gap-4">
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
                alt="Grand lobby"
                loading="lazy"
                className="col-span-3 rounded-2xl h-72 sm:h-96 w-full object-cover shadow-xl"
              />
              <div className="col-span-2 space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80"
                  alt="Room detail"
                  loading="lazy"
                  className="rounded-2xl h-32 sm:h-44 w-full object-cover shadow-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                  alt="Dining"
                  loading="lazy"
                  className="rounded-2xl h-32 sm:h-44 w-full object-cover shadow-xl"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="order-1 md:order-2"
          >
            <p className="eyebrow mb-4">A Legacy of Hospitality</p>
            <h2 className="section-title">
              Built by Hand,
              <br />
              <span className="text-primary-dark">Kept by Heart.</span>
            </h2>
            <div className="divider-gold !mx-0 !ml-0" />
            <p className="text-secondary/70 mb-5 leading-relaxed text-base sm:text-lg font-light">
              {hotelInfo.description}
            </p>
            <p className="text-secondary/60 mb-6 leading-relaxed">
              From our humble beginnings on the banks of Lake Pichola to becoming one of the most
              celebrated luxury hotels in Rajasthan, {hotelInfo.name} has consistently delivered
              exceptional experiences to guests from around the world. Every corner of our hotel
              tells a story of elegance, tradition, and the timeless spirit of Mewar.
            </p>

            {/* Founder signature */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center font-serif text-primary font-medium text-lg">
                RS
              </div>
              <div>
                <p className="font-serif text-secondary font-medium">Rahul Sen</p>
                <p className="text-xs text-secondary/50 tracking-wide uppercase">
                  Founder · 1925
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="relative py-20 sm:py-28 px-4 bg-secondary text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14 sm:mb-20"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4 !text-primary">
              Our Journey
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-4"
            >
              Nearly a Century
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.p variants={fadeUp} className="text-white/60 max-w-2xl mx-auto">
              Four chapters that shaped who we are today.
            </motion.p>
          </motion.div>

          {/* Timeline grid */}
          <div className="relative">
            {/* Vertical line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent -translate-x-1/2" />

            <div className="space-y-10 md:space-y-0">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                    className={`relative md:grid md:grid-cols-2 md:gap-12 md:items-center ${
                      i > 0 ? 'md:-mt-4' : ''
                    }`}
                  >
                    {/* Left content */}
                    <div className={isLeft ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}>
                      <div className="glass-dark rounded-2xl p-6 sm:p-7 inline-block text-left max-w-md w-full">
                        <p className="font-display text-[10px] tracking-[0.3em] text-primary mb-2">
                          {item.year}
                        </p>
                        <h3 className="font-serif text-2xl text-white font-medium mb-3">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>

                    {/* Right content (empty on desktop for spacing) */}
                    <div className={isLeft ? 'md:order-2' : 'md:order-1 md:pr-12'} />

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-primary/20 absolute animate-ping" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PHILOSOPHY PILLARS ==================== */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14 sm:mb-16"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              Our Philosophy
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Three Simple Ideas
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.p variants={fadeUp} className="section-subtitle">
              We don't do grand gestures — we do small, thoughtful ones, done impeccably well.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,15,15,0.06)] hover:shadow-[0_24px_70px_0_rgba(201,169,97,0.25)] hover:-translate-y-2 transition-all duration-500"
              >
                {/* Gold hairline on top */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-secondary transition-all duration-400">
                  <p.icon size={24} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-secondary font-medium mb-3">
                  {p.title}
                </h3>
                <p className="text-secondary/60 text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== MISSION QUOTE ==================== */}
      <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="glass-dark rounded-3xl p-10 sm:p-14 lg:p-16 relative overflow-hidden">
            {/* Gold accent line */}
            <div className="absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <p className="font-display text-[10px] tracking-[0.35em] text-primary mb-6">
              Our Mission
            </p>

            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-light leading-[1.35] mb-8">
              "To create unforgettable memories through impeccable service, quiet luxury, and
              the genuine warmth of{' '}
              <span className="text-primary">Indian hospitality.</span>"
            </blockquote>

            <p className="signature text-primary-light">
              ~ Auguste Beaumont, Founder
            </p>
          </div>
        </motion.div>
      </section>

      {/* ==================== AWARDS ==================== */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center eyebrow mb-10"
          >
            Recognition
          </motion.p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16"
          >
            {awards.map((a, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <FiStar className="text-primary text-xl" />
                <div>
                  <p className="font-serif text-sm font-medium text-secondary">{a.name}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-secondary/50">
                    {a.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="px-4 pb-24 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-5xl mx-auto glass-gold rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

          <p className="font-display text-[10px] tracking-[0.3em] text-primary-dark mb-4">
            The Next Chapter
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-secondary font-light mb-4 leading-tight">
            Come Write Your Story With Us
          </h2>
          <p className="text-secondary/60 max-w-xl mx-auto mb-8 font-light">
            Reserve a room and become part of a legacy that's been unfolding on the banks of Lake
            Pichola for nearly a century.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-primary">
              <span>Book Your Stay</span>
            </Link>
            <Link to="/rooms" className="btn-outline">
              Explore Rooms
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;