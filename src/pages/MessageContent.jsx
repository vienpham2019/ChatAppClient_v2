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
import { FiDownload } from "react-icons/fi";
import Tooltip from "../components/Tooltip";
import { getTime } from "../helper";
import Avatar from "../components/Avatar";
import MessageReply from "./MessageReply";
import { useGetMessageById } from "../store/messageStore";
import { modalEnum, setShowModal } from "../store/modalSlice";

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
  if (editMessageId === message.id) renderEdditMessage();
  const renderEdditMessage = () => {
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
  };

  const renderDeletedMessage = () => {
    const senderName = users[message.userId]?.name?.split(" ")[0] || "Someone";
    return (
      <div className="flex items-center border border-gray-400 px-2 text-[0.9em] text-[var(--cl-snd-500)] rounded-2xl">
        {isMyMessage ? (
          <span>You removed a message</span>
        ) : (
          <span>{senderName} unsent a message</span>
        )}
      </div>
    );
  };

  const renderReactions = () => {
    if (!message.reactions?.length) return null;

    return (
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
              {message.reactions.map(({ userId, emoji }, i) => (
                <div
                  key={`reaction-${i}`}
                  className="flex gap-3 items-end justify-between"
                >
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
                    <span className="text-[0.8rem] max-w-[10rem] truncate">
                      {users[userId]?.name || "Unknown"}
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
              <span key={`messsage-${message.id}-reaction-${i}`}>{emoji}</span>
            ))}
            {message.reactions.length > 5 && <span>...</span>}
            <small className="mr-1">{message.reactions.length}</small>
          </div>
        </PopoverMenu>
      </div>
    );
  };

  const renderImages = () => {
    const images = [
      "https://plus.unsplash.com/premium_photo-1675432656807-216d786dd468?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Dog
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6", // Cat
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Rabbit
      "https://images.unsplash.com/photo-1497206365907-f5e630693df0?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    return (
      <div
        className={`${
          images.length > 1 && "grid items-center grid-cols-2 gap-2"
        }`}
      >
        {images.slice(0, images.length > 4 ? 3 : 4).map((imgUrl, index) => (
          <div
            className="group relative "
            onClick={() => {
              console.log("call set modal from message content");
              dispatch(setShowModal(modalEnum.GalleryModal));
            }}
          >
            <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <Tooltip text={"Download Image"}>
                <button className="cursor-pointer inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                  <FiDownload className="w-4 h-4 text-white" />
                </button>
              </Tooltip>
            </div>
            <img src={imgUrl} className="rounded-lg max-h-[30rem]" />
          </div>
        ))}
        {images.length > 4 && (
          <div className="group relative">
            <button className="cursor-pointer absolute w-full h-full bg-gray-900/90 hover:bg-gray-900/50 transition-all duration-300 rounded-lg flex items-center justify-center">
              <span className="text-xl font-medium text-white">
                +{images.length - 3}
              </span>
            </button>
            <img src={images[3]} className="rounded-lg" />
          </div>
        )}
      </div>
    );
  };

  const renderMessageContent = () => {
    const {
      isGroupedWithNext: isGN,
      isGroupedWithPrev: isGP,
      reactions,
    } = message;
    const groupedClasses = `relative
    ${isMyMessage ? "bg-[var(--cl-prim-200)]" : "bg-[var(--cl-snd-200)]"}
    ${reactions.length !== 0 && "mb-[1.4rem]"} 
    ${isGN && !isMyMessage && "rounded-bl-sm"}  
    ${isGP && !isMyMessage && "rounded-tl-sm"}  
    ${isGN && isMyMessage && "rounded-br-sm"}  
    ${isGP && isMyMessage && "rounded-tr-sm"}  
    text-[0.9em] text-[var(--cl-snd-800)] rounded-2xl px-[1rem] py-[0.6rem]
    `;

    return (
      <div className={groupedClasses}>
        {!isMyMessage && !isGP && (
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
            className="cursor-pointer max-w-[40rem]"
            onClick={() => setShowSubEditMenu(["Main Popover"])}
          >
            {replyMessage && (
              <MessageReply message={replyMessage} isCloseBtn={false} />
            )}
            {message?.images?.length > 0 && renderImages()}
            <p>{message.message}</p>
            {!isGN && (
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

        {renderReactions()}
      </div>
    );
  };

  const handleDisplayMessage = () => {
    if (!message) return null;
    if (message.isDeleted) return renderDeletedMessage();
    return renderMessageContent();
  };

  return (
    <div
      className={`flex ${isMyMessage && "flex-row-reverse"} ${
        !message?.isGroupedWithPrev && "mt-[1.5rem]"
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
      {handleDisplayMessage()}
    </div>
  );
};

export default MessageContent;
