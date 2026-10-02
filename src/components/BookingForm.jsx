import { useState } from 'react';
import { FiCalendar, FiUser, FiCheck } from 'react-icons/fi';

const BookingForm = ({ compact = false }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white/80 backdrop-blur-2xl border border-white/70 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.12)] p-6 md:p-8"
    >
      {/* Gold top accent line */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4'}`}>
        <div>
          <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary/60 mb-2">
            Check-in
          </label>
          <input
            type="date"
            required
            className="w-full px-4 py-3 bg-white/60 border border-secondary/15 rounded-lg text-secondary text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary/60 mb-2">
            Check-out
          </label>
          <input
            type="date"
            required
            className="w-full px-4 py-3 bg-white/60 border border-secondary/15 rounded-lg text-secondary text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary/60 mb-2">
            Guests
          </label>
          <select className="w-full px-4 py-3 bg-white/60 border border-secondary/15 rounded-lg text-secondary text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all">
            {[1, 2, 3, 4].map((n) => (
              <option key={n}>
                {n} Guest{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full">
            {submitted ? (
              <span className="inline-flex items-center gap-2">
                <FiCheck /> Sent!
              </span>
            ) : (
              'Check Availability'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;