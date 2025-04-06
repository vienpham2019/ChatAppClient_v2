import { TiContacts } from "react-icons/ti";
import Logo from "../components/logo";
import { LuMessagesSquare } from "react-icons/lu";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { MdMenu, MdOutlineLogout, MdOutlineWbSunny } from "react-icons/md";
import { FaRegCircleXmark, FaRegMoon, FaRegUser } from "react-icons/fa6";
import SlideXAnimation from "./SlideXAnimation";
import Badge from "./Badge";
import ChatMenu from "../pages/ChatMenu";
import ContactMenu from "../pages/ContactMenu";
import NotificationMenu from "../pages/NotificationMenu";
import { IoIosNotificationsOutline } from "react-icons/io";
import ProfileMenu from "../pages/ProfileMenu";
import Avatar from "./Avatar";
import SettingMenu from "../pages/SettingMenu";
import Tooltip from "./Tooltip";

const SideBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuNotifications, setMenuNotifications] = useState({
    chats: 3,
    notification: 4,
  });
  const [selectedMenu, setSelectedMenu] = useState("setting");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const menuRef = useRef();

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !e.target.closest(".more-btn")
    ) {
      setShowProfileMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuIcons = {
    Chats: <LuMessagesSquare className="text-[1.5rem]" />,
    Contacts: <TiContacts className="text-[1.7rem]" />,
    Notification: <IoIosNotificationsOutline className="text-[1.7rem]" />,
    Setting: <IoSettingsOutline className="text-[1.7rem]" />,
  };

  const displayMenu = () => {
    return (
      <div className="flex flex-col w-[4rem] md:w-[5rem] bg-gradient-to-t from-[var(--cl-prim-500)] to-[var(--cl-prim-200)] text-white items-center py-4 space-y-8">
        <div className="flex-shrink-0">
          <Logo isMobile={true} />
        </div>
        <div className="flex flex-1 flex-col space-y-6 items-center justify-center">
          {Object.entries(menuIcons).map(([key, icon]) => (
            <div className="relative" key={key}>
              {selectedMenu === key.toLocaleLowerCase() && (
                <>
                  <div className="rounded-l-full absolute top-0 left-0 w-[4rem] h-[3rem] bg-white"></div>
                  <div className="absolute -top-[1rem] left-[2.5rem] md:left-[3rem] w-[1.3rem] rounded-full aspect-square  shadow-[inset_-7px_-7px_0px_-2px_rgb(255,255,255)]"></div>
                  <div className="absolute -bottom-[0.98rem] left-[2.5rem] md:left-[3rem] w-[1.3rem] rounded-full aspect-square shadow-[inset_-7px_7px_0px_-2px_rgb(255,255,255)]"></div>
                </>
              )}

              <Tooltip text={key} dir={"right"}>
                <button
                  key={key + "side bar"}
                  onClick={() => setSelectedMenu(key.toLocaleLowerCase())}
                  className={`${
                    selectedMenu === key.toLocaleLowerCase()
                      ? "text-[var(--cl-prim-400)]"
                      : "text-[var(--cl-snd-100)]"
                  } relative cursor-pointer w-[3rem] aspect-square  rounded-full flex items-center justify-center`}
                >
                  {icon}
                  {menuNotifications[key.toLocaleLowerCase()] && (
                    <Badge num={menuNotifications[key.toLocaleLowerCase()]} />
                  )}
                </button>
              </Tooltip>
            </div>
          ))}
        </div>
        <div className="grid gap-[2rem] justify-items-center mb-[1rem]">
          <div
            className="cursor-pointer relative"
            onClick={() => setIsNightMode(!isNightMode)}
          >
            {isNightMode ? (
              <Tooltip text={"Night Mode"} dir={"right"}>
                <IoMoonOutline className="text-[1.2rem]" />
              </Tooltip>
            ) : (
              <Tooltip text={"Day Mode"} dir={"right"}>
                <MdOutlineWbSunny className="text-[1.2rem]" />
              </Tooltip>
            )}
            <div className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
              Tooltip on top
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="more-btn cursor-pointer relative py-[0.5rem]"
          >
            {showProfileMenu && (
              <div
                ref={menuRef}
                className={`absolute rounded text-[var(--cl-snd-700)] -left-[0.5rem] bottom-[4rem] z-20 w-[9rem] bg-white border border-[var(--cl-snd-200)] py-1`}
              >
                <button
                  onClick={() => setSelectedMenu("profile")}
                  className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-50"
                >
                  View Profile
                  <FaRegUser />
                </button>
                <button className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between  hover:bg-gray-50">
                  Settings
                  <IoSettingsOutline />
                </button>
                <hr className="text-[var(--cl-snd-300)]" />
                <button className="text-red-500 cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between  hover:bg-gray-50">
                  Logout
                  <MdOutlineLogout />
                </button>
              </div>
            )}
            {selectedMenu === "profile" && (
              <>
                <div className="rounded-l-full absolute top-[0.01rem] -left-[0.5rem] w-[5rem] h-[4rem] bg-white"></div>
                <div className="absolute -top-[1rem] left-[2.5rem] md:left-[3rem] w-[1.3rem] rounded-full aspect-square  shadow-[inset_-7px_-7px_0px_-2px_rgb(255,255,255)]"></div>
                <div className="absolute -bottom-[0.98rem] left-[2.5rem] md:left-[3rem] w-[1.3rem] rounded-full aspect-square shadow-[inset_-7px_7px_0px_-2px_rgb(255,255,255)]"></div>
              </>
            )}
            <Avatar isOnline={true} imgUrl="https://i.pravatar.cc/150?img=3" />
          </div>
        </div>
      </div>
    );
  };

  const displayMenuDetails = () => {
    switch (selectedMenu) {
      case "chats":
        return <ChatMenu />;
      case "contacts":
        return <ContactMenu />;
      case "notification":
        return <NotificationMenu />;
      case "profile":
        return <ProfileMenu />;
      case "setting":
        return <SettingMenu />;
    }
  };

  return (
    <div className="flex">
      {!isMobileMenuOpen && (
        <div className="md:hidden fixed top-[1rem] left-0 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="relative w-[2rem] aspect-square bg-[var(--cl-prim-400)] text-white rounded-r-full flex items-center justify-center"
          >
            <MdMenu className="text-[1rem]" />
          </button>
        </div>
      )}
      <div className="hidden md:flex">
        {displayMenu()}
        <div className="w-[23rem]">{displayMenuDetails()}</div>
      </div>

      <SlideXAnimation isOpen={isMobileMenuOpen}>
        <div className="flex md:hidden relative">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="z-20 cursor-pointer absolute top-[0.3rem] right-0 p-[0.5rem] text-white bg-[var(--cl-prim-200)] rounded-l-full"
          >
            <FaRegCircleXmark className="text-[1rem]" />
          </button>
          {displayMenu()}
          <div className="w-[15rem]">{displayMenuDetails()}</div>
        </div>
      </SlideXAnimation>
    </div>
  );
};

export default SideBar;
