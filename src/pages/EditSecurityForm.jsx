import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import CollapseYAnimation from "../components/CollapseYAnimation";
import { useState } from "react";
import Switch from "../components/Switch";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
const formDataEnum = {
  ShowSecurityNotification: "ShowSecurityNotification",
};
const EditSecurityForm = ({ isOpenMenu, onSetEditMenu }) => {
  const [formData, setFormData] = useState({
    [formDataEnum.ShowSecurityNotification]: true,
  });
  return (
    <div className="grid gap-[1rem] mb-3 border-b border-[var(--cl-snd-200)] p-[1rem]">
      <div
        className="cursor-pointer items-center flex justify-between"
        onClick={onSetEditMenu}
      >
        <div className="flex items-center gap-[1rem]">
          <div className="p-[0.5rem] text-[0.6rem] bg-[var(--cl-prim-200)] rounded text-[var(--cl-prim-500)]">
            <IoShieldCheckmarkSharp />
          </div>
          <h3 className="text-xs font-semibold text-gray-500">Secutiry</h3>
        </div>
        {isOpenMenu ? (
          <IoMdArrowDropup className="text-[1.3rem]" />
        ) : (
          <IoMdArrowDropdown className="text-[1.3rem]" />
        )}
      </div>
      <CollapseYAnimation isOpen={isOpenMenu}>
        <Switch
          lable={"Show Security Notification"}
          checked={formData[formDataEnum.ShowSecurityNotification]}
          onChecked={() =>
            handleOnChange({
              name: formDataEnum.ShowSecurityNotification,
              value: !formData[formDataEnum.ShowSecurityNotification],
            })
          }
        />
      </CollapseYAnimation>
    </div>
  );
};

export default EditSecurityForm;
