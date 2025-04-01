import { useEffect, useRef, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdClose, MdOutlineBlock } from "react-icons/md";
import Avatar from "../components/Avatar";
import { IoIosSend, IoMdMore } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import CollapseYAnimation from "../components/CollapseYAnimation";
import { IoSearch } from "react-icons/io5";

const ContactMenu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchAddQuery, setSearchAddQuery] = useState("");
  const [debouncedAddTerm, setDebouncedAddTerm] = useState("");
  const [showContactMenu, setShowContactMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState("top-[1rem]");
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const contacts = [
    {
      id: "1",
      name: "Victoria Lane",

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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAddTerm(searchAddQuery);
    }, 200);

    return () => {
      clearTimeout(handler); // Cleanup on each keystroke
    };
  }, [searchAddQuery]);

  useEffect(() => {
    if (debouncedAddTerm !== null) {
      setFilteredAddContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(debouncedAddTerm.toLowerCase())
        )
      );
    }
  }, [debouncedAddTerm]);

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !e.target.closest(".more-btn")
    ) {
      setShowContactMenu(null);
    } else if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowAddFriendModal(false);
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
          setMenuPosition("bottom-[1rem] rounded-xl rounded-ee-none ");
        } else {
          setMenuPosition("top-[1rem] rounded-xl rounded-se-none ");
        }
      }
    }, 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                  className={`absolute h-[120px] text-gray-700 right-[3rem] bg-white ${menuPosition} border border-[var(--cl-snd-200)] shadow py-1 z-10 w-36`}
                >
                  <button className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-50">
                    Edit
                    <FaRegEdit />
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
              )}
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
      <div className="h-[20rem] overflow-y-auto my-[1rem]">
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
    <div className="flex flex-col w-70 border bg-white border-r border-[var(--cl-snd-200)] overflow-y-auto h-screen">
      <div className="border-r flex flex-col h-full">
        <div className="p-4 flex items-center gap-[1rem]">
          <h2 className="text-gray-700 font-medium flex items-center">
            Contacts{" "}
          </h2>
          <button
            onClick={() => {
              setSearchAddQuery("");
              setShowAddFriendModal(true);
            }}
            className="cursor-pointer w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
          >
            <GoPlus />
          </button>
        </div>

        <div className="px-[0.5rem] pb-4">
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
          <div ref={modalRef} className="bg-white rounded w-full max-w-md">
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
        </div>
      )}
    </div>
  );
};

export default ContactMenu;
