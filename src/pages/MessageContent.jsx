import { useEffect, useRef, useState } from "react";
import MessagePopover from "./MessagePopover";
import { PopoverMenu } from "../components/PopOver";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPickerMenu from "../components/EmojiPickerMenu";
import { setEditMessageId } from "../store/messageSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import Tooltip from "../components/Tooltip";
import { getTime } from "../helper";
import Avatar from "../components/Avatar";
import MessageReply from "./MessageReply";
import { useGetMessageById } from "../store/messageStore";

const MessageContent = ({ message }) => {
  const dispatch = useDispatch();
  const { editMessageId } = useSelector((state) => state.message);
  const { users } = useSelector((state) => state.chatRoom);
  const [showSubEditMenu, setShowSubEditMenu] = useState([]);
  const [editMessageVal, setEditMessageVal] = useState(message.message);
  const isMyMessage = message.userId === "user1";
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [showReactionPopover, setShowReactionPopover] = useState(false);
  const [reactions, setReactions] = useState([]);
  const emojiMenuRef = useRef();
  const emojiSkinRef = useRef();
  const { data: replyMessage } = useGetMessageById(message?.replyTo);

  const handleClickOutside = (e) => {
    if (
      !emojiMenuRef?.current?.contains(e.target) &&
      !emojiSkinRef?.current?.contains(e.target)
    ) {
      setIsEmojiOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // if (userLoading)
  //   return (
  //     <div class="max-w-sm animate-pulse h-[4rem] flex gap-2 mb-[3rem]">
  //       <div class=" bg-gray-200 rounded-full dark:bg-gray-700 w-[3rem] h-[3rem]"></div>
  //       <div className="gird items-center">
  //         <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[4rem] mb-4"></div>
  //         <div class="h-[2rem] bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
  //       </div>
  //     </div>
  //   );

  if (editMessageId === message.id) {
    return (
      <div className="grid items-center group border border-[var(--cl-snd-200)] rounded  w-[40vw]">
        <textarea
          onChange={(e) => setEditMessageVal(e.target.value)}
          type="text"
          value={editMessageVal}
          className="focus:outline-0 p-2 "
        />
        <div className="flex justify-end items-center pb-1 px-2 gap-3 w-full border-b-2 border-[var(--cl-prim-400)]">
          <EmojiPickerMenu
            isOpen={isEmojiOpen}
            positions={["bottom", "top"]}
            showCustomModal={false}
            menuRef={emojiMenuRef}
            skinRef={emojiSkinRef}
          >
            <div>
              <Tooltip text={"More reactions"}>
                <BsEmojiSmile
                  onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                  className={`text-[1.3rem] ${
                    isEmojiOpen
                      ? "text-[var(--cl-prim-600)]"
                      : "text-[var(--cl-snd-600)] "
                  } cursor-pointer hover:text-[var(--cl-prim-600)]`}
                />
              </Tooltip>
            </div>
          </EmojiPickerMenu>
          <Tooltip text={"Cancel"}>
            <RxCross1
              onClick={() => dispatch(setEditMessageId(null))}
              className="cursor-pointer text-[var(--cl-snd-600)]  hover:text-[var(--cl-prim-600)]"
            />
          </Tooltip>

          <Tooltip text={"Done"}>
            <IoMdCheckmark className="text-[1.3rem] text-[var(--cl-snd-600)] cursor-pointer hover:text-[var(--cl-prim-600)]" />
          </Tooltip>
          <Tooltip text={"Delete"}>
            <FaRegTrashAlt className="text-[1.1rem] text-[var(--cl-snd-600)] cursor-pointer hover:text-[var(--cl-prim-600)]" />
          </Tooltip>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isMyMessage && "flex-row-reverse"} ${
        !message?.isGroupedWithPrev && "mt-[2rem]"
      } items-top group`}
    >
      {!isMyMessage && (
        <div className="w-[2.3rem] mr-[0.5rem] motion-safe:r-2">
          {!message?.isGroupedWithPrev && (
            <Avatar
              imgUrl={
                users[message.userId]?.profilePictureUrl ||
                "https://i.pravatar.cc/150?img=1"
              }
              isOnline={true}
            />
          )}
        </div>
      )}

      <div
        className={`relative
          ${isMyMessage ? "bg-[var(--cl-prim-200)]" : "bg-[var(--cl-snd-200)]"}
           ${
             message?.reactions.length !== 0 && "mb-[1.4rem]"
           }  text-[0.9em] text-[var(--cl-snd-800)] rounded-2xl ${
          message?.isGroupedWithNext && !isMyMessage && "rounded-bl-sm"
        }  
         ${message?.isGroupedWithPrev && !isMyMessage && "rounded-tl-sm"}  
         ${message?.isGroupedWithNext && isMyMessage && "rounded-br-sm"}  
         ${message?.isGroupedWithPrev && isMyMessage && "rounded-tr-sm"}  
  px-[1rem] py-[0.6rem]`}
      >
        {!isMyMessage && !message?.isGroupedWithPrev && (
          <span className="absolute -top-[1.2rem] text-[0.8rem] w-[50vw] text-[var(--cl-snd-400)]">
            {users[message.userId]?.name || ""}
          </span>
        )}
        <PopoverMenu
          isOpen={showSubEditMenu.length >= 1}
          clickOutsideCapture={false}
          positions={["top", "bottom"]}
          content={() => (
            <MessagePopover
              onClose={() => setShowSubEditMenu([])}
              showSubEditMenu={showSubEditMenu}
              setShowSubEditMenu={setShowSubEditMenu}
            />
          )}
        >
          <div
            className="cursor-pointer"
            onClick={() => setShowSubEditMenu(["Main Popover"])}
          >
            {replyMessage && (
              <MessageReply message={replyMessage} isCloseBtn={false} />
            )}
            <p>{message.message}</p>
            {!message?.isGroupedWithNext && (
              <span
                className={`mt-[0.4rem] text-xs text-[var(--cl-snd-600)] w-full flex ${
                  !isMyMessage && "justify-end"
                }`}
              >
                {getTime(message.timestamp)}
              </span>
            )}
          </div>
        </PopoverMenu>
        {message.reactions.length > 0 && (
          <div
            className={`absolute -bottom-[1.6rem] ${
              isMyMessage ? "right-0" : "left-0"
            }`}
          >
            <PopoverMenu
              isOpen={showReactionPopover}
              clickOutsideCapture={false}
              positions={["bottom", "top"]}
              content={
                <div
                  onMouseEnter={() => setShowReactionPopover(true)}
                  onMouseLeave={() => setShowReactionPopover(false)}
                  className="grid gap-2 bg-white p-2 shadow-2xs rounded border border-gray-200"
                >
                  {message.reactions.map(({ userId, emoji }) => (
                    <div className="flex gap-3 items-end justify-between">
                      <div className="flex gap-2 items-end">
                        <div className="w-[1.5rem]">
                          <Avatar
                            imgUrl={
                              users[userId]?.profilePictureUrl ||
                              "https://i.pravatar.cc/150?img=1"
                            }
                            isOnline={false}
                          />
                        </div>
                        <span className="text-[0.8rem]">
                          {users[userId]?.name || "unknow"}
                        </span>
                      </div>
                      <span className="text-[0.8rem]">{emoji}</span>
                    </div>
                  ))}
                </div>
              }
            >
              <div
                onMouseEnter={() => setShowReactionPopover(true)}
                onMouseLeave={() => setShowReactionPopover(false)}
                className="cursor-pointer bg-[var(--cl-snd-200)] py-[0.2rem] px-[0.4rem] rounded-full border-[0.2rem] border-white flex items-end justify-center gap-1"
              >
                {message.reactions.slice(0, 5).map(({ emoji }, i) => (
                  <span key={`messsage-${message.id}-reaction-${i}`}>
                    {emoji}
                  </span>
                ))}
                {message.reactions.length > 5 && <span>...</span>}
                <small className="mr-1">{message.reactions.length}</small>
              </div>
            </PopoverMenu>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default MessageContent;
