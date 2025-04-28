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

const MessagePopover = ({ setShowSubEditMenu, closeAllPopover }) => {
  const [showMoreEmoji, setShowMoreEmoji] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
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
              isOpen={showMoreEmoji}
              setIsOpen={setShowMoreEmoji}
              onClickOutside={() => {
                closeAllPopover();
                setShowMoreEmoji(false);
              }}
              positions={["right", "left"]}
              content={<EmojiPickerMenu />}
            >
              <div
                onClick={() => {
                  setShowSubEditMenu(!showMoreEmoji);
                  setShowMoreEmoji(!showMoreEmoji);
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
          <div className="cursor-pointer flex items-center">
            <Tooltip text={"Reply"}>
              <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                <MdOutlineReply />
              </span>
            </Tooltip>
          </div>
          <PopoverMenu
            isOpen={showEditMenu}
            setIsOpen={setShowEditMenu}
            onClickOutside={() => {
              closeAllPopover();
              setShowEditMenu(false);
            }}
            positions={["right", "left"]}
            content={
              <div className="mx-4 overflow-hidden grid gap-1 text-[var(--cl-snd-600)] shadow-2xs text-[0.8rem] w-[8rem] rounded bg-white border border-[var(--cl-snd-300)]">
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)] ">
                  Reply
                  <ImReply />
                </span>
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                  Copy
                  <FaCopy />
                </span>
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                  Forward
                  <MdOutlineReply />
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
                <hr className="text-gray-300" />
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                  Edit
                  {/* <AiFillEdit /> */}
                </span>
                <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
                  Delete
                  <FaRegTrashAlt />
                </span>
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
