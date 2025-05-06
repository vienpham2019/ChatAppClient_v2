import { BsPinFill } from "react-icons/bs";
import { FaCopy, FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { ImReply } from "react-icons/im";
import { MdGTranslate, MdOutlineReply } from "react-icons/md";

const MessageEditMenu = ({ isReverse, menuRef }) => {
  return (
    <div
      ref={menuRef}
      className="mx-4 overflow-hidden grid gap-1 text-[var(--cl-snd-600)] shadow-2xs text-[0.8rem] w-[8rem] rounded bg-white border border-[var(--cl-snd-300)]"
    >
      {!isReverse && (
        <span className="cursor-pointer px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)] ">
          Reply
          <ImReply />
        </span>
      )}
      <span className="cursor-pointer px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
        Copy
        <FaCopy />
      </span>
      <span className="cursor-pointer px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
        Forward
        <MdOutlineReply className="text-[1.2rem]" />
      </span>
      <hr className="text-gray-300" />
      <span className="cursor-pointer px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
        Pin
        <BsPinFill />
      </span>
      <span className="cursor-pointer px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
        Translate
        <MdGTranslate />
      </span>
      {isReverse && (
        <>
          <hr className="text-gray-300" />
          <span className="cursor-pointer px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
            Edit
            <FaPencil />
          </span>
          <span className="cursor-pointer px-2 py-1 flex w-full justify-between items-center hover:bg-[var(--cl-snd-300)]">
            Delete
            <FaRegTrashAlt />
          </span>
        </>
      )}
    </div>
  );
};

export default MessageEditMenu;
