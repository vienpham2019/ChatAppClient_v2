import { useEffect, useRef, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import Avatar from "../components/Avatar";
import { IoMdMore } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import CollapseYAnimation from "../components/CollapseYAnimation";

const ContactMenu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showContactMenu, setShowContactMenu] = useState("2");
  const [menuPosition, setMenuPosition] = useState("top-[1rem]");
  const menuRef = useRef(null);
  const contacts = [
    {
      id: "1",
      name: "Victoria Lane",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    {
      id: "2",
      name: "Adinda Kirana",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "A",
    },
    {
      id: "3",
      name: "Alaya Cordova",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Brenda Bell",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "B",
    },
    {
      id: "5",
      name: "David Green",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "D",
    },
    {
      id: "6",
      name: "Dushane Daniel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      name: "Etta McDaniel",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "E",
    },
    {
      id: "8",
      name: "Henry Watkins",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "H",
    },
    {
      id: "9",
      name: "Jennifer Rogers",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "J",
    },
    {
      id: "10",
      name: "Jennifer Rogers",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "J",
    },
    {
      id: "11",
      name: "Jennifer Rogers",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "J",
    },
    {
      id: "12",
      name: "Jennifer Rogers",
      avatar: "/placeholder.svg?height=40&width=40",
      letter: "J",
    },
  ];
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !e.target.closest(".more-btn")
    ) {
      setShowContactMenu(null);
      console.log("click outside");
    }
  };
  const adjustMenuPosition = (contactId) => {
    setShowContactMenu(showContactMenu === contactId ? null : contactId);
    setTimeout(() => {
      if (menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - menuRect.bottom;
        const spaceAbove = menuRect.top;

        if (spaceBelow < 120 && spaceAbove > 120) {
          setMenuPosition("bottom-[1rem]");
        } else {
          setMenuPosition("top-[1rem]");
        }
      }
    }, 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-72 bg-white border-r border-[var(--cl-snd-200)] overflow-y-auto h-screen">
      <div className="border-r flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <button className="cursor-pointer w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            <GoPlus />
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <CiSearch className="absolute left-[0.5rem] top-[0.3rem] h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="pl-9 bg-gray-100 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact, index) => (
            <div key={contact.id}>
              {contact.letter && (
                <div className="px-4 py-1 text-xs font-semibold text-muted-foreground bg-gray-50">
                  {contact.letter}
                </div>
              )}
              <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer relative">
                <div className="flex items-center gap-3">
                  <Avatar
                    imgUrl={`https://i.pravatar.cc/150?img=${contact.id}`}
                  />
                  <span className="font-medium">{contact.name}</span>
                </div>
                <button
                  className="more-btn cursor-pointer border border-[var(--cl-snd-200)] rounded p-1"
                  onClick={() => {
                    adjustMenuPosition(contact.id);
                  }}
                >
                  <IoMdMore />
                </button>

                {showContactMenu === contact.id && (
                  <div
                    ref={menuRef}
                    className={`absolute h-[120px] text-gray-700 right-[3rem] ${menuPosition} bg-white border border-[var(--cl-snd-200)] shadow py-1 z-10 w-36`}
                  >
                    <button className="w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-50">
                      Edit
                      <FaRegEdit />
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-left flex items-center justify-between  hover:bg-gray-50">
                      Block
                      <MdOutlineBlock />
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-left flex items-center justify-between  hover:bg-gray-50">
                      Remove
                      <FaRegTrashAlt />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMenu;
