import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/shorewood-logo.png";

const navItems = [
  { label: "The Vision", path: "/the-vision" },
  { label: "Residences", path: "/residences" },
  { label: "Gallery", path: "/gallery" },
  { label: "Location", path: "/location" },
  { label: "About Us", path: "/about" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-secondary/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container-main flex items-center justify-between py-4 md:py-5">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Shorewood Homes" className="h-5 md:h-6 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`eyebrow transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-brand-limestone"
                    : "text-brand-limestone/70 hover:text-brand-limestone"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            className="btn-outline-gold border-brand-limestone/30 text-brand-limestone hover:bg-brand-limestone/10 text-xs hidden md:inline-block"
          >
            Register Interest
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-brand-limestone/80"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-secondary flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-main flex items-center justify-between py-4">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Shorewood Homes" className="h-5 w-auto" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-brand-limestone/80"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={item.path}
                    className={`font-display text-2xl uppercase tracking-[0.2em] transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-brand-limestone"
                        : "text-brand-limestone/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-4"
              >
                <Link
                  to="/contact"
                  className="btn-outline-gold border-brand-limestone/30 text-brand-limestone hover:bg-brand-limestone/10 text-xs"
                >
                  Register Interest
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
