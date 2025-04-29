import {
  MdGTranslate,
  MdOutlineAddReaction,
  MdOutlineReply,
} from "react-icons/md";

import { IoIosMore } from "react-icons/io";
import Tooltip from "../components/Tooltip";
import { PopoverMenu } from "../components/PopOver";
import EmojiPickerMenu from "../components/EmojiPickerMenu";
import { useState } from "react";
import { ImReply } from "react-icons/im";
import { FaCopy, FaRegTrashAlt } from "react-icons/fa";
import { BsPinFill } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";

const MessagePopover = ({
  isReverse = false,
  setShowSubEditMenu,
  showSubEditMenu,
}) => {
  const [showMoreEmoji, setShowMoreEmoji] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [isSubPopoverOpen, setIsSubPopoverOpen] = useState(false);
  const reactions = [
    { emoji: "👍", label: "Thumbs Up" },
    { emoji: "😄", label: "Smile" },
    { emoji: "❤️", label: "Red Heart" },
    { emoji: "😲", label: "Surprised" },
  ];
  return (
    <div className="bg-white my-3">
      <div className="grid gap-1">
        <div className="border border-[var(--cl-snd-300)] relative flex gap-[0.7rem] px-[0.7rem] py-[0.5rem] rounded items-center">
          {reactions.map(({ emoji, label }) => (
            <div
              key={"default emoji " + label}
              className="cursor-pointer flex items-center"
            >
              <Tooltip text={label}>
                <span>{emoji}</span>
              </Tooltip>
            </div>
          ))}
          <div className="cursor-pointer flex items-center pr-[0.5rem] border-r border-[var(--cl-snd-300)]">
            <PopoverMenu
              isOpen={
                showSubEditMenu.length > 1 &&
                showSubEditMenu[1] === "More Emoji"
              }
              setIsOpen={() =>
                setShowSubEditMenu((prev) => {
                  if (prev.indexOf("More Emoji") === -1) {
                    return [...prev, "More Emoji"];
                  }
                })
              }
              onClickOutside={() => {
                if (showSubEditMenu.indexOf("Emoji Picker") !== -1) {
                  setShowSubEditMenu((prev) =>
                    prev.filter((item) => item !== "Emoji Picker")
                  );
                } else {
                  setShowSubEditMenu([]);
                }
              }}
              positions={["right", "left"]}
              content={
                <EmojiPickerMenu
                  onClose={() => {
                    setShowSubEditMenu((prev) =>
                      prev.filter((item) => item !== "Emoji Picker")
                    );
                  }}
                  onOpen={() => {
                    setShowSubEditMenu((prev) => {
                      if (prev.indexOf("Emoji Picker") === -1) {
                        return [...prev, "Emoji Picker"];
                      }
                    });
                  }}
                />
              }
            >
              <div
                onClick={() => {
                  setShowSubEditMenu((prev) => {
                    if (prev.indexOf("More Emoji") === -1) {
                      return [...prev, "More Emoji"];
                    } else {
                      return prev.filter((item) => item !== "More Emoji");
                    }
                  });
                }}
              >
                <Tooltip text={"More reactions"}>
                  <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                    <MdOutlineAddReaction />
                  </span>
                </Tooltip>
              </div>
            </PopoverMenu>
          </div>
          {isReverse ? (
            <div className="cursor-pointer flex items-center">
              <Tooltip text={"Edit"}>
                <span className="text-[1rem] text-[var(--cl-snd-600)]">
                  <FaPencil />
                </span>
              </Tooltip>
            </div>
          ) : (
            <div className="cursor-pointer flex items-center">
              <Tooltip text={"Reply"}>
                <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                  <MdOutlineReply />
                </span>
              </Tooltip>
            </div>
          )}

          <PopoverMenu
            isOpen={showEditMenu}
            setIsOpen={setShowEditMenu}
            onClickOutside={() => {
              console.log("click outside from message popover edit");
              closeAllPopover();
              setShowEditMenu(false);
            }}
            positions={["right", "left"]}
            content={
              <div className="mx-4 overflow-hidden grid gap-1 text-[var(--cl-snd-600)] shadow-2xs text-[0.8rem] w-[8rem] rounded bg-white border border-[var(--cl-snd-300)]">
                {!isReverse && (
                  <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)] ">
                    Reply
                    <ImReply />
                  </span>
                )}
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                  Copy
                  <FaCopy />
                </span>
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                  Forward
                  <MdOutlineReply className="text-[1.2rem]" />
                </span>
                <hr className="text-gray-300" />
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                  Pin
                  <BsPinFill />
                </span>
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                  Translate
                  <MdGTranslate />
                </span>
                {isReverse && (
                  <>
                    <hr className="text-gray-300" />
                    <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                      Edit
                      <FaPencil />
                    </span>
                    <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                      Delete
                      <FaRegTrashAlt />
                    </span>
                  </>
                )}
              </div>
            }
          >
            <div
              className="cursor-pointer flex items-center"
              onClick={() => {
                setShowSubEditMenu(!showEditMenu);
                setShowEditMenu(!showEditMenu);
              }}
            >
              <Tooltip text={"More options"}>
                <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                  <IoIosMore />
                </span>
              </Tooltip>
            </div>
          </PopoverMenu>
        </div>
      </div>
    </div>
  );
};

export default MessagePopover;
