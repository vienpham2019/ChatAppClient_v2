import { MdOutlineAddReaction, MdOutlineReply } from "react-icons/md";

import { IoIosMore } from "react-icons/io";
import Tooltip from "../components/Tooltip";
import { PopoverMenu } from "../components/PopOver";
import EmojiPickerMenu from "../components/EmojiPickerMenu";
import { FaPencil } from "react-icons/fa6";
import MessageEditMenu from "./MessageEditMenu";
import { useEffect, useRef, useState } from "react";

const MessagePopover = ({ isReverse = false, onClose }) => {
  const reactions = [
    { emoji: "👍", label: "Thumbs Up" },
    { emoji: "😄", label: "Smile" },
    { emoji: "❤️", label: "Red Heart" },
    { emoji: "😲", label: "Surprised" },
  ];
  const menuRef = useRef();
  const emojiMenuRef = useRef();
  const emojiSkinRef = useRef();
  const editMenuRef = useRef();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const handleClickOutside = (e) => {
    if (
      !menuRef?.current.contains(e.target) &&
      !emojiMenuRef?.current?.contains(e.target) &&
      !emojiSkinRef?.current?.contains(e.target) &&
      !editMenuRef?.current?.contains(e.target)
    ) {
      onClose(); // close modal/menu if click is outside all tracked areas
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="bg-white my-3">
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
            <EmojiPickerMenu
              isOpen={isEmojiPickerOpen}
              menuRef={emojiMenuRef}
              skinRef={emojiSkinRef}
            >
              <div
                className="emoji-btn"
                onClick={() => {
                  console.log("EmojiPickerMenu click");
                  setIsEditMenuOpen(false);
                  setIsEmojiPickerOpen(!isEmojiPickerOpen);
                }}
              >
                <Tooltip text={"More reactions"}>
                  <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                    <MdOutlineAddReaction />
                  </span>
                </Tooltip>
              </div>
            </EmojiPickerMenu>
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
            isOpen={isEditMenuOpen}
            clickOutsideCapture={false}
            positions={["right", "left"]}
            content={
              <MessageEditMenu isReverse={isReverse} menuRef={editMenuRef} />
            }
          >
            <div
              className="cursor-pointer flex items-center edit-btn"
              onClick={() => {
                setIsEmojiPickerOpen(false);
                setIsEditMenuOpen(!isEditMenuOpen);
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
