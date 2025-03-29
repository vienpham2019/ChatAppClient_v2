import { AnimatePresence, motion } from "framer-motion";

const SlideYAnimation = ({ isOpen, children }) => {
  const initVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: -300, opacity: 0 },
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={initVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideYAnimation;
