import { FiStar } from 'react-icons/fi';

const TestimonialCard = ({ testimonial }) => (
  <div className="group h-full flex flex-col bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(15,15,15,0.08)] hover:shadow-[0_20px_60px_0_rgba(201,169,97,0.2)] hover:-translate-y-1 transition-all duration-500">
    {testimonial.stayImage && (
      <div className="relative h-40 overflow-hidden">
        <img
          src={testimonial.stayImage}
          alt="Guest stay"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    )}
    <div className="p-6 sm:p-8 flex-1 flex flex-col">
      <div className="flex gap-1 mb-5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FiStar key={i} className="fill-primary text-primary w-4 h-4" />
        ))}
      </div>
      <p className="text-secondary/80 italic mb-6 leading-relaxed flex-1 font-light text-[15px]">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-4 pt-5 border-t border-secondary/10">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30 ring-offset-2 ring-offset-white/60"
          loading="lazy"
        />
        <div>
          <p className="font-medium text-secondary">{testimonial.name}</p>
          <p className="text-xs text-secondary/50 tracking-wide uppercase">
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;