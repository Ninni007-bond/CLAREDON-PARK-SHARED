import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-clarendon.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-brand-blue/35" />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="eyebrow text-brand-limestone mb-5 sm:mb-7 text-[10px] sm:text-[11px]"
        >
          A Shorewood Homes Development
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-display font-normal text-3xl sm:text-5xl md:text-7xl lg:text-6xl text-brand-limestone uppercase"
          style={{ letterSpacing: "0.3em" }}
        >
          Clarendon Park
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="w-16 sm:w-20 h-px bg-brand-limestone/40 mt-6 sm:mt-8"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="eyebrow text-brand-limestone/70 mt-6 sm:mt-8 text-[10px] sm:text-[11px]"
        >
          A NEW STANDARD OF LIVING
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-10 sm:mt-14"
        >
          <button
            onClick={() => {
              setTransitioning(true);
              setTimeout(() => navigate("/the-vision"), 1100);
            }}
            className="border border-brand-limestone/30 text-brand-limestone hover:bg-brand-limestone hover:text-secondary font-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] px-7 py-3 transition-all duration-300"
          >
            Discover More
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-secondary flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-normal text-brand-limestone uppercase text-sm sm:text-base tracking-[0.4em]"
            >
              The Vision
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
