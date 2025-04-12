import { useEffect, useRef } from "react";

const ClickOutside = ({ onClose, children }) => {
  const menuRef = useRef();
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !e.target.closest(".more-btn")
    ) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return <div ref={menuRef}>{children}</div>;
};

export default ClickOutside;
