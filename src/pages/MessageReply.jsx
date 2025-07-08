import React from "react";
import { getDate, getTime } from "../helper";
import { RxCross1 } from "react-icons/rx";
import Tooltip from "../components/Tooltip";
import { useGetUserProfile } from "../store/userStore";
import { useDispatch } from "react-redux";
import { setReplyMessage } from "../store/messageSlice";
import { MdPhotoCamera } from "react-icons/md";

const MessageReply = ({ message, isCloseBtn = false, onClose = () => {} }) => {
  const dispatch = useDispatch();
  if (!message) return;
  const { data: user, isLoading: userLoading } = useGetUserProfile(
    message?.userId
  );
  if (userLoading) return <div>Loading...</div>;
  return (
    <div className="flex gap-2 rounded-lg bg-white border border-[var(--cl-snd-300)] px-1 py-2 max-w-[20rem] shadow-sm">
      <div className="bg-[var(--cl-snd-300)] w-1 h-fix rounded" />
      <div className="flex-1 grid gap-1">
        <div className="flex gap-3 justify-between items-center px-1">
          <div className="flex gap-1 text-[var(--cl-snd-700)]">
            <small>{user?.name || ""}</small>
            <small>{getDate(message.timestamp)}</small>
            <small> {getTime(message.timestamp)}</small>
          </div>
          {isCloseBtn && (
            <div onClick={() => dispatch(setReplyMessage(null))}>
              <Tooltip text={"Remove Reference"}>
                <RxCross1
                  onClick={onClose}
                  className="cursor-pointer text-[var(--cl-snd-600)]  hover:text-[var(--cl-prim-600)]"
                />
              </Tooltip>
            </div>
          )}
        </div>
        <span className="text-[var(--cl-snd-700)] text-[0.9rem] truncate">
          {message.message}
        </span>
        {message?.images && <MdPhotoCamera />}
      </div>
    </div>
  );
};

export default MessageReply;
