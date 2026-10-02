import { Link } from 'react-router-dom';
import { FiUsers, FiMaximize, FiArrowRight } from 'react-icons/fi';

// Currency formatter — Indian number system (12,500 / 1,25,000)
const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

const RoomCard = ({ room }) => {
  return (
    <div className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(15,15,15,0.08)] hover:shadow-[0_20px_60px_0_rgba(201,169,97,0.25)] hover:-translate-y-2 transition-all duration-500 ease-out">
      {/* Image */}
      <div className="relative overflow-hidden h-64 sm:h-72">
        <img
          src={room.image}
          alt={room.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Price glass badge — ₹ format */}
        <div className="absolute top-4 right-4 glass-dark rounded-full px-4 py-2 flex items-baseline gap-1.5">
          <span className="text-primary font-serif text-lg font-semibold leading-none">
            {formatINR(room.price)}
          </span>
          <span className="text-white/70 text-[10px] tracking-wider uppercase">/night</span>
        </div>

        {/* Room name overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="font-serif text-2xl font-medium text-white drop-shadow-lg">
            {room.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-secondary/60 text-sm mb-5 line-clamp-2 leading-relaxed">
          {room.description}
        </p>

        <div className="flex items-center gap-5 text-xs text-secondary/70 mb-6 pb-5 border-b border-secondary/10">
          <span className="flex items-center gap-1.5">
            <FiMaximize className="text-primary" /> {room.size}
          </span>
          <span className="flex items-center gap-1.5">
            <FiUsers className="text-primary" /> {room.capacity} Guests
          </span>
        </div>

        <Link
          to={`/rooms/${room.id}`}
          className="group/link inline-flex items-center gap-2 text-secondary text-sm font-medium tracking-wider uppercase"
        >
          <span className="border-b border-primary pb-0.5">View Details</span>
          <FiArrowRight className="text-primary group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;