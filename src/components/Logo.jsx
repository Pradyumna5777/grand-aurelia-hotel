const Logo = ({ variant = 'dark', size = 'md', showText = true }) => {
  // variant: 'dark' (for light backgrounds) | 'light' (for dark backgrounds)
  // size:    'sm' | 'md' | 'lg'

  const sizes = {
    sm: { mark: 28, text: 'text-lg' },
    md: { mark: 36, text: 'text-xl' },
    lg: { mark: 48, text: 'text-3xl' },
  };

  const textColor = variant === 'dark' ? 'text-secondary' : 'text-white';

  return (
    <div className="flex items-center gap-3">
      {/* Mark */}
      <svg
        width={sizes[size].mark}
        height={sizes[size].mark}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0C68B" />
            <stop offset="50%" stopColor="#C9A961" />
            <stop offset="100%" stopColor="#A8894A" />
          </linearGradient>
        </defs>

        {/* Rounded square badge */}
        <rect width="64" height="64" rx="14" fill="#0F0F0F" />
        <rect
          x="1.25"
          y="1.25"
          width="61.5"
          height="61.5"
          rx="12.75"
          stroke="url(#logoGold)"
          strokeWidth="1"
          opacity="0.55"
        />

        {/* Monogram A */}
        <path d="M32 12 L42 46 H38 L32 24 L26 46 H22 Z" fill="url(#logoGold)" />
        <rect x="24" y="34" width="16" height="2.5" rx="1.25" fill="url(#logoGold)" />

        {/* Crown dots */}
        <circle cx="32" cy="9" r="1.6" fill="url(#logoGold)" />
        <circle cx="26" cy="11" r="1.1" fill="url(#logoGold)" opacity="0.8" />
        <circle cx="38" cy="11" r="1.1" fill="url(#logoGold)" opacity="0.8" />

        {/* Baseline */}
        <rect
          x="20"
          y="48"
          width="24"
          height="1.5"
          rx="0.75"
          fill="url(#logoGold)"
          opacity="0.7"
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-logo ${sizes[size].text} ${textColor} font-semibold tracking-[0.02em]`}
            style={{ fontFamily: "'Comfortaa', sans-serif" }}
          >
            Aurelia
          </span>
          <span
            className={`text-[9px] tracking-[0.45em] uppercase mt-0.5 ${
              variant === 'dark' ? 'text-secondary/40' : 'text-white/40'
            }`}
            style={{ fontFamily: "'Gruppo', sans-serif" }}
          >
            Grand Hotel
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;