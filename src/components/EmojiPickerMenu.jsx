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
import { GroupedVirtuoso } from "react-virtuoso";
const EmojiPickerMenu = ({ onEmojiSelect, onClose }) => {
  const popoverId = getUniqueNum();
  const [activeCategory, setActiveCategory] = useState("Recently Used");
  const getAllCategories = useEmojiStore((state) => state.getAllCategories);
  const [selectedSkinTone, setSelectedSkinTone] = useState("#ffd225");
  const [emojis, setEmojis] = useState({});
  const [groupCounts, setGroupCounts] = useState([]);
  const [preSumGroupCounts, setPreSumGroupCounts] = useState([]);
  const pickerRef = useRef(null);
  const virtuosoRef = useRef(null);
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
    { name: "Recently Used", icon: <FaClock /> },
    { name: "Smileys & People", icon: <BsEmojiSmileFill /> },
    { name: "Animals & Nature", icon: <FaDog /> },
    { name: "Food & Drink", icon: <FaAppleAlt /> },
    { name: "Activity", icon: <FaVolleyball /> },
    { name: "Travel & Places", icon: <FaCar /> },
    { name: "Objects", icon: <IoBulb /> },
    { name: "Symbols", icon: <MdOutlineEmojiSymbols /> },
    { name: "Flags", icon: <ImFlag /> },
  ];

  const skinTones = {
    "#ffd225": "Default",
    "#ffdfbd": "Light",
    "#e9c197": "Medium Light",
    "#c88e62": "Medium",
    "#a86637": "Medium Dark",
    "#60463a": "Dark",
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        const categoriesOrder = {
          //   "Recently Used": 0,
          "Smileys & People": 1,
          "Animals & Nature": 2,
          "Food & Drink": 3,
          Activity: 4,
          "Travel & Places": 5,
          Objects: 6,
          Symbols: 7,
          Flags: 8,
        };

        // Create a map from your backend data
        const sortedEmojis = [];
        const initGroupCounts = [];
        const initPreSumGroupCounts = new Array(8).fill(0);
        categories.forEach(({ _id, emojis }) => {
          const index = categoriesOrder[_id] - 1;
          sortedEmojis[index] = emojis;
          initGroupCounts[index] = Math.ceil(emojis.length / 8);
        });
        for (let i = 1; i < initPreSumGroupCounts.length; i++) {
          initPreSumGroupCounts[i] =
            initGroupCounts[i - 1] + initPreSumGroupCounts[i - 1];
        }
        setGroupCounts(initGroupCounts);
        setPreSumGroupCounts(initPreSumGroupCounts);
        setEmojis(sortedEmojis);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    fetchCategories();
  }, [setEmojis]);
  return (
    <div
      ref={pickerRef}
      className="bg-white overflow-hidden rounded-lg shadow-lg w-[350px] border border-gray-200"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
    >
      {/* Category navigation */}
      <div className="flex items-center justify-evenly shadow">
        {categories.map((category, i) => (
          <button
            key={category.name + "-Icon"}
            onClick={() => {
              virtuosoRef.current?.scrollToIndex({
                index: preSumGroupCounts[i - 1],
                align: "start",
                behavior: "smooth",
              });
              setActiveCategory(category.name);
            }}
            className={`relative cursor-pointer px-1.5 py-3 h-full rounded-md hover:text-[var(--cl-snd-600)] ${
              activeCategory === category.name
                ? "text-[var(--cl-prim-400)]"
                : "text-[var(--cl-snd-400)]"
            }`}
            title={category.name}
          >
            <span className="text-xl">{category.icon}</span>
            {activeCategory === category.name && (
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
      <div className="overflow-y-auto h-[280px] px-2">
        <GroupedVirtuoso
          ref={virtuosoRef}
          style={{ height: "100%" }}
          groupCounts={groupCounts}
          rangeChanged={({ startIndex }) => {
            if (preSumGroupCounts.includes(startIndex)) {
              const currentIndex = preSumGroupCounts.indexOf(startIndex);
              const currentCategory = emojis[currentIndex][0].category;
              if (currentCategory !== activeCategory) {
                setActiveCategory(currentCategory);
              }
            }
          }}
          groupContent={(index) => {
            if (emojis[index][0].category !== activeCategory) {
              //   setActiveCategory(emojis[index][0].category);
            }
            return (
              <h3 className="top-0 p-2 text-sm font-medium text-[var(--cl-snd-800)] bg-white/90">
                {emojis[index][0].category}
              </h3>
            );
          }}
          itemContent={(itemIndex, groupIndex) => {
            let currentRow = itemIndex - preSumGroupCounts[groupIndex];

            return (
              <div className="flex gap-[7px] px-1">
                {emojis[groupIndex]
                  .slice(currentRow * 8, currentRow * 8 + 8)
                  .map((emoji, index) => (
                    <button
                      key={emoji.category + index}
                      className="text-2xl py-2 px-1 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => onEmojiSelect(emoji.name)}
                    >
                      {emoji.skins[0].native}
                    </button>
                  ))}
              </div>
            );
          }}
        />
      </div>
      {/* Footer */}
      <div className="p-2 flex justify-between items-center text-gray-500 text-sm border-t border-[var(--cl-snd-200)]"></div>
    </div>
  );
};

export default EmojiPickerMenu;
