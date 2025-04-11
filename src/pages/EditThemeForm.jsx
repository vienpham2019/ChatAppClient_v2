import { BsDropletFill, BsDropletHalf } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import CollapseYAnimation from "../components/CollapseYAnimation";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

const EditThemeForm = ({ isOpenMenu, onSetEditMenu }) => {
  const themesColors = ["#ffffff", "#68ff00", "#ff1b00", "#00ffe4", "#00b9ff"];
  const themesImages = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
  const [selectColor, setSelectColor] = useState("#ffffff");
  const [selectImage, setSelectImage] = useState("#ffffff");
  return (
    <div className="grid gap-[1rem] mb-3 border-b border-[var(--cl-snd-200)] p-[1rem]">
      <div
        className="cursor-pointer items-center flex justify-between"
        onClick={onSetEditMenu}
      >
        <div className="flex items-center gap-[1rem]">
          <div className="p-[0.5rem] text-[0.8rem] bg-[var(--cl-prim-200)] rounded text-[var(--cl-prim-500)]">
            <BsDropletFill />
          </div>
          <h3 className="text-xs font-semibold text-gray-500">Themes</h3>
        </div>
        {isOpenMenu ? (
          <IoMdArrowDropdown className="text-[1.3rem]" />
        ) : (
          <IoMdArrowDropup className="text-[1.3rem]" />
        )}
      </div>
      <CollapseYAnimation isOpen={isOpenMenu}>
        <div className="grid gap-[1rem]">
          <div className="grid gap-[1rem] text-[0.8rem] text-[var(--cl-snd-600)]">
            <span>Choose Theme Color :</span>
            <div className="flex flex-wrap gap-[1rem]">
              {themesColors.map((color, _) => {
                return (
                  <div
                    key={"themeColor-" + color}
                    style={{ background: color }}
                    onClick={() => setSelectColor(color)}
                    className="border border-gray-500 text-gray-500 flex items-center justify-center cursor-pointer w-[1.5rem] aspect-square rounded-full"
                  >
                    {selectColor === color && <FaCheck />}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-[1rem] text-[0.8rem] text-[var(--cl-snd-600)]">
            <span>Choose Theme Image :</span>
            <div className="flex flex-wrap gap-[1rem]">
              {themesImages.map((color, _) => {
                return (
                  <div
                    key={"themeImage-" + color}
                    style={{ background: color }}
                    onClick={() => setSelectImage(color)}
                    className="border border-gray-500 text-gray-500 flex items-center justify-center cursor-pointer w-[1.5rem] aspect-square rounded-full"
                  >
                    {selectImage === color && <FaCheck />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CollapseYAnimation>
    </div>
  );
};

export default EditThemeForm;
