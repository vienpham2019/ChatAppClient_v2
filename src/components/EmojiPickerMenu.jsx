import { useEffect, useRef, useState } from "react";
import { BsEmojiSmileFill, BsStars } from "react-icons/bs";
import { FaAppleAlt, FaCar, FaClock, FaDog } from "react-icons/fa";
import { FaVolleyball } from "react-icons/fa6";
import { ImFlag } from "react-icons/im";
import { IoBulb } from "react-icons/io5";
import { MdOutlineEmojiSymbols } from "react-icons/md";
import SearchInput from "../components/SearchInput";
const EmojiPickerMenu = ({ onEmojiSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState("recent");
  const pickerRef = useRef(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const categories = [
    { id: "recent", name: "Recently Used", icon: <FaClock /> },
    { id: "smileys", name: "Smileys & People", icon: <BsEmojiSmileFill /> },
    { id: "animals", name: "Animals & Nature", icon: <FaDog /> },
    { id: "food", name: "Food & Drink", icon: <FaAppleAlt /> },
    { id: "activities", name: "Activities", icon: <FaVolleyball /> },
    { id: "travel", name: "Travel & Places", icon: <FaCar /> },
    { id: "objects", name: "Objects", icon: <IoBulb /> },
    { id: "symbols", name: "Symbols", icon: <MdOutlineEmojiSymbols /> },
    { id: "flags", name: "Flags", icon: <ImFlag /> },
    { id: "custom", name: "Custom", icon: <BsStars /> },
  ];

  // Frequently used emojis
  const frequentEmojis = [
    "👍",
    "😀",
    "😍",
    "🥰",
    "😐",
    "😢",
    "😂",
    "😅",
    "😊",
    "👎",
    "🔥",
    "😭",
  ];

  // Smileys & People section
  const smileyEmojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "☺️",
    "😚",
    "😙",
    "🥲",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😌",
    "😔",
    "😪",
    "🤤",
    "😴",
  ];

  return (
    <div
      ref={pickerRef}
      className="bg-white overflow-hidden rounded-lg shadow-lg w-[350px] border border-gray-200"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
    >
      {/* Category navigation */}
      <div className="flex items-center justify-between p-2 shadow">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`cursor-pointer p-1.5 rounded-md hover:text-[var(--cl-snd-600)] ${
              activeCategory === category.id
                ? "text-[var(--cl-prim-400)]"
                : "text-[var(--cl-snd-400)]"
            }`}
            title={category.name}
          >
            <span className="text-xl">{category.icon}</span>
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="p-2 flex items-center gap-2">
        <div className="flex-1">
          <SearchInput />
        </div>
        <div className="relative">
          <button className="cursor-pointer w-4 aspect-square rounded bg-[#e7b98f] shadow-xl"></button>
          <div className="grid gap-2 absolute right-[50%] translate-x-1/2 bg-black/50 rounded w-[2rem] py-2 justify-center  z-1">
            <button className="hover:scale-120 cursor-pointer w-4 aspect-square rounded bg-[#e7b98f] shadow-xl"></button>
          </div>
        </div>
      </div>

      {/* Emoji sections */}
      <div className="overflow-y-auto max-h-[280px] p-2">
        {/* Frequently used section */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Frequently used
          </h3>
          <div className="grid grid-cols-8 gap-1">
            {frequentEmojis.map((emoji, index) => (
              <button
                key={index}
                className="text-2xl p-1 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => onEmojiSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Smileys & People section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Smileys & People
          </h3>
          <div className="grid grid-cols-8 gap-1">
            {smileyEmojis.map((emoji, index) => (
              <button
                key={index}
                className="text-2xl p-1 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => onEmojiSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="p-2 flex justify-between items-center text-gray-500 text-sm border-t border-[var(--cl-snd-200)]"></div>
    </div>
  );
};

export default EmojiPickerMenu;
