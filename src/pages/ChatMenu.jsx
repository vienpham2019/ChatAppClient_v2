import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdArrowDropdown,
  IoMdArrowDropright,
} from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Avatar from "../components/Avatar";
import { useState } from "react";
import CollapseYAnimation from "../components/CollapseYAnimation";
const ChatMenu = () => {
  const [activeContact, setActiveContact] = useState(1);
  const [openFavorite, setOpenFavorite] = useState(true);
  const [openDirectMsg, setOpenDirectMsg] = useState(true);
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

  return (
    <div className="flex flex-col w-full bg-white border-r border-[var(--cl-snd-200)] overflow-y-auto h-screen">
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
            <div
              className="cursor-pointer items-center flex gap-[0.2rem] mb-3"
              onClick={() => setOpenFavorite(!openFavorite)}
            >
              {openFavorite ? (
                <IoMdArrowDropdown className="text-[1.3rem]" />
              ) : (
                <IoMdArrowDropright className="text-[1.3rem]" />
              )}
              <h3 className="text-xs font-semibold text-gray-500">FAVORITES</h3>
            </div>
            <CollapseYAnimation isOpen={openFavorite}>
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
            </CollapseYAnimation>
          </div>
          <div className="p-4">
            <div
              className="cursor-pointer flex gap-[0.2rem] items-center"
              onClick={() => setOpenDirectMsg(!openDirectMsg)}
            >
              {openDirectMsg ? (
                <IoMdArrowDropdown className="text-[1.3rem]" />
              ) : (
                <IoMdArrowDropright className="text-[1.3rem]" />
              )}
              <h3 className="text-xs font-semibold text-gray-500">
                DIRECT MESSAGES
              </h3>
            </div>
            <CollapseYAnimation isOpen={openDirectMsg}>
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
            </CollapseYAnimation>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;
