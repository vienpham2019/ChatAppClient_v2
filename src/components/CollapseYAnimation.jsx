import { motion, AnimatePresence } from "framer-motion";
const CollapseYAnimation = ({ isOpen, children }) => {
  const initVariants = {
    open: { height: "auto", scaleY: 1, opacity: 1 },
    closed: { height: 0, scaleY: 0, opacity: 0 },
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

export default CollapseYAnimation;
