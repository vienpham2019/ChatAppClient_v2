import React from "react";
import { getDate, getTime } from "../helper";
import { RxCross1 } from "react-icons/rx";
import Tooltip from "../components/Tooltip";

const MessageReply = ({ message, isCloseBtn = false, onClose = () => {} }) => {
  if (!message) return;
  return (
    <div className="flex gap-2 rounded border  border-[var(--cl-snd-200)] px-1 py-2 w-fit max-w-[50vw]">
      <div className="bg-[var(--cl-snd-200)] w-1 h-full rounded" />
      <div className="flex-1 grid gap-1 w-fit">
        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-1 text-[var(--cl-snd-700)]">
            <small>{message.sender}</small>
            <small>{getDate(message.timestamp)}</small>
            <small> {getTime(message.timestamp)}</small>
          </div>
          {isCloseBtn && (
            <Tooltip text={"Remove Reference"}>
              <RxCross1
                onClick={onClose}
                className="cursor-pointer text-[var(--cl-snd-600)]  hover:text-[var(--cl-prim-600)]"
              />
            </Tooltip>
          )}
        </div>
        <span className="text-[var(--cl-snd-700)] text-[0.9rem]">
          {message.message}
        </span>
      </div>
    </div>
  );
};

export default MessageReply;
