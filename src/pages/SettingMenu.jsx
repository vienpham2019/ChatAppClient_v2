import { FaCameraRotate, FaPen } from "react-icons/fa6";
import Tooltip from "../components/Tooltip";

import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

const SettingMenu = () => {
  const settingMenuEmum = {
    PersonalMenu: "PersonalMenu",
    PrivacyMenu: "PrivacyMenu",
    SecurityMenu: "SecurityMenu",
  };
  const [openSettingMenu, setOpenSettingMenu] = useState(
    settingMenuEmum.PersonalMenu
  );

  return (
    <div className="flex flex-col w-72 bg-white border-r border-[var(--cl-snd-200)] overflow-y-auto h-screen">
      <div className="relative flex justify-between h-[10rem]">
        <div className="flex justify-between w-full z-1 bg-black/50 px-4 py-2">
          <h1 className="text-xl text-white font-medium">Settings</h1>
          <button className="cursor-pointer flex md:w-auto w-[3.5rem]">
            <Tooltip text={"Change Background"} dir={"left"}>
              <span className="flex items-center justify-center h-[2rem] text-[0.7rem] aspect-square rounded-full bg-white">
                <FaPen />
              </span>
            </Tooltip>
          </button>
        </div>

        <div className="w-full h-[5rem] absolute -bottom-[3rem] z-[1] flex justify-center">
          <div className="relative">
            <img
              className="w-[5rem] aspect-square rounded-full border-[0.3rem] border-white"
              src="https://i.pravatar.cc/150?img=9"
              alt="Profile Avatar"
            />
            <div className="absolute -bottom-[0.4rem] -right-[0.2rem]">
              <Tooltip text={"Change Avatar"} dir={"bottom"}>
                <span className="flex items-center justify-center p-[0.5rem] cursor-pointer bg-[var(--cl-snd-200)] rounded-full">
                  <FaCameraRotate className="h-[1rem]" />
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://themesdesign.in/chaton/layouts/assets/images/small/img-1.jpg"
            alt="Social Media Background"
            width={400}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="border-t border-[var(--cl-snd-200)] py-[1rem] mt-[4rem]">
        <EditProfileForm />
      </div>
    </div>
  );
};

export default SettingMenu;
