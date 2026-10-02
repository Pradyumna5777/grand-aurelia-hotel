import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiUsers,
  FiMaximize,
  FiCheck,
  FiStar,
  FiShare2,
  FiHeart,
} from 'react-icons/fi';
import { useState } from 'react';
import { rooms, hotelInfo } from '../data/hotelData';
import BookingForm from '../components/BookingForm';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === Number(id));
  const [liked, setLiked] = useState(false);

  /* ---------- Not found ---------- */
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-ivory">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 rounded-3xl text-center max-w-md"
        >
          <div className="text-6xl mb-4">🛏️</div>
          <h1 className="font-serif text-3xl mb-3 text-secondary">Room not found</h1>
          <p className="text-secondary/60 mb-6">
            The room you're looking for is no longer available.
          </p>
          <button onClick={() => navigate('/rooms')} className="btn-primary">
            <span>Back to Rooms</span>
          </button>
        </motion.div>
      </div>
    );
  }

  /* ---------- Similar rooms (same category, exclude current) ---------- */
  const similar = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-ivory">
      {/* ==================== HERO IMAGE ==================== */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background image with slow zoom */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${room.image}')` }}
        />
        {/* Layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

        {/* Top bar: back + actions */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 flex items-center justify-between">
          <Link
            to="/rooms"
            className="group inline-flex items-center gap-2 glass-dark px-4 py-2.5 rounded-full text-white text-xs font-medium tracking-wider uppercase hover:!bg-white/20 transition-all"
          >
            <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Rooms</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked(!liked)}
              aria-label="Save room"
              className="w-11 h-11 glass-dark rounded-full flex items-center justify-center text-white hover:!bg-white/20 transition-all"
            >
              <FiHeart className={liked ? 'fill-primary text-primary' : ''} />
            </button>
            <button
              aria-label="Share room"
              className="w-11 h-11 glass-dark rounded-full flex items-center justify-center text-white hover:!bg-white/20 transition-all"
            >
              <FiShare2 />
            </button>
          </div>
        </div>

        {/* Bottom content on image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="absolute bottom-0 left-0 right-0 z-10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark mb-4">
              <FiStar className="fill-primary text-primary w-3 h-3" />
              <span className="font-display text-[10px] tracking-[0.3em] text-white font-medium">
                {hotelInfo.rating} Guest Rating
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 leading-[1.05]">
              {room.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <FiMaximize className="text-primary" /> {room.size}
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span className="flex items-center gap-2">
                <FiUsers className="text-primary" /> {room.capacity} Guests
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span>{room.beds}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* ---------- LEFT: Details ---------- */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-10"
          >
            {/* About the room */}
            <motion.div variants={fadeUp}>
              <p className="eyebrow mb-3">The Room</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-secondary mb-5">
                A Space to Unwind
              </h2>
              <div className="divider-gold !mx-0 !ml-0 !mb-6" />
              <p className="text-secondary/70 leading-relaxed text-base sm:text-lg font-light">
                {room.description}
              </p>
              <p className="text-secondary/60 leading-relaxed mt-4">
                Every detail has been considered — from the thread count of the linens to the
                curated artwork on the walls. Wake to soft morning light, order breakfast in bed,
                and let the world slow down just for you.
              </p>
            </motion.div>

            {/* Amenities grid */}
            <motion.div variants={fadeUp}>
              <p className="eyebrow mb-3">In-Room Amenities</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-secondary mb-6">
                Everything You Need
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_16px_0_rgba(15,15,15,0.04)]"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                      <FiCheck size={14} />
                    </span>
                    <span className="text-secondary/80 text-sm font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Policies */}
            <motion.div variants={fadeUp}>
              <p className="eyebrow mb-3">Good to Know</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-secondary mb-6">
                House Policies
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Check-in', value: '3:00 PM onwards' },
                  { title: 'Check-out', value: 'Until 12:00 PM' },
                  { title: 'Cancellation', value: 'Free up to 48 hours' },
                  { title: 'Children', value: 'All ages welcome' },
                ].map((p) => (
                  <div
                    key={p.title}
                    className="glass-card rounded-xl p-4"
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase text-secondary/50 mb-1">
                      {p.title}
                    </p>
                    <p className="text-secondary font-medium text-sm">{p.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT: Sticky Booking Card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            <div className="lg:sticky lg:top-28">
              <div className="relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.12)] p-6 sm:p-8 overflow-hidden">
                {/* Gold top accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

                <p className="text-[10px] tracking-[0.25em] uppercase text-secondary/50 mb-2">
                  Starting From
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-4xl sm:text-5xl text-secondary font-medium">
                    {formatINR(room.price)}
                  </span>
                </div>
                <p className="text-xs text-secondary/50 tracking-wide mb-6">
                  per night · taxes extra
                </p>

                <div className="divider-gold !mx-0 !ml-0 !my-6" />

                {/* Quick facts */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-secondary/70">
                    <FiMaximize className="text-primary" /> {room.size}
                  </div>
                  <div className="flex items-center gap-2 text-secondary/70">
                    <FiUsers className="text-primary" /> {room.capacity} Guests
                  </div>
                </div>

                <Link
                  to="/booking"
                  className="btn-primary w-full !justify-center block text-center"
                >
                  <span>Reserve This Room</span>
                </Link>

                <p className="text-[11px] text-center text-secondary/50 mt-4 leading-relaxed">
                  Free cancellation up to 48 hours before check-in
                </p>

                {/* Trust strip */}
                <div className="mt-6 pt-6 border-t border-secondary/10 flex items-center justify-center gap-4 text-[10px] uppercase tracking-wider text-secondary/40">
                  <span>Secure Booking</span>
                  <span className="w-1 h-1 rounded-full bg-secondary/20" />
                  <span>Best Rate</span>
                  <span className="w-1 h-1 rounded-full bg-secondary/20" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== AVAILABILITY FORM ==================== */}
      <section className="px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-4xl mx-auto text-center mb-10"
        >
          <p className="eyebrow mb-3">Reserve</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-secondary mb-3">
            Check Availability
          </h2>
          <div className="divider-gold" />
          <p className="section-subtitle">
            Select your dates and we'll confirm within the hour.
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </section>

      {/* ==================== SIMILAR ROOMS ==================== */}
      {similar.length > 0 && (
        <section className="px-4 pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-12"
            >
              <p className="eyebrow mb-3">You May Also Like</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-secondary mb-3">
                Other Rooms
              </h2>
              <div className="divider-gold" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {similar.map((r) => (
                <motion.div key={r.id} variants={fadeUp}>
                  <Link to={`/rooms/${r.id}`} className="block group">
                    <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(15,15,15,0.06)] hover:shadow-[0_20px_60px_0_rgba(201,169,97,0.25)] hover:-translate-y-1 transition-all duration-500">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={r.image}
                          alt={r.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5">
                          <h3 className="font-serif text-xl font-medium text-white">
                            {r.name}
                          </h3>
                        </div>
                        <div className="absolute top-4 right-4 glass-dark rounded-full px-3 py-1.5 text-primary text-xs font-serif font-semibold">
                          {formatINR(r.price)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RoomDetails;