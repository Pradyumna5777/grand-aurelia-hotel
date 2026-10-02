import { FiArrowRight } from 'react-icons/fi';

const AmenityCard = ({ amenity }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(15,15,15,0.06)] hover:shadow-[0_24px_70px_0_rgba(201,169,97,0.28)] hover:-translate-y-2 transition-all duration-500 ease-out">
      {/* Image */}
      {amenity.image && (
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <img
            src={amenity.image}
            alt={amenity.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1400ms] ease-out"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/30 to-transparent" />

          {/* Floating glass icon */}
          <div className="absolute top-4 left-4 glass-dark rounded-2xl w-12 h-12 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
            {amenity.icon}
          </div>

          {/* Category pill */}
          {amenity.category && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-semibold tracking-[0.15em] uppercase text-white">
              {amenity.category}
            </div>
          )}

          {/* Title overlay on image bottom */}
          <div className="absolute bottom-4 left-5 right-5">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white drop-shadow-lg">
              {amenity.name}
            </h3>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 sm:p-6">
        <p className="text-secondary/65 text-sm leading-relaxed mb-5">
          {amenity.description}
        </p>

        {/* Hover CTA — reveals subtly */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] uppercase text-secondary/40 font-medium">
            Included with stay
          </span>
          <span className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-secondary transition-all duration-400">
            <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>

      {/* Gold hairline on hover */}
      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default AmenityCard;