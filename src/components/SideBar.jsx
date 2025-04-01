import { TiContacts } from "react-icons/ti";
import Logo from "../components/logo";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { MdMenu } from "react-icons/md";

import { FaRegCircleXmark } from "react-icons/fa6";
import SlideXAnimation from "./SlideXAnimation";
import Badge from "./Badge";
import ChatMenu from "../pages/ChatMenu";
import ContactMenu from "../pages/ContactMenu";

const SideBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuNotifications, setMenuNotifications] = useState({
    chats: 3,
    profile: 1,
  });
  const [selectedMenu, setSelectedMenu] = useState("chats");

  const menuIcons = {
    Profile: <FaRegUser className="text-[1.4rem]" />,
    Chats: <LuMessagesSquare className="text-[1.5rem]" />,
    Contacts: <TiContacts className="text-[1.7rem]" />,
    Setting: <IoSettingsOutline className="text-[1.7rem]" />,
  };

  const displayMenu = () => {
    return (
      <div className="flex flex-col w-[5rem] bg-[var(--cl-prim-100)] text-white items-center py-4 space-y-8">
        <div className="flex-shrink-0">
          <Logo isMobile={true} />
        </div>
        <div className="flex flex-col space-y-6 items-center">
          {Object.entries(menuIcons).map(([key, icon]) => (
            <button
              key={key + "side bar"}
              className={`${
                selectedMenu === key.toLocaleLowerCase() &&
                "bg-[var(--cl-prim-300)]"
              } relative border cursor-pointer w-[3rem] aspect-square text-[var(--cl-snd-600)] hover:text-white rounded-lg flex items-center justify-center`}
            >
              {icon}
              {menuNotifications[key.toLocaleLowerCase()] && (
                <Badge num={menuNotifications[key.toLocaleLowerCase()]} />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const displayMenuDetails = () => {
    return <ContactMenu />;
    // return <ChatMenu />;
  };

  return (
    <div className="flex">
      {!isMobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 z-50 p-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="relative w-[3rem] aspect-square bg-[var(--cl-prim-600)] text-white rounded-lg flex items-center justify-center"
          >
            <MdMenu className="text-[1rem]" />
          </button>
        </div>
      )}
      <div className="hidden md:flex">
        {displayMenu()}
        {displayMenuDetails()}
      </div>

      <SlideXAnimation isOpen={isMobileMenuOpen}>
        <div className="flex md:hidden relative">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="cursor-pointer absolute right-[1rem] p-[0.5rem] text-[var(--cl-snd-700)]"
          >
            <FaRegCircleXmark className="text-[1rem]" />
          </button>
          {displayMenu()}
          {displayMenuDetails()}
        </div>
      </SlideXAnimation>
    </div>
  );
};

export default SideBar;
