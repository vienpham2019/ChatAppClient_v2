import { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdClose, MdFavoriteBorder, MdOutlineBlock } from "react-icons/md";
import Avatar from "../components/Avatar";
import { IoIosSend, IoMdMore } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import Tooltip from "../components/Tooltip";
import CollapseYAnimation from "../components/CollapseYAnimation";
import { PopoverMenu } from "../components/PopOver";
import ClickOutside from "../components/ClickOutside";

const ContactMenu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchAddQuery, setSearchAddQuery] = useState("");
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [isOpenContactPopover, setIdOpenContactPopover] = useState();

  const contacts = [
    {
      id: "1",
      name: "Victoria Lane",
      letter: "Favourites",
      online: true,
    },
    {
      id: "2",
      name: "Adinda Kirana",
      letter: "A",
    },
    {
      id: "3",
      name: "Alaya Cordova",
    },
    {
      id: "4",
      name: "Brenda Bell",

      letter: "B",
    },
    {
      id: "5",
      name: "David Green",

      letter: "D",
    },
    {
      id: "6",
      name: "Dushane Daniel",
    },
    {
      id: "7",
      name: "Etta McDaniel",

      letter: "E",
    },
    {
      id: "8",
      name: "Henry Watkins",

      letter: "H",
    },
    {
      id: "9",
      name: "Jennifer Rogers",

      letter: "J",
    },
    {
      id: "10",
      name: "Jennifer Rogers",
    },
    {
      id: "11",
      name: "Jennifer Rogers",
    },
    {
      id: "12",
      name: "Jennifer Rogers",
    },
  ];
  const [filteredContacts, setFilteredContacts] = useState([...contacts]);
  const [filteredAddContacts, setFilteredAddContacts] = useState([...contacts]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchQuery);
    }, 200);

    return () => {
      clearTimeout(handler); // Cleanup on each keystroke
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedTerm !== null) {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(debouncedTerm.toLowerCase())
        )
      );
    }
  }, [debouncedTerm]);

  const displayContactList = () => {
    if (filteredContacts.length === 0) {
      return displayNoFilterFound();
    }
    return (
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact, index) => (
          <div key={contact.id}>
            {contact.letter && (
              <div className="flex items-center gap-[0.5rem] px-4 py-1 text-xs font-semibold text-[var(--cl-prim-500)]">
                {contact.letter}
                <hr className="w-full text-[var(--cl-prim-200)]" />
              </div>
            )}
            <div className="px-4 py-2 flex items-center justify-between hover:bg-[var(--cl-snd-50)] cursor-pointer relative">
              <div className="flex items-center gap-3">
                <Avatar
                  isOnline={contact.online || false}
                  imgUrl={`https://i.pravatar.cc/150?img=${contact.id}`}
                />
                <span className="font-medium">{contact.name}</span>
              </div>

              <PopoverMenu
                isOpen={isOpenContactPopover === contact.id}
                setIsOpen={setIdOpenContactPopover}
                positions={["left", "right"]}
                content={
                  <CollapseYAnimation
                    isOpen={isOpenContactPopover === contact.id}
                  >
                    <div className="h-[120px] text-gray-700 bg-white border border-[var(--cl-snd-200)] shadow py-1 w-36">
                      <button className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-50">
                        Favorite
                        <MdFavoriteBorder />
                      </button>
                      <button className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between  hover:bg-gray-50">
                        Block
                        <MdOutlineBlock />
                      </button>
                      <button className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between  hover:bg-gray-50">
                        Remove
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </CollapseYAnimation>
                }
              >
                <button
                  className="cursor-pointer border border-[var(--cl-snd-200)] rounded p-1"
                  onClick={() => {
                    setIdOpenContactPopover(contact.id);
                  }}
                >
                  <IoMdMore />
                </button>
              </PopoverMenu>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const displayAddContactList = () => {
    if (filteredAddContacts.length === 0) {
      return displayNoFilterFound();
    }
    return (
      <div className="h-[20rem] overflow-y-auto  my-[1rem]">
        {filteredAddContacts.map((contact, index) => (
          <div key={contact.id}>
            {contact.letter && (
              <div className="flex items-center gap-[0.5rem] px-4 py-1 text-xs font-semibold text-[var(--cl-prim-500)]">
                {contact.letter}
                <hr className="w-full text-[var(--cl-prim-200)]" />
              </div>
            )}
            <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer relative">
              <div className="flex items-center gap-3">
                <Avatar
                  imgUrl={`https://i.pravatar.cc/150?img=${contact.id}`}
                />
                <span className="font-medium">{contact.name}</span>
              </div>
              <button className="flex items-center justify-center gap-1 text-sm px-[1rem] py-[0.5rem] cursor-pointer bg-[var(--cl-prim-300)] hover:bg-[var(--cl-prim-400)] rounded">
                Send Request
                <IoIosSend />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const displayNoFilterFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          <IoSearch className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="font-medium text-gray-700">No results found</h3>
        <p className="text-sm text-gray-500 mt-1">
          Try a different search term
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-white border-[var(--cl-snd-200)] overflow-y-auto customScrollBar h-screen">
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-[1rem]">
          <h2 className="text-gray-700 font-medium flex items-center">
            Contacts{" "}
          </h2>
          <Tooltip text={"Add New Contact"} dir={"right"}>
            <button
              onClick={() => {
                setSearchAddQuery("");
                setShowAddFriendModal(true);
              }}
              className="cursor-pointer w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
            >
              <GoPlus />
            </button>
          </Tooltip>
        </div>

        <div className="px-[0.5rem] pb-4 border-b border-[var(--cl-snd-200)]">
          <input
            type="search"
            className="block w-full p-[0.6rem] text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {displayContactList()}
      </div>
      {/* Add Friend Modal */}
      {showAddFriendModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <ClickOutside onClose={() => setShowAddFriendModal(false)}>
            <div className="bg-white rounded w-full max-w-md">
              <div className="flex items-center justify-between p-[0.8rem] text-black border-b border-[var(--cl-snd-200)]">
                <div className=" flex items-center justify-between mb-[0.5rem]">
                  <h2 className="text-gray-700 font-medium flex items-center">
                    Add New Contacts{" "}
                  </h2>
                </div>

                <button
                  onClick={() => setShowAddFriendModal(false)}
                  className="cursor-pointer border p-[0.2rem] rounded-full border-[var(--cl-snd-500)] text-[var(--cl-snd-500)] hover:border-[var(--cl-snd-1000)] hover:text-[var(--cl-snd-1000)]"
                >
                  <MdClose />
                </button>
              </div>
              <div className="bg-white rounded-lg py-[1rem] mx-4">
                <input
                  type="search"
                  className="block w-full p-[0.7rem] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search"
                  value={searchAddQuery}
                  onChange={(e) => setSearchAddQuery(e.target.value)}
                />
                {displayAddContactList()}
              </div>
            </div>
          </ClickOutside>
        </div>
      )}
    </div>
  );
};

export default ContactMenu;
