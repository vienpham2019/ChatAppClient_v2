import { IoIosArrowDown } from "react-icons/io";
import { getUniqueNum } from "../helper";
import { PopoverBtn, PopoverMenu } from "./PopOver";
const DropDown = ({
  selected,
  selections,
  onSelect,
  maxHeight = "max-h-[7rem]",
  minWidth = "min-w-[7rem]",
}) => {
  const popoverId = getUniqueNum();

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div
      className={`cursor-pointer border border-[var(--cl-snd-300)] rounded ${minWidth}`}
    >
      <PopoverBtn
        id={popoverId}
        className={"flex items-center justify-between p-1 w-full"}
      >
        <span className="text-[0.8rem] overflow-hidden w-[85%] flex items-start">
          {selected}
        </span>
        <IoIosArrowDown />
      </PopoverBtn>

      <PopoverMenu
        id={popoverId}
        className={`popover-bottom-left z-1 bg-white rounded border border-[var(--cl-snd-200)] ${minWidth}`}
      >
        <div
          className={`grid gap-1 p-1 text-[0.8rem] ${maxHeight} overflow-y-auto`}
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
      </PopoverMenu>
    </div>
  );
};

export default DropDown;
