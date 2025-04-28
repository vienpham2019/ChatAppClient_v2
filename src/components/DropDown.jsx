import { IoIosArrowDown } from "react-icons/io";
import { PopoverMenu } from "./PopOver";
import { useState } from "react";
import { getUniqueNum } from "../helper";
import CollapseYAnimation from "./CollapseYAnimation";
const DropDown = ({
  selected,
  selections,
  onSelect,
  maxHeight = "max-h-[7rem]",
  minWidth = "min-w-[7rem]",
}) => {
  const uniqueId = getUniqueNum();
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const handleSelect = (value) => {
    onSelect(value);
    setIsPopOverOpen(false);
  };

  return (
    <div
      className={`cursor-pointer border border-[var(--cl-snd-300)] rounded ${minWidth}`}
    >
      <PopoverMenu
        isOpen={isPopOverOpen}
        setIsOpen={setIsPopOverOpen}
        content={
          <CollapseYAnimation isOpen={isPopOverOpen}>
            <div
              className={`grid gap-1 p-1 text-[0.8rem] ${maxHeight} overflow-y-auto bg-white ${minWidth} border  border-[var(--cl-snd-200)]`}
            >
              {selections.map((v) => (
                <span
                  onClick={() => handleSelect(v)}
                  className={`cursor-pointer p-1 hover:bg-[var(--cl-snd-200)] ${
                    selected === v && "bg-[var(--cl-snd-300)]"
                  }`}
                  key={`${v}-${uniqueId}`}
                >
                  {v}
                </span>
              ))}
            </div>
          </CollapseYAnimation>
        }
      >
        <div
          className="flex items-center justify-between p-1 w-full"
          onClick={() => setIsPopOverOpen(true)}
        >
          <span className="text-[0.8rem] overflow-hidden w-[85%] flex items-start">
            {selected}
          </span>
          <IoIosArrowDown />
        </div>
      </PopoverMenu>
    </div>
  );
};

export default DropDown;
