import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiArrowUpRight,
  FiYoutube,
  FiCheckCircle,
} from 'react-icons/fi';
import Logo from './Logo';
import { hotelInfo } from '../data/hotelData';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  /* ---------- Quick links ---------- */
  const quickLinks = [
    { label: 'Rooms & Suites', to: '/rooms' },
    { label: 'Amenities', to: '/amenities' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Our Story', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Book Now', to: '/booking' },
  ];

  /* ---------- Experiences (extra column) ---------- */
  const experiences = [
    'Rooftop Dining',
    'Lake Pichola Cruise',
    'Ayurvedic Spa',
    'Private Cinema',
    'Yoga at Sunrise',
  ];

  /* ---------- Socials ---------- */
  const socials = [
    { Icon: FiInstagram, href: '#', label: 'Instagram' },
    { Icon: FiFacebook, href: '#', label: 'Facebook' },
    { Icon: FiTwitter, href: '#', label: 'Twitter' },
    { Icon: FiYoutube, href: '#', label: 'YouTube' },
  ];

  /* ---------- Awards strip ---------- */
  const awards = [
    'Condé Nast India',
    'Forbes India',
    'Travel + Leisure India',
    'FHRAI Excellence',
  ];

  return (
    <footer className="relative bg-secondary text-stone-100 overflow-hidden">
      {/* Top gold hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Subtle background image + gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary" />

      {/* Floating gold particles (very subtle) */}
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 blur-[1px]"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 5 + i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* ============ TOP: Brand + Newsletter ============ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 pb-14 border-b border-white/10"
        >
          {/* Brand block */}
          <motion.div variants={fadeUp}>
            <Link to="/" className="inline-block mb-6">
              <Logo variant="light" size="lg" />
            </Link>

            <p className="text-sm leading-relaxed mb-6 text-stone-100/60 font-light max-w-md">
              {hotelInfo.tagline}. A landmark of quiet luxury on the banks of Lake Pichola
              since 1925.
            </p>

            {/* Address pill */}
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-6">
              <span className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <FiMapPin size={14} />
              </span>
              <div>
                <p className="font-display text-[9px] tracking-[0.25em] uppercase text-stone-100/50">
                  Visit Us
                </p>
                <p className="text-xs text-stone-100/80 font-light">
                  {hotelInfo.address}
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-stone-100/70 hover:bg-primary hover:border-primary hover:text-secondary transition-all duration-300 hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter block */}
          <motion.div variants={fadeUp}>
            <div className="relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Gold hairline */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              <p className="font-display text-[10px] tracking-[0.3em] text-primary mb-3">
                Stay in the Know
              </p>
              <h4 className="font-serif text-xl sm:text-2xl text-white font-medium mb-3">
                Join our inner circle
              </h4>
              <p className="text-sm text-stone-100/60 font-light mb-5 leading-relaxed">
                Exclusive offers, seasonal menus, and stories from Udaipur — delivered
                thoughtfully.
              </p>

              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-stone-100/40 focus:outline-none focus:border-primary focus:bg-white/10 transition-all text-sm"
                />
                <button className="btn-primary text-xs !py-3 w-full">
                  <span>Subscribe</span>
                  <FiArrowRight size={12} />
                </button>
              </form>

              <p className="text-[10px] text-stone-100/40 mt-3 leading-relaxed">
                We never share your details. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ============ MIDDLE: 4 Columns ============ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14"
        >
          {/* Explore */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-medium mb-5 text-xs tracking-[0.2em] uppercase">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-2 text-stone-100/60 hover:text-primary transition-colors duration-300 font-light"
                  >
                    <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Experiences */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-medium mb-5 text-xs tracking-[0.2em] uppercase">
              Experiences
            </h4>
            <ul className="space-y-3 text-sm">
              {experiences.map((item) => (
                <li key={item}>
                  <Link
                    to="/amenities"
                    className="group inline-flex items-center gap-2 text-stone-100/60 hover:text-primary transition-colors duration-300 font-light"
                  >
                    <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-medium mb-5 text-xs tracking-[0.2em] uppercase">
              Reach Us
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="group flex gap-3 items-start text-stone-100/60 hover:text-primary transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-secondary transition-all">
                    <FiPhone size={12} />
                  </span>
                  <span className="pt-1">{hotelInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${hotelInfo.email}`}
                  className="group flex gap-3 items-start text-stone-100/60 hover:text-primary transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-secondary transition-all">
                    <FiMail size={12} />
                  </span>
                  <span className="pt-1 break-all">{hotelInfo.email}</span>
                </a>
              </li>
              <li className="flex gap-3 items-start text-stone-100/60">
                <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <FiMapPin size={12} />
                </span>
                <span className="pt-1">Lake Pichola, Udaipur, Rajasthan</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="font-display text-[9px] tracking-[0.25em] uppercase text-stone-100/40 mb-1">
                Front Desk
              </p>
              <p className="text-xs text-stone-100/70 flex items-center gap-2">
                <FiCheckCircle className="text-primary" size={12} />
                Open 24 / 7
              </p>
            </div>
          </motion.div>

          {/* Recognition */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-medium mb-5 text-xs tracking-[0.2em] uppercase">
              Recognition
            </h4>
            <ul className="space-y-3 text-sm">
              {awards.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2 text-stone-100/60 font-light"
                >
                  <span className="text-primary mt-0.5">★</span>
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="font-display text-[9px] tracking-[0.25em] uppercase text-stone-100/40 mb-2">
                Airport Transfer
              </p>
              <p className="text-xs text-stone-100/70 font-light">
                25 min from Maharana Pratap Airport
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ============ BOTTOM BAR ============ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Left: copyright + Made in India */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-xs text-stone-100/40 tracking-wide">
            <p>
              © {currentYear} {hotelInfo.name}. All rights reserved.
            </p>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-stone-100/20" />
            <p className="flex items-center gap-1.5">
              Handcrafted in <span className="text-primary">Udaipur</span>
              <span className="text-primary">🇮🇳</span>
            </p>
          </div>

          {/* Right: legal links */}
          <div className="flex items-center gap-5 text-xs text-stone-100/40">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-1 hover:text-primary transition-colors"
            >
              Sitemap
              <FiArrowUpRight
                size={11}
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Extra bottom accent — very thin gold line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  );
};

export default Footer;