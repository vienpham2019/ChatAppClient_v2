import { motion, AnimatePresence } from "framer-motion";
const CollapseXAnimation = ({ isOpen, children }) => {
  const initVariants = {
    open: { width: "auto", scaleX: 1, opacity: 1 },
    closed: { width: 0, scaleX: 0, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={initVariants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{ transformOrigin: "top" }}
          transition={{ duration: 0.3, ease: "easeInOut", originY: 1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CollapseXAnimation;
