import { IoAddSharp } from "react-icons/io5";
import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";
import { RxCross1 } from "react-icons/rx";
import EmojiPickerMenu from "./EmojiPickerMenu";
import { useDispatch, useSelector } from "react-redux";
import { modalEnum, setShowModal } from "../store/modalSlice";

const CustomEmojiModal = () => {
  const dispatch = useDispatch();
  const emojiMenuRef = useRef();
  const emojiSkinRef = useRef();

  const { showModal } = useSelector((state) => state.modal);
  const [isSave, setIsSave] = useState(false);
  const [selectEmoji, setSelectEmoji] = useState();
  const [showEmojiPickerIndex, setEmojiPickerIndex] = useState(-1);
  const reactions = [
    { emoji: "👍", label: "Thumbs Up" },
    { emoji: "😄", label: "Smile" },
    { emoji: "❤️", label: "Red Heart" },
    { emoji: "😲", label: "Surprised" },
    null,
  ];

  const menuRef = useRef();

  const handleClickOutside = (e) => {
    if (showModal !== modalEnum?.CustomEmojiModal) return;
    if (
      !menuRef?.current?.contains(e.target) &&
      !emojiMenuRef?.current?.contains(e.target) &&
      !emojiSkinRef?.current?.contains(e.target)
    ) {
      setEmojiPickerIndex(-1);
      dispatch(setShowModal(null));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayEmoji = (reaction, index) => {
    return (
      <EmojiPickerMenu
        isOpen={showEmojiPickerIndex === index}
        positions={["bottom", "top"]}
        showCustomModal={false}
        containerClassName="z-20"
        menuRef={emojiMenuRef}
        skinRef={emojiSkinRef}
      >
        <div
          onMouseEnter={() => {
            setSelectEmoji(reaction?.emoji || null);
          }}
          onMouseLeave={() => {
            setSelectEmoji(null);
          }}
          onClick={() => {
            setEmojiPickerIndex((prev) => (prev === index ? -1 : index));
          }}
          className="relative cursor-pointer hover:bg-[var(--cl-snd-50)] w-[2.7rem] aspect-square flex items-center justify-center rounded border border-[var(--cl-snd-300)]"
        >
          {reaction?.emoji ? (
            <div>
              {selectEmoji === reaction.emoji && (
                <div className="absolute -top-[0.7rem] left-[2rem] bg-gray-50 rounded shadow-lg border border-gray-100 flex items-center justify-center w-[1.4rem] aspect-square">
                  <Tooltip text={"Remove reaction"} dir={"top"}>
                    <RxCross1 className="text-[0.8rem]" />
                  </Tooltip>
                </div>
              )}
              <Tooltip text={reaction?.label} dir={"bottom"}>
                <div> {reaction.emoji}</div>
              </Tooltip>
            </div>
          ) : (
            <Tooltip text={"Chose an emoji"} dir={"bottom"}>
              <IoAddSharp className="text-[1.3rem]" />
            </Tooltip>
          )}
        </div>
      </EmojiPickerMenu>
    );
  };
  return (
    <Modal isOpen={showModal === modalEnum.CustomEmojiModal}>
      <div ref={menuRef} className="p-4 grid gap-2">
        <h2 className="text-[1.2rem] font-semibold">
          Customize your default reactions
        </h2>
        <span className="text-[var(--cl-snd-700)] text-[0.9rem]">
          Click on reaction below, then choose an emoji to replace it with.
        </span>
        <div className="flex gap-[1rem] justify-center items-center my-[0.6rem]">
          {reactions.map((reaction, index) => displayEmoji(reaction, index))}
        </div>
        <div className="flex justify-end gap-4 text-[0.9rem] mt-[2rem]">
          <button
            onClick={() => {
              setEmojiPickerIndex(-1);
              {
                console.log("call set modal from custom emoji modal");
                dispatch(setShowModal(modalEnum.GalleryModal));
              }
              dispatch(setShowModal(null));
            }}
            className="cursor-pointer hover:bg-gray-100 border border-[var(--cl-snd-500)] w-[6rem] p-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            className={`${
              isSave
                ? "cursor-pointer hover:bg-gray-100 border border-[var(--cl-snd-500)]"
                : "bg-[var(--cl-snd-200)] text-[var(--cl-snd-400)] cursor-not-allowed"
            }  w-[6rem] p-2 rounded-lg`}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomEmojiModal;
