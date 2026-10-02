import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCheck,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiUsers,
  FiMessageSquare,
  FiShield,
  FiClock,
  FiTag,
} from 'react-icons/fi';
import { rooms, hotelInfo } from '../data/hotelData';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

const Field = ({ icon: Icon, label, children, required }) => (
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

const Booking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [roomId, setRoomId] = useState(rooms[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const selectedRoom = rooms.find((r) => r.id === Number(roomId));

  /* ---------- Live price summary ---------- */
  const summary = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    if (nights <= 0) return null;
    const subtotal = selectedRoom.price * nights;
    const taxes = Math.round(subtotal * 0.12);   // 12% GST
    const total = subtotal + taxes;
    return { nights, subtotal, taxes, total };
  }, [checkIn, checkOut, selectedRoom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* ==================== HERO ==================== */}
      <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-secondary" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10 max-w-3xl mx-auto text-center text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
            <FiShield className="text-primary w-3 h-3" />
            <span className="font-display text-[10px] tracking-[0.3em] font-medium">
              Secure Reservation
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-5 leading-[1.05]">
            Reserve Your Stay
          </h1>
          <div className="divider-gold" />
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light">
            You won't be charged yet — we'll confirm within the hour.
          </p>
        </motion.div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <section className="relative -mt-12 z-20 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Success toast */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mb-6 glass-card rounded-2xl p-5 flex items-center gap-4 border-l-4 border-l-primary"
              >
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                  <FiCheck size={22} />
                </div>
                <div>
                  <p className="font-serif text-lg text-secondary font-medium">
                    Booking request received
                  </p>
                  <p className="text-sm text-secondary/60">
                    Our team will contact you at the provided details within the hour.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* ---------- LEFT: Form ---------- */}
            <motion.form
              variants={stagger}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit}
              className="relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.1)] p-6 sm:p-8 lg:p-10 overflow-hidden space-y-8"
            >
              {/* Gold top accent */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* === Guest Details === */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-serif text-sm font-semibold">
                    1
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-secondary font-medium">
                    Guest Details
                  </h2>
                </div>

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
                  <Field icon={FiPhone} label="Phone" required>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </Field>
                  <Field icon={FiUsers} label="Guests" required>
                    <select
                      required
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={inputClass}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Guest{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />

              {/* === Stay Details === */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-serif text-sm font-semibold">
                    2
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-secondary font-medium">
                    Stay Details
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <Field icon={FiCalendar} label="Check-in Date" required>
                    <input
                      required
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field icon={FiCalendar} label="Check-out Date" required>
                    <input
                      required
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field icon={FiTag} label="Room Type" required>
                  <select
                    required
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className={inputClass}
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — {formatINR(r.price)}/night
                      </option>
                    ))}
                  </select>
                </Field>
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />

              {/* === Special Requests === */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-serif text-sm font-semibold">
                    3
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-secondary font-medium">
                    Special Requests
                  </h2>
                </div>
                <Field icon={FiMessageSquare} label="Anything we should know?">
                  <textarea
                    rows="4"
                    placeholder="Early check-in, anniversary celebration, dietary preferences..."
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </motion.div>

              {/* Submit */}
              <motion.div variants={fadeUp} className="pt-2">
                <button type="submit" className="btn-primary w-full !justify-center text-sm">
                  <span>Confirm Reservation</span>
                </button>
                <p className="text-[11px] text-center text-secondary/50 mt-4 leading-relaxed">
                  You won't be charged yet. We'll contact you to confirm your reservation.
                </p>
              </motion.div>
            </motion.form>

            {/* ---------- RIGHT: Live Summary ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="lg:sticky lg:top-28 h-fit space-y-6"
            >
              {/* Room preview */}
              <div className="relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.1)] overflow-hidden">
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10" />

                <div className="relative h-40 overflow-hidden">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-primary mb-1">
                      Your Selection
                    </p>
                    <h3 className="font-serif text-xl text-white font-medium">
                      {selectedRoom.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-3xl text-secondary font-medium">
                      {formatINR(selectedRoom.price)}
                    </span>
                    <span className="text-xs text-secondary/50">/ night</span>
                  </div>
                  <p className="text-xs text-secondary/50 mb-5">
                    {selectedRoom.size} · {selectedRoom.capacity} guests · {selectedRoom.beds}
                  </p>

                  <div className="divider-gold !mx-0 !ml-0 !my-5" />

                  {/* Price breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-secondary/70">
                      <span>
                        {summary
                          ? `${formatINR(selectedRoom.price)} × ${summary.nights} night${summary.nights > 1 ? 's' : ''}`
                          : 'Select your dates'}
                      </span>
                      <span className="font-medium text-secondary">
                        {summary ? formatINR(summary.subtotal) : '—'}
                      </span>
                    </div>

                    <div className="flex justify-between text-secondary/70">
                      <span>Taxes & fees (12% GST)</span>
                      <span className="font-medium text-secondary">
                        {summary ? formatINR(summary.taxes) : '—'}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-secondary/10 flex justify-between items-baseline">
                      <span className="font-display text-[10px] tracking-[0.25em] uppercase text-secondary/60">
                        Total
                      </span>
                      <span className="font-serif text-2xl text-primary font-semibold">
                        {summary ? formatINR(summary.total) : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-6 pt-6 border-t border-secondary/10 space-y-3">
                    {[
                      { icon: FiShield, text: 'Free cancellation up to 48h' },
                      { icon: FiClock, text: 'Confirmation within 1 hour' },
                      { icon: FiCheck, text: 'Best rate guaranteed' },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-secondary/60">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <t.icon size={12} />
                        </span>
                        <span>{t.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Concierge card */}
              <div className="glass-gold rounded-2xl p-6">
                <p className="font-display text-[10px] tracking-[0.25em] uppercase text-primary-dark mb-2">
                  Need Assistance?
                </p>
                <h4 className="font-serif text-lg text-secondary font-medium mb-2">
                  Speak with our concierge
                </h4>
                <p className="text-xs text-secondary/60 mb-4 leading-relaxed">
                  Available 24/7 for personalized recommendations.
                </p>
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
                >
                  <FiPhone className="text-primary" size={14} />
                  {hotelInfo.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;