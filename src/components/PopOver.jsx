import { useEffect, useRef, useState } from "react";
import CollapseYAnimation from "./CollapseYAnimation";

export const PopoverBtn = ({ id, style = {}, className = "", children }) => {
  return (
    <button
      style={{ anchorName: `--${id}-button`, ...style }}
      popoverTarget={id + "dropdown"}
      anchor={id + "button"}
      id={id + "button"}
      className={"cursor-pointer " + className}
    >
      {children}
    </button>
  );
};

// const PopoverMenu = ({ id, className = "", children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const popoverRef = useRef();
//   useEffect(() => {
//     const popover = popoverRef.current;

//     const handleToggle = () => {
//       setIsOpen(popover.matches(":popover-open"));
//     };

//     popover.addEventListener("toggle", handleToggle);

//     return () => {
//       popover.removeEventListener("toggle", handleToggle);
//     };
//   }, []);
//   return (
//     <div
//       ref={popoverRef}
//       style={{ positionAnchor: `--${id}-button` }}
//       id={id + "dropdown"}
//       popover="auto"
//       className={className}
//     >
//       <CollapseYAnimation isOpen={isOpen}>{children}</CollapseYAnimation>
//     </div>
//   );
// };

// export { PopoverBtn, PopoverMenu };

import { Popover } from "react-tiny-popover";

export const PopoverMenu = ({
  isOpen,
  setIsOpen,
  positions = ["bottom", "top"],
  padding = 1,
  reposition = true,
  onClickOutside = () => setIsOpen(false),
  content,
  children,
}) => {
  return (
    <Popover
      isOpen={isOpen}
      positions={positions} // if you'd like, you can limit the positions
      padding={padding} // adjust padding here!
      reposition={reposition} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
      onClickOutside={onClickOutside} // handle click events outside of the popover/target here!
      content={content}
    >
      {children}
    </Popover>
  );
};
