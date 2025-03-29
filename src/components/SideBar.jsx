import { TiContacts } from "react-icons/ti";
import Logo from "../components/logo";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Avatar from "./Avatar";
import { FaRegCircleXmark } from "react-icons/fa6";
import SlideXAnimation from "./SlideXAnimation";
import Badge from "./Badge";

const SideBar = () => {
  const [activeContact, setActiveContact] = useState(1);
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Victoria Lane",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey, I'm going to meet a friend of...",
      unread: true,
      online: true,
      favorite: true,
    },
    {
      id: 2,
      name: "Eva McDonald",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Yeah everything is fine. Our next meeting...",
      online: true,
    },
    {
      id: 3,
      name: "James Picard",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Wow that's great!",
    },
    {
      id: 4,
      name: "Ronald Downey",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Why I try this to get demo data following...",
    },
  ]);
  const [directMessages, setDirectMessages] = useState([
    {
      id: 5,
      name: "Nicholas Stokes",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Excited to meet you again!",
    },
    {
      id: 6,
      name: "Kathryn Pearsey",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "See you soon 👋",
      unread: true,
    },
    {
      id: 7,
      name: "Robert Ledsome",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for your answer!",
    },
    {
      id: 8,
      name: "Alaya Cordova",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hi there, how are you?",
    },
    {
      id: 9,
      name: "Adinda Kirana",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How are you and your family",
    },
    {
      id: 10,
      name: "John Foss",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Good Morning 😃",
      unread: true,
    },
    {
      id: 11,
      name: "Gloria Underhill",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "OK, sure",
    },
  ]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Victoria Lane",
      senderId: 1,
      content: "Good morning 👋",
      timestamp: "10:07 am",
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: "You",
      senderId: 0,
      content: "Good morning. How are you? What about our next meeting?",
      timestamp: "10:12 am",
      isCurrentUser: true,
    },
    {
      id: 3,
      sender: "Victoria Lane",
      senderId: 1,
      content: "Yeah everything is fine. Our next meeting tomorrow at 10:00 AM",
      timestamp: "10:13 am",
      isCurrentUser: false,
    },
    {
      id: 4,
      sender: "Victoria Lane",
      senderId: 1,
      content:
        "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁",
      timestamp: "10:13 am",
      isCurrentUser: false,
    },
    {
      id: 5,
      sender: "You",
      senderId: 0,
      content: "Wow that's great!",
      timestamp: "10:14 am",
      isCurrentUser: true,
    },
    {
      id: 6,
      sender: "Victoria Lane",
      senderId: 1,
      content: "",
      timestamp: "10:15 am",
      isCurrentUser: false,
      attachment: {
        name: "design-phase-1-approved.pdf",
        size: "2.3 MB",
        type: "pdf",
      },
    },
  ]);
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

  const displayMenu2 = () => {
    return (
      <div className="flex flex-col w-72 bg-white border-r border-[var(--cl-snd-200)] overflow-y-auto h-screen">
        <div className="px-4 pt-4">
          <div className=" flex items-center justify-between mb-[0.5rem]">
            <h2 className="text-gray-700 font-medium flex items-center">
              Messages <span className="text-xs text-gray-500 ml-1">(128)</span>
            </h2>
          </div>
          <div className="relative border-b border-[var(--cl-snd-200)] pb-[1rem]">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--cl-snd-400)]" />
            <input
              placeholder="Search here..."
              className="pl-10 bg-gray-50 border-[var(--cl-snd-200)]"
            />
          </div>

          <div className="">
            <div className="p-4 border-b border-[var(--cl-snd-200)]">
              <div className="cursor-pointer flex justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-500">
                  FAVORITES
                </h3>
                <IoIosArrowDown className="text-[var(--cl-prim-500)]" />
              </div>
              <div className="space-y-1">
                {favorites.map((contact) => (
                  <button
                    key={contact.id}
                    className={`cursor-pointer w-full flex items-center p-2 rounded-lg ${
                      activeContact === contact.id
                        ? "bg-indigo-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setActiveContact(contact.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Avatar
                      isOnline={contact.online}
                      imgUrl={`https://i.pravatar.cc/150?img=${contact.id}`}
                    />
                    <div className="ml-3 text-left flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {contact.name}
                        </p>
                        {contact.unread && (
                          <span className="w-[0.5rem] aspect-square bg-[var(--cl-prim-700)] rounded-full"></span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--cl-snd-500)] truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4">
              <div className="cursor-pointer  flex justify-between">
                <h3 className="text-xs font-semibold text-gray-500 mb-3">
                  DIRECT MESSAGES
                </h3>
                <IoIosArrowDown className="text-[var(--cl-prim-500)]" />
              </div>
              <div className="space-y-1">
                {directMessages.map((contact) => (
                  <button
                    key={contact.id}
                    className={`cursor-pointer w-full flex items-center p-2 rounded-lg ${
                      activeContact === contact.id
                        ? "bg-indigo-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setActiveContact(contact.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Avatar
                      isOnline={contact.online}
                      imgUrl={`https://i.pravatar.cc/150?img=${contact.id}`}
                    />
                    <div className="ml-3 text-left flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {contact.name}
                        </p>
                        {contact.unread && (
                          <span className="h-2 w-2 bg-indigo-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex ">
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
        {displayMenu2()}
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
          {displayMenu2()}
        </div>
      </SlideXAnimation>
    </div>
  );
};

export default SideBar;
