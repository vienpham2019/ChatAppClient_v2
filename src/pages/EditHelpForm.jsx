import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import CollapseYAnimation from "../components/CollapseYAnimation";
import { FaQuestionCircle } from "react-icons/fa";

const EditHelpForm = ({ isOpenMenu, onSetEditMenu }) => {
  return (
    <div className="grid gap-[1rem] mb-3 border-b border-[var(--cl-snd-200)] p-[1rem]">
      <div
        className="cursor-pointer items-center flex justify-between"
        onClick={onSetEditMenu}
      >
        <div className="flex items-center gap-[1rem]">
          <div className="p-[0.5rem] text-[0.8rem] bg-[var(--cl-prim-200)] rounded text-[var(--cl-prim-500)]">
            <FaQuestionCircle />
          </div>
          <h3 className="text-xs font-semibold text-gray-500">Help</h3>
        </div>
        {isOpenMenu ? (
          <IoMdArrowDropup className="text-[1.3rem]" />
        ) : (
          <IoMdArrowDropdown className="text-[1.3rem]" />
        )}
      </div>
      <CollapseYAnimation isOpen={isOpenMenu}>
        <div className="grid gap-[1rem] text-[0.8rem] text-[var(--cl-snd-600)]">
          <span className="cursor-pointer hover:underline">FAQs</span>
          <span className="cursor-pointer hover:underline">Contact</span>
          <span className="cursor-pointer hover:underline">
            Terms & Privacy policy
          </span>
        </div>
      </CollapseYAnimation>
    </div>
  );
};

export default EditHelpForm;
