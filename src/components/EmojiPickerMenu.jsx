import { useEffect, useRef, useState } from "react";
import { BsEmojiSmileFill, BsStars } from "react-icons/bs";
import { FaAppleAlt, FaCar, FaClock, FaDog } from "react-icons/fa";
import { FaVolleyball } from "react-icons/fa6";
import { ImFlag } from "react-icons/im";
import { IoBulb } from "react-icons/io5";
import { MdOutlineEmojiSymbols } from "react-icons/md";
import SearchInput from "../components/SearchInput";
import { PopoverBtn, PopoverMenu } from "./PopOver";
import { getUniqueNum } from "../helper";
import Tooltip from "./Tooltip";
import { useEmojiStore } from "../store/emojiStore";
const EmojiPickerMenu = ({ onEmojiSelect, onClose }) => {
  const popoverId = getUniqueNum();
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

  const [selectedSkinTone, setSelectedSkinTone] = useState("#ffd225");

  const skinTones = {
    "#ffd225": "Default",
    "#ffdfbd": "Light",
    "#e9c197": "Medium Light",
    "#c88e62": "Medium",
    "#a86637": "Medium Dark",
    "#60463a": "Dark",
  };
  const getAllCategories = useEmojiStore((state) => state.getAllCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        console.log("Fetched:", categories);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      ref={pickerRef}
      className="bg-white overflow-hidden rounded-lg shadow-lg w-[350px] border border-gray-200"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
    >
      {/* Category navigation */}
      <div className="flex items-center justify-evenly shadow">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`relative cursor-pointer px-1.5 py-3 h-full rounded-md hover:text-[var(--cl-snd-600)] ${
              activeCategory === category.id
                ? "text-[var(--cl-prim-400)]"
                : "text-[var(--cl-snd-400)]"
            }`}
            title={category.name}
          >
            <span className="text-xl">{category.icon}</span>
            {activeCategory === category.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] rounded bg-[var(--cl-prim-300)]"></span>
            )}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="p-2 flex items-center gap-2">
        <div className="flex-1">
          <SearchInput />
        </div>
        <div className="relative">
          <PopoverBtn id={popoverId}>
            <span
              style={{ background: selectedSkinTone }}
              className="cursor-pointer w-4 aspect-square rounded shadow-xl"
            ></span>
          </PopoverBtn>
          <PopoverMenu
            id={popoverId}
            className={
              "popover-bottom-left -translate-y-[1.7rem] -translate-x-[0.5rem] overflow-visible "
            }
          >
            <div className="grid justify-center items-center gap-2 bg-gray-500 rounded w-[2rem] py-2 z-1">
              {Object.entries(skinTones).map(([color, label]) => (
                <Tooltip text={label} dir={"left"}>
                  <div
                    className={`${
                      selectedSkinTone === color &&
                      "border-[2px] border-gray-200 p-[3px] rounded-md"
                    } flex items-center justify-center`}
                  >
                    <button
                      onClick={() => setSelectedSkinTone(color)}
                      key={color}
                      style={{ background: color }}
                      className={`${
                        selectedSkinTone === color && "scale-120"
                      } hover:scale-120 cursor-pointer rounded w-[1rem] h-[1rem]`}
                    ></button>
                  </div>
                </Tooltip>
              ))}
            </div>
          </PopoverMenu>
        </div>
      </div>

      {/* Emoji sections */}
      <div className="overflow-y-auto max-h-[280px] p-2">
        {/* Frequently used section */}
        <div className="mb-4 relative">
          <h3 className="sticky top-0 border text-sm font-medium text-gray-700 mb-2">
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
