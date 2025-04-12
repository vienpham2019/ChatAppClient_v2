import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import {
  BsEmojiGrin,
  BsEmojiSmile,
  BsEmojiSmileFill,
  BsPinFill,
} from "react-icons/bs";
import { FaCopy, FaRegTrashAlt } from "react-icons/fa";
import { ImReply } from "react-icons/im";
import { MdGTranslate } from "react-icons/md";
import { RiMore2Line, RiShareForwardFill } from "react-icons/ri";
import ClickOutside from "../components/ClickOutside";
import { IoIosAddCircleOutline } from "react-icons/io";

const MessageContent = ({
  message,
  timestamp,
  isDisplayTime = true,
  isReverse = false,
  className = "",
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <div
      className={`flex ${isReverse && "flex-row-reverse"} items-center group`}
    >
      <div
        className={`relative mb-[1.4rem] bg-[var(--cl-snd-200)] text-[0.9em] text-[var(--cl-snd-800)] rounded-2xl ${className} 
  px-[1rem] py-[0.6rem]`}
      >
        <p>{message}</p>
        {isDisplayTime && (
          <span
            className={`mt-[0.4rem] text-xs text-[var(--cl-snd-600)] w-full flex ${
              !isReverse && "justify-end"
            }`}
          >
            {formatDate(timestamp)}
          </span>
        )}
        <div
          className={`absolute -bottom-[1.6rem] ${
            isReverse ? "right-0" : "left-0"
          }`}
        >
          <div className="bg-[var(--cl-snd-200)] py-[0.2rem] px-[0.4rem] rounded-full border-[0.2rem] border-white flex items-end justify-center gap-1">
            <span>&#128513;</span>
            <span> &#x1F494;</span>
            <span> &#x1F494;</span>
            <span> &#x1F494;</span>
            <span> &#x1F494;</span>
            <span>...</span>
            <small className="mr-1">10</small>
          </div>
        </div>
      </div>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className={`relative cursor-pointer px-1 ${
          !openMenu && "opacity-0"
        } group-hover:opacity-100`}
      >
        <RiMore2Line className="more-btn" />
        {openMenu && (
          <div
            className={`absolute -top-full z-1 ${
              isReverse ? "right-full" : "left-full"
            }`}
          >
            <ClickOutside onClose={() => setOpenMenu(!openMenu)}>
              <div className="grid gap-1">
                <div className="flex p-1 rounded justify-evenly items-center bg-[var(--cl-snd-200)] w-[7rem]">
                  <span>&#128513;</span>
                  <span>&#x1F494;</span>
                  <span>&#128077;</span>
                  <span>
                    <IoIosAddCircleOutline />
                  </span>
                </div>
                <div className="overflow-hidden grid gap-1 text-[var(--cl-snd-600)] bg-[var(--cl-snd-200)] text-[0.8rem] w-[7rem] rounded">
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
              </div>
            </ClickOutside>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContent;
