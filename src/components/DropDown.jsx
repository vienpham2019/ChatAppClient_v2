import { IoIosArrowDown } from "react-icons/io";
import CollapseYAnimation from "./CollapseYAnimation";
import { useEffect, useRef, useState } from "react";

const DropDown = ({
  selected,
  selections,
  onSelect,
  height = "7rem",
  width = "7rem",
}) => {
  const popoverId = Math.random().toString(36).substring(2, 9);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };
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
      className={`cursor-pointer border border-[var(--cl-snd-300)] rounded w-[${width}]`}
    >
      <button
        style={{ anchorName: `--${popoverId}-button` }}
        className="flex items-center justify-between p-1 w-full"
        popoverTarget={popoverId + "dropdown"}
        anchor={popoverId + "button"}
        id={popoverId + "button"}
      >
        <span className="text-[0.8rem] overflow-hidden w-[85%] flex items-start">
          {selected}
        </span>
        <IoIosArrowDown />
      </button>

      <div
        ref={popoverRef}
        style={{ positionAnchor: `--${popoverId}-button` }}
        id={popoverId + "dropdown"}
        popover="auto"
        className={`bottom-left z-1 bg-white rounded border border-[var(--cl-snd-200)] min-w-[${width}]`}
      >
        <CollapseYAnimation isOpen={isOpen}>
          <div
            className={`grid gap-1 p-1 text-[0.8rem] max-h-[${height}] overflow-y-auto`}
          >
            {selections.map((v) => (
              <span
                onClick={() => handleSelect(v)}
                className={`p-1 hover:bg-[var(--cl-snd-200)] ${
                  selected === v && "bg-[var(--cl-snd-300)]"
                }`}
                key={`${v}-${popoverId}`}
              >
                {v}
              </span>
            ))}
          </div>
        </CollapseYAnimation>
      </div>
    </div>
  );
};

export default DropDown;
