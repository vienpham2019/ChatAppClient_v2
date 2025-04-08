import { FaLock } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import CollapseYAnimation from "../components/CollapseYAnimation";
import { useState } from "react";
import DropDown from "../components/DropDown";
import Switch from "../components/Switch";

const formDataEnum = {
  ProfilePhoto: "ProfilePhoto",
  Status: "Status",
  Groups: "Groups",
  LastSeen: "LastSeen",
  ReadReceipts: "ReadReceipts",
};
const EditPrivacyForm = ({ isOpenMenu, onSetEditMenu }) => {
  const selectionValues = ["Everyone", "Selected", "Nobody"];
  const [formData, setFormData] = useState({
    [formDataEnum.ProfilePhoto]: "Everyone",
    [formDataEnum.Status]: "Everyone",
    [formDataEnum.Groups]: "Everyone",
    [formDataEnum.LastSeen]: true,
    [formDataEnum.ReadReceipts]: true,
  });

  const handleOnChange = ({ name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid gap-[1rem] mb-3 border-b border-[var(--cl-snd-200)] p-[1rem]">
      <div
        className="cursor-pointer items-center flex justify-between"
        onClick={onSetEditMenu}
      >
        <div className="flex items-center gap-[1rem]">
          <div className="p-[0.5rem] text-[0.6rem] bg-[var(--cl-prim-200)] rounded text-[var(--cl-prim-500)]">
            <FaLock />
          </div>
          <h3 className="text-xs font-semibold text-gray-500">Privacy</h3>
        </div>
        {isOpenMenu ? (
          <IoMdArrowDropdown className="text-[1.3rem]" />
        ) : (
          <IoMdArrowDropup className="text-[1.3rem]" />
        )}
      </div>
      <CollapseYAnimation isOpen={isOpenMenu}>
        <div className="p-4 pt-0 grid gap-3">
          <h3 className="text-[var(--cl-snd-500)]">
            Who can see my personal info
          </h3>
          <div className="flex justify-between items-center text-slate-600">
            <span className="text-[0.8rem]">Profile photo</span>
            <DropDown
              selected={formData[formDataEnum.ProfilePhoto]}
              selections={selectionValues}
              width={"7rem"}
              onSelect={(value) =>
                handleOnChange({ name: formDataEnum.ProfilePhoto, value })
              }
            />
          </div>

          <div className="flex justify-between items-center text-slate-600">
            <span className="text-[0.8rem]">Status</span>
            <DropDown
              selected={formData[formDataEnum.Status]}
              selections={selectionValues}
              width={"7rem"}
              onSelect={(value) =>
                handleOnChange({ name: formDataEnum.Status, value })
              }
            />
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span className="text-[0.8rem]">Groups</span>
            <DropDown
              selected={formData[formDataEnum.Groups]}
              selections={selectionValues}
              width={"7rem"}
              onSelect={(value) =>
                handleOnChange({ name: formDataEnum.Groups, value })
              }
            />
          </div>

          <Switch
            lable={"Last seen"}
            checked={formData[formDataEnum.LastSeen]}
            onChecked={() =>
              handleOnChange({
                name: formDataEnum.LastSeen,
                value: !formData[formDataEnum.LastSeen],
              })
            }
          />

          <Switch
            lable={"Read receipts"}
            checked={formData[formDataEnum.ReadReceipts]}
            onChecked={() =>
              handleOnChange({
                name: formDataEnum.ReadReceipts,
                value: !formData[formDataEnum.ReadReceipts],
              })
            }
          />
        </div>
      </CollapseYAnimation>
    </div>
  );
};

export default EditPrivacyForm;
