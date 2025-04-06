import { FaLock } from "react-icons/fa6";
import {
  IoIosArrowDown,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import CollapseYAnimation from "../components/CollapseYAnimation";
import { useEffect, useState } from "react";
const openDropDownEnum = {
  ProfilePhoto: "ProfilePhoto",
  Status: "Status",
  Groups: "Groups",
};
const EditPrivacyForm = ({ isOpenMenu, onSetEditMenu }) => {
  const [openDropdown, setOpenDropdown] = useState("");
  const selectionValues = ["Everyone", "Selected", "Nobody"];

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) {
      setOpenDropdown("");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenDropDown = (menu) => {
    setOpenDropdown(openDropdown === menu ? "" : menu);
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
            <div className="cursor-pointer relative border border-[var(--cl-snd-300)] w-[7rem] rounded">
              <div
                className="flex items-center justify-between p-1 dropdown"
                onClick={() =>
                  handleOpenDropDown(openDropDownEnum.ProfilePhoto)
                }
              >
                <span className="text-[0.8rem]">Everyone</span>
                <IoIosArrowDown />
              </div>

              <div className="absolute left-0 top-[1.8rem] z-10 bg-white w-full dropdown">
                <CollapseYAnimation
                  isOpen={openDropdown === openDropDownEnum.ProfilePhoto}
                >
                  <div className="grid gap-1 p-1  text-[0.8rem] border border-[var(--cl-snd-200)] rounded">
                    {selectionValues.map((v) => (
                      <span
                        className="p-1 hover:bg-[var(--cl-snd-200)]"
                        key={`${v} profile photo`}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </CollapseYAnimation>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-slate-600">
            <span className="text-[0.8rem]">Status</span>
            <div className="cursor-pointer relative border border-[var(--cl-snd-300)] w-[7rem] rounded">
              <div
                className="flex items-center justify-between p-1 dropdown"
                onClick={() => handleOpenDropDown(openDropDownEnum.Status)}
              >
                <span className="text-[0.8rem]">Everyone</span>
                <IoIosArrowDown />
              </div>

              <div className="absolute left-0 top-[1.8rem] z-10 bg-white w-full dropdown">
                <CollapseYAnimation
                  isOpen={openDropdown === openDropDownEnum.Status}
                >
                  <div className="grid gap-1 p-1  text-[0.8rem] border border-[var(--cl-snd-200)] rounded">
                    {selectionValues.map((v) => (
                      <span
                        className="p-1 hover:bg-[var(--cl-snd-200)]"
                        key={`${v} Status`}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </CollapseYAnimation>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-slate-600">
            <span className="text-[0.8rem]">Groups</span>
            <div className="cursor-pointer relative border border-[var(--cl-snd-300)] w-[7rem] rounded">
              <div
                className="flex items-center justify-between p-1 dropdown"
                onClick={() => handleOpenDropDown(openDropDownEnum.Groups)}
              >
                <span className="text-[0.8rem]">Everyone</span>
                <IoIosArrowDown />
              </div>

              <div className="absolute left-0 top-[1.8rem] w-full z-10 bg-white dropdown">
                <CollapseYAnimation
                  isOpen={openDropdown === openDropDownEnum.Groups}
                >
                  <div className="grid gap-1 p-1 text-[0.8rem] border border-[var(--cl-snd-200)] rounded">
                    {selectionValues.map((v) => (
                      <span
                        className="p-1 hover:bg-[var(--cl-snd-200)]"
                        key={`${v} Groups`}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </CollapseYAnimation>
              </div>
            </div>
          </div>

          <div className="inline-flex gap-2">
            <div className="relative inline-block w-11 h-5">
              <input
                id="switch-Last seen"
                type="checkbox"
                className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
              />
              <label
                for="switch-Last seen"
                className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
              ></label>
            </div>

            <label
              for="switch-Last seen"
              className="text-slate-600 text-sm cursor-pointer"
            >
              <div>
                <p className="text-slate-500">Last seen</p>
              </div>
            </label>
          </div>

          <div className="inline-flex gap-2">
            <div className="relative inline-block w-11 h-5">
              <input
                id="switch-Read receipts"
                type="checkbox"
                className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
              />
              <label
                for="switch-Read receipts"
                className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
              ></label>
            </div>

            <label
              for="switch-Read receipts"
              className="text-slate-600 text-sm cursor-pointer"
            >
              <div>
                <p className="text-slate-500">Read receipts</p>
              </div>
            </label>
          </div>
        </div>
      </CollapseYAnimation>
    </div>
  );
};

export default EditPrivacyForm;
