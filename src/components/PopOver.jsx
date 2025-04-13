import { useEffect, useRef, useState } from "react";
import CollapseYAnimation from "./CollapseYAnimation";

const PopoverBtn = ({ id, className = "", children }) => {
  return (
    <button
      style={{ anchorName: `--${id}-button` }}
      popoverTarget={id + "dropdown"}
      anchor={id + "button"}
      id={id + "button"}
      className={"cursor-pointer " + className}
    >
      {children}
    </button>
  );
};

const PopoverMenu = ({ id, className = "", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef();
  useEffect(() => {
    const popover = popoverRef.current;

    const handleToggle = () => {
      setIsOpen(popover.matches(":popover-open"));
    };

    popover.addEventListener("toggle", handleToggle);

    return () => {
      popover.removeEventListener("toggle", handleToggle);
    };
  }, []);
  return (
    <div
      ref={popoverRef}
      style={{ positionAnchor: `--${id}-button` }}
      id={id + "dropdown"}
      popover="auto"
      className={className}
    >
      <CollapseYAnimation isOpen={isOpen}>{children}</CollapseYAnimation>
    </div>
  );
};

export { PopoverBtn, PopoverMenu };
