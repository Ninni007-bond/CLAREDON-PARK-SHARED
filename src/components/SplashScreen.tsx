import { motion } from "framer-motion";
import logo from "@/assets/shorewood-logo.png";

const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="flex flex-col items-center"
      >
        <img src={logo} alt="Shorewood Homes" className="h-12 md:h-16 w-auto" />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
