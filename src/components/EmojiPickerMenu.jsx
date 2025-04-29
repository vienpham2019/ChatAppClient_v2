import { useEffect, useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaAppleAlt, FaCar, FaClock, FaDog } from "react-icons/fa";
import { FaVolleyball } from "react-icons/fa6";
import { ImFlag } from "react-icons/im";
import { IoBulb } from "react-icons/io5";
import { MdOutlineEmojiSymbols } from "react-icons/md";
import SearchInput from "../components/SearchInput";
import { PopoverMenu } from "./PopOver";
import Tooltip from "./Tooltip";
import { useEmojiStore } from "../store/emojiStore";
import { GroupedVirtuoso } from "react-virtuoso";

const EmojiPickerMenu = ({ onEmojiSelect, onClose, onOpen }) => {
  const { getByCategories, getAllCategoryCounts, searchEmojis } =
    useEmojiStore();
  const [activeCategory, setActiveCategory] = useState("Recently Used");
  const [selectedSkinToneIndex, setSelectedSkinToneIndex] = useState(0);
  const [hoverEmoji, setHoverEmoji] = useState();
  const [isOpenSkintone, setIsOpenSkintone] = useState(false);

  const [emojis, setEmojis] = useState([]);
  const [totalGroupCounts, setTotalGroupCounts] = useState([]);
  const [groupCounts, setGroupCounts] = useState([]);
  const [preSumGroupCounts, setPreSumGroupCounts] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const virtuosoRef = useRef(null);

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
  const categoryOrder = categories.map(({ name }) => name);

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
        await handleFetchEmoji(["Recently Used", "Smileys & People"]);
        const resCounts = await getAllCategoryCounts();
        resCounts.sort((a, b) => {
          return categoryOrder.indexOf(a._id) - categoryOrder.indexOf(b._id);
        });
        const initGroupCounts = resCounts.map((c) => Math.ceil(c.count / 8));
        const initPreSumGroupCounts = [0];

        for (let i = 1; i < initGroupCounts.length; i++) {
          initPreSumGroupCounts[i] =
            initPreSumGroupCounts[i - 1] + initGroupCounts[i - 1];
        }

        setTotalGroupCounts(initGroupCounts);
        setGroupCounts(initGroupCounts);
        setPreSumGroupCounts(initPreSumGroupCounts);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchCategories();
  }, [setEmojis]);

  const scrollTimeoutRef = useRef(null);

  const handleSearch = async (search) => {
    virtuosoRef.current?.scrollToIndex({
      index: 0,
      align: "start",
    });
    if (search === "") {
      try {
        await handleFetchEmoji(["Recently Used", "Smileys & People"]);
        setGroupCounts([...totalGroupCounts]);
      } catch (err) {
        console.error("Error:", err.message);
      }
    } else {
      const searchRes = await searchEmojis(search);
      setGroupCounts([Math.max(1, Math.ceil(searchRes.length / 8))]);
      setEmojis([searchRes]);
    }
    setIsSearch(search !== "");
  };

  const handleFetchEmoji = async (categories) => {
    const categoriesToFetch = categories.filter(
      (c) => !emojis[categoryOrder.indexOf(c)]?.length
    );

    if (categoriesToFetch.length === 0) return;
    const resEmoji = await getByCategories(categoriesToFetch);
    // Create a map for quick access

    const updatedEmojis = [];
    for (let category of categories) {
      const index = categoryOrder.indexOf(category);
      updatedEmojis[index] = emojis[index];
    }

    for (let i = 0; i < categoriesToFetch.length; i++) {
      const index = categoryOrder.indexOf(categoriesToFetch[i]);
      updatedEmojis[index] = resEmoji[i];
    }

    setEmojis(updatedEmojis);
  };

  const handleRangeChanged = ({ startIndex, endIndex }) => {
    if (isSearch) return;
    // Clear previous timeout if still scrolling
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set a new timeout to run logic after scroll "settles"
    scrollTimeoutRef.current = setTimeout(async () => {
      for (let i = 0; i < preSumGroupCounts.length; i++) {
        const start = preSumGroupCounts[i];
        const end =
          i + 1 < preSumGroupCounts.length
            ? preSumGroupCounts[i + 1]
            : Number.MAX_SAFE_INTEGER;

        if (startIndex >= start && startIndex < end) {
          const currentCategory = categories[i].name;

          const startGroup = preSumGroupCounts.findLastIndex(
            (start) => start <= startIndex
          );
          const endGroup = preSumGroupCounts.findLastIndex(
            (start) => start <= endIndex
          );
          // Optional: Get the category name
          const startCategory = categoryOrder[startGroup];
          const endCategory = categoryOrder[endGroup];
          const fetchCategories = new Set([startCategory, endCategory]);
          await handleFetchEmoji([...fetchCategories]);
          if (currentCategory !== activeCategory) {
            setActiveCategory(currentCategory);
          }
          break;
        }
      }
    }, 100); // 100ms after scroll stops (adjust if needed)
  };

  return (
    <div
      className="bg-white overflow-hidden rounded-lg shadow-lg w-[350px] border border-gray-200"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
    >
      {/* Category navigation */}
      <div className="flex items-center justify-evenly shadow">
        {categories.map((category, i) => (
          <button
            key={category.name + "-Icon"}
            onClick={async () => {
              virtuosoRef.current?.scrollToIndex({
                index: preSumGroupCounts[i],
                align: "start",
                behavior: "smooth",
              });
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
          <SearchInput handleSearch={handleSearch} />
        </div>

        <PopoverMenu
          isOpen={isOpenSkintone}
          setIsOpen={setIsOpenSkintone}
          positions={["bottom", "top"]}
          onClickOutside={() => {
            onClose();
            setIsOpenSkintone(false);
          }}
          content={() => (
            <div className="grid justify-center items-center gap-2 bg-gray-500 rounded w-[2rem] py-2 z-1">
              {Object.entries(skinTones).map(([color, label], i) => (
                <div key={"skin tone " + i}>
                  <Tooltip text={label} dir={"left"}>
                    <div
                      className={`${
                        selectedSkinToneIndex === i &&
                        "border-[2px] border-gray-200 p-[3px] rounded-md"
                      } flex items-center justify-center`}
                    >
                      <button
                        onClick={() => {
                          setIsOpenSkintone(false);
                          setSelectedSkinToneIndex(i);
                        }}
                        style={{ background: color }}
                        className={`${
                          selectedSkinToneIndex === i && "scale-120"
                        } hover:scale-120 cursor-pointer rounded w-[1rem] h-[1rem]`}
                      ></button>
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          )}
        >
          <div
            onClick={() => {
              isOpenSkintone ? onClose() : onOpen();
              setIsOpenSkintone(!isOpenSkintone);
            }}
            style={{
              background: Object.keys(skinTones)[selectedSkinToneIndex],
            }}
            className="cursor-pointer w-4 aspect-square rounded shadow-xl"
          />
        </PopoverMenu>
      </div>

      {/* Emoji sections */}
      <div className="overflow-y-auto h-[280px] px-2">
        <GroupedVirtuoso
          className="overflow-y-auto"
          ref={virtuosoRef}
          style={{ height: "100%" }}
          groupCounts={groupCounts}
          rangeChanged={handleRangeChanged}
          groupContent={(index) => {
            return (
              <h3 className="top-0 p-2 text-sm font-medium text-[var(--cl-snd-800)] bg-white/90">
                {isSearch ? "Search Result" : categories[index].name}
              </h3>
            );
          }}
          itemContent={(itemIndex, groupIndex) => {
            let currentRow = itemIndex - preSumGroupCounts[groupIndex];
            const displayEmoji = () => {
              if (!emojis[groupIndex]?.length) {
                if (isSearch) {
                  return <div className="h-[3rem] flex-1">No result found</div>;
                }
                return (
                  <div className="h-[3rem] flex-1 animate-pulse bg-[var(--cl-snd-200)]"></div>
                );
              }
              return emojis[groupIndex]
                .slice(currentRow * 8, currentRow * 8 + 8)
                .map((emoji, index) => {
                  const skin =
                    emoji.skins[selectedSkinToneIndex] || emoji.skins[0];
                  return (
                    <button
                      key={"emoji" + itemIndex + "-" + index}
                      onMouseEnter={() => setHoverEmoji(emoji)}
                      onMouseLeave={() => setHoverEmoji(null)}
                      className="text-2xl h-[3rem] px-1 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => {
                        // onEmojiSelect(emoji.name)
                      }}
                    >
                      {skin.native}
                    </button>
                  );
                });
            };

            return <div className="flex gap-[7px] px-1">{displayEmoji()}</div>;
          }}
        />
      </div>
      {/* Footer */}
      <div className="p-2 flex justify-between items-center text-gray-500 text-sm border-t border-[var(--cl-snd-200)]">
        {!hoverEmoji ? (
          <div className="flex items-center">
            <span className="text-[2rem] mr-2">👆</span>
            <span className="text-gray-400">Pick an emoji...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="text-[2rem] mr-2">
              {hoverEmoji.skins[selectedSkinToneIndex]
                ? hoverEmoji.skins[selectedSkinToneIndex].native
                : hoverEmoji.skins[0].native}
            </span>
            <div className="grid gap-1">
              <span className="text-gray-400">{hoverEmoji.name}</span>
              <span>{hoverEmoji.emoticons.join(" ")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPickerMenu;
