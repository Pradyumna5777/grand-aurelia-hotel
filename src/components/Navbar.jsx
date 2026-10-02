import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import { hotelInfo } from '../data/hotelData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll(); // run once on mount — fixes page-load flicker
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/rooms', label: 'Rooms' },
    { to: '/amenities', label: 'Amenities' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isHome = location.pathname === '/';

  /**
   * The navbar is only "transparent/overlay" when we're on the home page
   * hero AND the user hasn't scrolled. In EVERY other case, we show the
   * light frosted glass panel — which guarantees dark text is always legible.
   */
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? 'py-5 bg-transparent'
            : 'py-3 bg-white/75 backdrop-blur-xl saturate-180 border-b border-white/50 shadow-[0_8px_32px_0_rgba(15,15,15,0.08)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4">
            {/* ============ LOGO ============ */}
            <Link
              to="/"
              aria-label={`${hotelInfo.name} — home`}
              className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
              <Logo variant={isTransparent ? 'light' : 'dark'} size="md" />
            </Link>

            {/* ============ DESKTOP NAV LINKS ============ */}
            <div
              className={`hidden lg:flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
                isTransparent
                  ? 'bg-white/10 backdrop-blur-md border border-white/20'
                  : 'bg-transparent'
              }`}
            >
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => {
                    // Active state
                    if (isActive) {
                      return isTransparent
                        ? 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white/20 text-white'
                        : 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-primary/15 text-primary-dark';
                    }
                    // Inactive state
                    return isTransparent
                      ? 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-white/90 hover:text-white hover:bg-white/10'
                      : 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-secondary/80 hover:text-secondary hover:bg-secondary/5';
                  }}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* ============ DESKTOP CTA ============ */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/booking"
                className={`text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 px-5 py-3 rounded-full ${
                  isTransparent
                    ? 'text-white border border-white/40 hover:bg-white hover:text-secondary backdrop-blur-md'
                    : 'bg-gradient-to-r from-primary to-primary-dark text-secondary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5'
                }`}
              >
                Reserve
              </Link>
            </div>

            {/* ============ MOBILE TOGGLE ============ */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className={`lg:hidden relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-400 ${
                isTransparent
                  ? 'bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20'
                  : 'bg-secondary/5 border border-secondary/10 text-secondary hover:bg-secondary/10'
              } ${
                isOpen && isTransparent
                  ? '!bg-white/25 !border-white/50 !text-white'
                  : ''
              } ${
                isOpen && !isTransparent
                  ? '!bg-primary/15 !border-primary/30 !text-primary-dark'
                  : ''
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ============ MOBILE MENU ============ */}
      <div
        className={`lg:hidden fixed inset-x-3 top-20 z-40 transition-all duration-500 origin-top ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="glass-card p-6 rounded-2xl shadow-[0_20px_60px_0_rgba(15,15,15,0.15)]">
          {/* Mobile logo repeat */}
          <div className="flex justify-center pb-5 mb-4 border-b border-secondary/10">
            <Logo variant="dark" size="md" />
          </div>

          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-primary/15 text-primary-dark'
                      : 'text-secondary hover:bg-secondary/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link to="/booking" className="mt-3 btn-primary text-center text-sm">
              <span>Reserve Now</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;