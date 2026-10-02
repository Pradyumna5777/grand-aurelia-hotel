import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCheck,
  FiUser,
  FiMessageSquare,
  FiChevronDown,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiArrowRight,
  FiSend,
  FiCopy,
} from 'react-icons/fi';
import { hotelInfo } from '../data/hotelData';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ---------- Reusable field ---------- */
const Field = ({ icon: Icon, label, required, children }) => (
  <div>
    <label className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary/60 mb-2">
      {Icon && <Icon className="text-primary" size={12} />}
      {label}
      {required && <span className="text-primary">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  'w-full px-4 py-3 bg-white/60 border border-secondary/15 rounded-lg text-secondary text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-secondary/40';

/* ---------- FAQ data (India-aware) ---------- */
const faqs = [
  {
    q: 'What time is check-in and check-out?',
    a: 'Check-in is from 3:00 PM, and check-out is until 12:00 PM. Early check-in and late check-out can be arranged on request, subject to availability.',
  },
  {
    q: 'Do you offer airport transfers?',
    a: 'Yes. Our chauffeured luxury sedan service is available 24/7 from Maharana Pratap Airport, Udaipur (approx. 25 minutes). Please share your flight details at least 24 hours in advance so our concierge can arrange pickup.',
  },
  {
    q: 'Is parking available?',
    a: 'Complimentary valet parking is available for all resident guests. Additional parking for visitors can be arranged with the front desk.',
  },
  {
    q: 'Are pets allowed?',
    a: 'Small pets up to 10 kg are welcome with prior approval. A pet fee of ₹2,500 per stay applies, which includes a welcome kit and pet-friendly amenities.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are charged one night stay plus taxes. Refunds are processed within 5–7 business days.',
  },
  {
    q: 'Do you arrange local sightseeing?',
    a: 'Absolutely. Our concierge can arrange private guided tours of the City Palace, Jag Mandir, Sajjangarh Fort, and Lake Pichola boat rides — all with a dedicated car and English-speaking guide.',
  },
];

/* ---------- Nearby attractions ---------- */
const attractions = [
  {
    icon: '🏰',
    name: 'City Palace',
    dist: '5 min away',
    desc: 'A 400-year-old palace complex with museums and lake views.',
    image:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
  },
  {
    icon: '⛵',
    name: 'Lake Pichola',
    dist: 'Steps away',
    desc: 'Boat rides at sunset with views of Jag Mandir and the Aravallis.',
    image:
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80',
  },
  {
    icon: '🌅',
    name: 'Sajjangarh Fort',
    dist: '20 min away',
    desc: 'The Monsoon Palace — panoramic sunset views over the city.',
    image:
      'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=600&q=80',
  },
  {
    icon: '🛕',
    name: 'Jagdish Temple',
    dist: '8 min away',
    desc: 'An intricately carved 17th-century temple in the old city.',
    image:
      'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=600&q=80',
  },
];

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const contactCards = [
    {
      icon: FiMapPin,
      title: 'Visit Us',
      primary: hotelInfo.address,
      action: 'Open in Maps',
      href: hotelInfo.coords.mapExternalUrl,
      external: true,
      key: 'address',
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      primary: hotelInfo.phone,
      action: 'Copy number',
      copy: hotelInfo.phone,
      key: 'phone',
    },
    {
      icon: FiMail,
      title: 'Email Us',
      primary: hotelInfo.email,
      action: 'Copy email',
      copy: hotelInfo.email,
      key: 'email',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* ==================== HERO ==================== */}
      <section className="relative pt-40 pb-28 sm:pt-48 sm:pb-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80')",
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
              Udaipur · We'd Love to Hear From You
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-5 leading-[1.05]">
            Get in Touch
          </h1>

          <div className="divider-gold" />

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Our concierge team is available 24/7 for reservations, special requests, and any
            question — no matter how small.
          </p>
        </motion.div>
      </section>

      {/* ==================== LANDMARK STRIP ==================== */}
      <section className="relative z-10 -mt-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="max-w-3xl mx-auto glass-dark rounded-full px-5 sm:px-6 py-3 flex items-center justify-center gap-4 sm:gap-6 text-white text-[10px] sm:text-xs flex-wrap"
        >
          <span className="flex items-center gap-2">
            <span className="text-primary">🕌</span> Lake Pichola
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
          <span className="flex items-center gap-2">
            <span className="text-primary">✈️</span> 25 min from Udaipur Airport
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
          <span className="flex items-center gap-2">
            <span className="text-primary">🏛️</span> 5 min from City Palace
          </span>
        </motion.div>
      </section>

      {/* ==================== CONTACT CARDS RIBBON ==================== */}
      <section className="relative pt-12 z-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {contactCards.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.1)] p-6 sm:p-7 hover:-translate-y-1.5 hover:shadow-[0_25px_70px_0_rgba(201,169,97,0.2)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-secondary transition-all duration-400">
                <c.icon size={20} />
              </div>

              <p className="font-display text-[10px] tracking-[0.25em] uppercase text-secondary/50 mb-2">
                {c.title}
              </p>

              <p className="font-serif text-lg text-secondary font-medium leading-snug mb-4">
                {c.primary}
              </p>

              {c.copy ? (
                <button
                  onClick={() => copyToClipboard(c.copy, c.key)}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-primary hover:gap-3 transition-all"
                >
                  {copied === c.key ? (
                    <>
                      <FiCheck size={12} /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy size={12} /> {c.action}
                    </>
                  )}
                </button>
              ) : (
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-primary hover:gap-3 transition-all"
                >
                  <FiArrowRight size={12} /> {c.action}
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==================== FORM + MAP ==================== */}
      <section className="py-20 sm:py-24 lg:py-28 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
          {/* ---------- LEFT: Form ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="eyebrow mb-3">Send a Message</p>
            <h2 className="section-title">
              Tell Us How We
              <br />
              <span className="text-primary-dark">Can Help.</span>
            </h2>
            <div className="divider-gold !mx-0 !ml-0" />
            <p className="text-secondary/60 mb-8 leading-relaxed">
              Fill in the form and our team will respond within 2 hours during business hours,
              or by the next morning if you write to us overnight.
            </p>

            <form
              onSubmit={handleSubmit}
              className="relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.1)] p-6 sm:p-8 space-y-5 overflow-hidden"
            >
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={FiUser} label="Full Name" required>
                  <input
                    required
                    type="text"
                    placeholder="Priya Sharma"
                    className={inputClass}
                  />
                </Field>

                <Field icon={FiMail} label="Email" required>
                  <input
                    required
                    type="email"
                    placeholder="priya@example.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={FiPhone} label="Phone">
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </Field>

                <Field icon={FiMessageSquare} label="Subject">
                  <input
                    type="text"
                    placeholder="Reservation enquiry"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field icon={FiMessageSquare} label="Message" required>
                <textarea
                  required
                  rows="5"
                  placeholder="Tell us how we can help make your stay extraordinary..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="glass-gold rounded-xl p-4 flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <FiCheck size={18} />
                      </div>
                      <div>
                        <p className="font-serif text-sm text-secondary font-medium">
                          Message received
                        </p>
                        <p className="text-xs text-secondary/60">
                          We'll reply shortly.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      className="btn-primary w-full !justify-center"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <FiSend size={14} />
                      <span>Send Message</span>
                    </motion.button>
                  )}
                </AnimatePresence>

                <p className="text-[11px] text-center text-secondary/50 mt-4 leading-relaxed">
                  We respect your privacy. Your details are never shared.
                </p>
              </div>
            </form>
          </motion.div>

          {/* ---------- RIGHT: Map + Hours + Social ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="space-y-6"
          >
            {/* Map card */}
            <div
              id="map"
              className="relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.1)] overflow-hidden"
            >
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10" />

              <div className="relative h-72 sm:h-80 overflow-hidden">
                <iframe
                  title="Hotel Location — Lake Pichola, Udaipur"
                  src={hotelInfo.coords.mapEmbedUrl}
                  className="w-full h-full border-0 grayscale-[30%] contrast-[1.05]"
                  loading="lazy"
                />

                <div className="absolute bottom-4 left-4 right-4 glass-card rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                    <FiMapPin size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[9px] tracking-[0.25em] uppercase text-secondary/50">
                      Location
                    </p>
                    <p className="text-xs text-secondary font-medium truncate">
                      {hotelInfo.address}
                    </p>
                  </div>
                  <a
                    href={hotelInfo.coords.mapExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:scale-110 transition-transform"
                    aria-label="Open in maps"
                  >
                    <FiArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.1)] p-6 overflow-hidden">
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <FiClock size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-display text-[10px] tracking-[0.25em] uppercase text-secondary/50 mb-1">
                    Front Desk Hours
                  </p>
                  <p className="font-serif text-lg text-secondary font-medium mb-3">
                    Open 24 / 7 — Always
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-secondary/5">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-secondary/50 mb-1">
                        Check-in
                      </p>
                      <p className="text-sm text-secondary font-medium">3:00 PM</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/5">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-secondary/50 mb-1">
                        Check-out
                      </p>
                      <p className="text-sm text-secondary font-medium">12:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.1)] p-6 overflow-hidden">
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              <p className="font-display text-[10px] tracking-[0.25em] uppercase text-secondary/50 mb-3">
                Follow the Story
              </p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: FiInstagram, href: '#', label: 'Instagram' },
                  { Icon: FiFacebook, href: '#', label: 'Facebook' },
                  { Icon: FiTwitter, href: '#', label: 'Twitter' },
                ].map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    className="w-11 h-11 rounded-full bg-secondary/5 hover:bg-primary hover:text-secondary flex items-center justify-center text-secondary transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={18} />
                  </a>
                ))}
                <span className="ml-auto text-xs text-secondary/50 tracking-wide">
                  @grandaurelia
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== EXPLORE UDAIPUR ==================== */}
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
              Around the Hotel
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Explore Udaipur
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.p variants={fadeUp} className="section-subtitle">
              The City of Lakes has wonders at every turn — all minutes from our door.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {attractions.map((spot, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(15,15,15,0.06)] hover:shadow-[0_24px_70px_0_rgba(201,169,97,0.25)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1400ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/30 to-transparent" />
                  <div className="absolute top-4 left-4 glass-dark rounded-xl w-11 h-11 flex items-center justify-center text-xl">
                    {spot.icon}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-semibold tracking-[0.15em] uppercase text-white">
                    {spot.dist}
                  </div>
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-serif text-xl font-medium text-white drop-shadow-lg">
                      {spot.name}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-secondary/65 text-sm leading-relaxed">
                    {spot.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 bg-gradient-to-b from-stone-50 to-ivory">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              Frequently Asked
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Before You Ask
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold" />
            <motion.p variants={fadeUp} className="section-subtitle">
              The answers to the questions we hear most.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative bg-white/70 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-400 ${
                    isOpen
                      ? 'border-primary/30 shadow-[0_15px_45px_0_rgba(201,169,97,0.15)]'
                      : 'border-white/60 shadow-[0_8px_32px_0_rgba(15,15,15,0.05)]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg text-secondary font-medium pr-2">
                      {f.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400 ${
                        isOpen
                          ? 'bg-primary text-secondary rotate-180'
                          : 'bg-secondary/5 text-secondary/60'
                      }`}
                    >
                      <FiChevronDown size={16} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm text-secondary/70 leading-relaxed border-t border-secondary/5 pt-4">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
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
          className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/50" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left max-w-lg">
              <p className="font-display text-[10px] tracking-[0.3em] text-primary mb-3">
                Prefer to Book Directly?
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-light mb-3">
                Reserve with our concierge
              </h3>
              <p className="text-white/60 text-sm sm:text-base font-light">
                Skip the form — reserve your room in under two minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/booking" className="btn-primary whitespace-nowrap">
                <span>Book Your Stay</span>
              </Link>
              <a
                href={`tel:${hotelInfo.phone}`}
                className="btn-glass whitespace-nowrap inline-flex items-center gap-2"
              >
                <FiPhone size={14} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;