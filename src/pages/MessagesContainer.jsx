import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import {
  FaPhone,
  FaRegBookmark,
  FaRegSmileBeam,
  FaSearch,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoMdInformationCircle, IoMdMore, IoMdSend } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdOutlineVideocam, MdPhotoSizeSelectActual } from "react-icons/md";
import { LuPaperclip } from "react-icons/lu";
import { groupMessages } from "../helper/message";
import MessageChunk from "./MessageChunk";
import EmojiPickerMenu from "../components/EmojiPickerMenu";
const MessagesContainer = () => {
  const [inputMessage, setInputMessage] = useState("");
  const avatarImg = {
    Alice: "https://i.pravatar.cc/150?img=1",
    Bob: "https://i.pravatar.cc/150?img=4",
    You: "https://i.pravatar.cc/150?img=9",
  };
  const messages = [
    {
      sender: "Alice",
      message: "Hey! Are we still on for the meeting today?",
      timestamp: "2025-04-11T09:15:00Z",
    },
    {
      sender: "Alice",
      message: "Just finished the report.",
      timestamp: "2025-04-11T09:15:00Z",
    },
    {
      sender: "Alice",
      message: "Ok",
      timestamp: "2025-04-11T09:15:00Z",
    },

    {
      sender: "You",
      message: "Yes, let's start at 10 AM.",
      timestamp: "2025-04-11T09:16:25Z",
    },
    {
      sender: "You",
      message: "Yes, let's start at 10 AM.",
      timestamp: "2025-04-11T09:16:25Z",
    },
    {
      sender: "Alice",
      message: "Perfect. See you then!",
      timestamp: "2025-04-11T09:17:40Z",
    },
    {
      sender: "Bob",
      message: "Hey team, just joined the chat.",
      timestamp: "2025-04-11T09:18:10Z",
    },
    {
      sender: "You",
      message: "Welcome Bob!",
      timestamp: "2025-04-11T09:18:45Z",
    },
  ];

  const groupedMessages = groupMessages([messages[0]]).map((message) => ({
    ...message,
    avatarImg: avatarImg[message.sender],
  }));

  const handleOnChange = (e) => {};

  return (
    <div className="flex flex-col h-screen bg-white flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4  border-[var(--cl-snd-200)] bg-black/5">
        <div className="flex items-center gap-3">
          <Avatar imgUrl={"https://i.pravatar.cc/150?img=1"} isOnline={true} />
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
      <div className="flex-1 overflow-y-auto p-[2rem] space-y-6 grid items-end">
        {groupedMessages.map((messages, i) => {
          return (
            <div key={`Message Container - ${i}`}>
              <MessageChunk
                groupedMessage={messages}
                isReverse={messages.sender === "You"}
              />
            </div>
          );
        })}
        <EmojiPickerMenu />
      </div>

      {/* Message Input */}
      <div className="border-t border-[var(--cl-snd-200)] p-3">
        <div className="grid gap-1 px-[2rem]">
          <div className="flex items-center gap-[2rem]">
            <input
              onChange={handleOnChange}
              type="text"
              value={inputMessage}
              placeholder="Enter Message..."
              className="px-[1rem] rounded w-full bg-[var(--cl-prim-100)] py-[0.7rem]"
            />
            <button className="text-[var(--cl-prim-500)] w-[1rem] aspect-square">
              <FaRegSmileBeam />
            </button>
            <button className="text-[var(--cl-prim-500)] w-[1rem] aspect-square">
              <LuPaperclip />
            </button>
            <button className="text-[var(--cl-prim-500)] w-[1rem] aspect-square rounded">
              <MdPhotoSizeSelectActual />
            </button>
            <button className="flex items-center justify-center  text-[1.2rem] bg-[var(--cl-prim-400)] text-white h-[2.5rem] aspect-square rounded">
              <IoMdSend />
            </button>
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
