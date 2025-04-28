import { useRef, useState } from "react";
import MessagePopover from "./MessagePopover";
import { PopoverMenu } from "../components/PopOver";
import { useSelector } from "react-redux";

const MessageContent = ({
  message,
  timestamp,
  isDisplayTime = true,
  isReverse = false,
  className = "",
}) => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showSubEditMenu, setShowSubEditMenu] = useState(false);
  const popoverRef = useRef();
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
        <PopoverMenu
          isOpen={showEditMenu}
          setIsOpen={setShowEditMenu}
          onClickOutside={() => {
            if (!showSubEditMenu) setShowEditMenu(false);
          }}
          positions={["top", "bottom"]}
          content={() => (
            <MessagePopover
              isReverse={isReverse}
              setShowSubEditMenu={(isOpen) => {
                setShowSubEditMenu(isOpen);
              }}
              closeAllPopover={() => {
                setShowSubEditMenu(false);
                setShowEditMenu(false);
              }}
            />
          )}
        >
          <div
            className="cursor-pointer"
            onClick={() => setShowEditMenu(!showEditMenu)}
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
          </div>
        </PopoverMenu>
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
    </div>
  );
};

export default MessageContent;
