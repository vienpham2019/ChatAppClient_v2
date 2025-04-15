import { useState } from "react";
import { RiMore2Line } from "react-icons/ri";
import MessagePopover from "./MessagePopover";
import { PopoverBtn, PopoverMenu } from "../components/PopOver";
import { getUniqueNum } from "../helper";

const MessageContent = ({
  message,
  timestamp,
  isDisplayTime = true,
  isReverse = false,
  className = "",
}) => {
  const popoverId = getUniqueNum();
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
      <PopoverBtn id={popoverId}>
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
      </PopoverBtn>
      <PopoverMenu
        id={popoverId}
        className={
          "popover-top-right z-1 m-[0.5rem] shadow-md overflow-visible"
        }
      >
        <MessagePopover isReverse={isReverse} />
      </PopoverMenu>
    </div>
  );
};

export default MessageContent;
