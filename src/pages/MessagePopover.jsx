import { AiFillEdit } from "react-icons/ai";
import { BsPinFill } from "react-icons/bs";
import { FaCopy, FaRegTrashAlt } from "react-icons/fa";
import { ImReply } from "react-icons/im";
import {
  MdGTranslate,
  MdOutlineAddReaction,
  MdOutlineReply,
} from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { getUniqueNum } from "../helper";
import Tooltip from "../components/Tooltip";
import { PopoverBtn, PopoverMenu } from "../components/PopOver";

const MessagePopover = ({ isReverse = false }) => {
  const popoverId = getUniqueNum();
  const reactions = [
    { emoji: "👍", label: "Thumbs Up" },
    { emoji: "😄", label: "Smile" },
    { emoji: "❤️", label: "Red Heart" },
    { emoji: "😲", label: "Surprised" },
  ];
  return (
    <div className={`${isReverse ? "right-full" : "left-full"} `}>
      <div className="grid gap-1">
        <div className="border border-[var(--cl-snd-400)] relative flex gap-[0.7rem] px-[0.7rem] py-[0.5rem] rounded items-center">
          {reactions.map(({ emoji, label }) => (
            <div className="cursor-pointer flex items-center">
              <Tooltip text={label}>
                <span>{emoji}</span>
              </Tooltip>
            </div>
          ))}
          <div className="cursor-pointer flex items-center pr-[0.5rem] border-r border-[var(--cl-snd-300)]">
            <Tooltip text={"More reactions"}>
              <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                <MdOutlineAddReaction />
              </span>
            </Tooltip>
          </div>
          <div className="cursor-pointer flex items-center">
            <Tooltip text={"Reply"}>
              <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                <MdOutlineReply />
              </span>
            </Tooltip>
          </div>
          <div className="cursor-pointer flex items-center">
            <PopoverBtn id={popoverId}>
              <Tooltip text={"More options"}>
                <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                  <IoIosMore />
                </span>
              </Tooltip>
            </PopoverBtn>
          </div>
        </div>
        <PopoverMenu
          id={popoverId}
          className={
            "popover-right rounded z-1 ml-[1rem] shadow-md overflow-visible border border-[var(--cl-snd-400)]"
          }
        >
          <div className="overflow-hidden grid gap-1 text-[var(--cl-snd-600)] shadow-2xs text-[0.8rem] w-[8rem] rounded">
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
              <RiShareForwardFill />
            </span>
            <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
              Pin
              <BsPinFill />
            </span>
            <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
              Translate
              <MdGTranslate />
            </span>
            <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
              Edit
              <AiFillEdit />
            </span>
            <span className="px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
              Delete
              <FaRegTrashAlt />
            </span>
          </div>
        </PopoverMenu>
      </div>
    </div>
  );
};

export default MessagePopover;
