import { useEffect, useRef, useState } from "react";
import Avatar from "../components/Avatar";
import { IoSearch } from "react-icons/io5";
import { IoMdInformationCircle, IoMdMore } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdOutlineVideocam } from "react-icons/md";
import CustomEmojiModal from "../components/CustomEmojiModal";
import EmojiPickerMenu from "../components/EmojiPickerMenu";
import Tooltip from "../components/Tooltip";
import { VscSend } from "react-icons/vsc";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePaperClip } from "react-icons/hi2";
import MessageReply from "./MessageReply";
import MessageContent from "./MessageContent";
import { getTime } from "../helper";
import { useGetUserProfile } from "../store/userStore";
import { useGetAllMessage } from "../store/messageStore";
import { useGetChatRoomInfo } from "../store/chatRoomStore";

const MessagesContainer = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiMenuRef = useRef();
  const emojiSkinRef = useRef();
  const { data: chatRoom, isLoading: chatRoomInfoLoading } =
    useGetChatRoomInfo(1);

  useEffect(() => {
    console.log(chatRoom);
  }, [chatRoom]);

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

  const { data: user } = useGetUserProfile("user1");

  const { data: messages, isLoading: messagesLoading } = useGetAllMessage();
  console.log(messages);
  const handleOnChange = (e) => {};

  const getIsDisplayForMessage = (index) => {
    const current = messages[index];
    const previous = messages[index - 1];
    const next = messages[index + 1];

    const isDisplay = {
      avatar: true,
      time: true,
      name: true,
    };

    // If previous message is from the same user, hide avatar and name
    if (
      previous?.userId === current.userId &&
      getTime(previous.timestamp) === getTime(current.timestamp)
    ) {
      isDisplay.avatar = false;
      isDisplay.name = false;
    }

    // If next message is from the same user and close in time, hide time
    if (
      next?.userId === current.userId &&
      getTime(next.timestamp) === getTime(current.timestamp)
    ) {
      isDisplay.time = false;
    }

    return isDisplay;
  };
  if (messagesLoading || chatRoomInfoLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-col h-screen bg-white flex-1">
      <CustomEmojiModal isOpen={true} />
      {/* Header */}
      <div className="flex items-center justify-between p-4  border-[var(--cl-snd-200)] bg-black/5">
        <div className="flex items-center gap-3">
          <Avatar imgUrl={user?.profilePictureUrl} isOnline={true} />
          <div>
            <h1 className="font-semibold text-gray-800">Victoria Lane</h1>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button className="cursor-pointer text-[1.5rem] text-[var(--cl-snd-600)] hover:bg-[var(--cl-snd-200)] p-[0.5rem] rounded-full">
            <IoSearch />
          </button>
          <button className="cursor-pointer text-[1.5rem] text-[var(--cl-snd-600)] hover:bg-[var(--cl-snd-200)] p-[0.5rem] rounded-full">
            <PiPhoneCallFill />
          </button>
          <button className="cursor-pointer text-[1.5rem] text-[var(--cl-snd-600)] hover:bg-[var(--cl-snd-200)] p-[0.5rem] rounded-full">
            <MdOutlineVideocam />
          </button>
          <button className="cursor-pointer text-[1.5rem] text-[var(--cl-snd-600)] hover:bg-[var(--cl-snd-200)] p-[0.5rem] rounded-full">
            <IoMdInformationCircle />
          </button>
          <button className="cursor-pointer text-[1.5rem] text-[var(--cl-snd-600)] hover:bg-[var(--cl-snd-200)] p-[0.5rem] rounded-full">
            <IoMdMore />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-[2rem] space-y-1 grid items-end">
        {messages.map((message, index) => (
          <div key={`messsage-${index}`}>
            <MessageContent message={message} />
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-[var(--cl-snd-200)] p-3">
        <div className="grid gap-1 px-[2rem]">
          <div className="grid gap-[0.2rem] rounded border border-[var(--cl-snd-200)] p-2">
            {/* reply message */}
            <MessageReply message={messages[5]} isCloseBtn={true} />
            {/* reply message */}
            <textarea
              onChange={handleOnChange}
              type="text"
              value={inputMessage}
              placeholder="Enter Message..."
              className="px-[1rem] w-full py-[0.7rem] resize-none focus:outline-0"
            />
            <div className="flex w-full justify-end gap-[0.8rem] items-center">
              <EmojiPickerMenu
                isOpen={isEmojiOpen}
                positions={["top", "bottom"]}
                showCustomModal={false}
                menuRef={emojiMenuRef}
                skinRef={emojiSkinRef}
              >
                <button onClick={() => setIsEmojiOpen(!isEmojiOpen)}>
                  <Tooltip text={"More reactions"}>
                    <BsEmojiSmile
                      className={`text-[1.3rem] ${
                        isEmojiOpen
                          ? "text-[var(--cl-prim-600)]"
                          : "text-[var(--cl-snd-600)] "
                      } cursor-pointer hover:text-[var(--cl-prim-600)]`}
                    />
                  </Tooltip>
                </button>
              </EmojiPickerMenu>
              <button className="border-r pr-2 border-[var(--cl-snd-300)]">
                <Tooltip text={"Attach file"}>
                  <HiOutlinePaperClip className="text-[1.3rem] cursor-pointer text-[var(--cl-snd-600)]  hover:text-[var(--cl-prim-600)]" />
                </Tooltip>
              </button>
              <button>
                <Tooltip text={"Send"}>
                  <VscSend className="text-[1.3rem] cursor-pointer text-[var(--cl-snd-600)]  hover:text-[var(--cl-prim-600)]" />
                </Tooltip>
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1 ml-2 flex items-center gap-[0.5rem]">
            <span>Victoria Lane is typing</span>
            <lord-icon
              src="https://cdn.lordicon.com/jpgpblwn.json"
              trigger="loop"
              state="loop-transparency"
              colors="primary:#848484"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
