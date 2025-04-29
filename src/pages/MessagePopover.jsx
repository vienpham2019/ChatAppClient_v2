import { MdOutlineAddReaction, MdOutlineReply } from "react-icons/md";

import { IoIosMore } from "react-icons/io";
import Tooltip from "../components/Tooltip";
import { PopoverMenu } from "../components/PopOver";
import EmojiPickerMenu from "../components/EmojiPickerMenu";
import { FaPencil } from "react-icons/fa6";
import MessageEditMenu from "./MessageEditMenu";

const MessagePopover = ({
  isReverse = false,
  setShowSubEditMenu,
  showSubEditMenu,
}) => {
  const reactions = [
    { emoji: "👍", label: "Thumbs Up" },
    { emoji: "😄", label: "Smile" },
    { emoji: "❤️", label: "Red Heart" },
    { emoji: "😲", label: "Surprised" },
  ];
  return (
    <div className="bg-white my-3">
      <div className="grid gap-1">
        <div className="border border-[var(--cl-snd-300)] relative flex gap-[0.7rem] px-[0.7rem] py-[0.5rem] rounded items-center">
          {reactions.map(({ emoji, label }) => (
            <div
              key={"default emoji " + label}
              className="cursor-pointer flex items-center"
            >
              <Tooltip text={label}>
                <span>{emoji}</span>
              </Tooltip>
            </div>
          ))}
          <div className="cursor-pointer flex items-center pr-[0.5rem] border-r border-[var(--cl-snd-300)]">
            <PopoverMenu
              isOpen={
                showSubEditMenu.length > 1 &&
                showSubEditMenu[1] === "More Emoji"
              }
              setIsOpen={() =>
                setShowSubEditMenu((prev) => {
                  if (prev.indexOf("More Emoji") === -1) {
                    return [prev[0], "More Emoji"];
                  }
                })
              }
              onClickOutside={() => {
                if (showSubEditMenu.indexOf("Emoji Picker") !== -1) {
                  setShowSubEditMenu((prev) =>
                    prev.filter((item) => item !== "Emoji Picker")
                  );
                } else {
                  setShowSubEditMenu([]);
                }
              }}
              positions={["right", "left"]}
              content={
                <EmojiPickerMenu
                  onClose={() => {
                    setShowSubEditMenu((prev) =>
                      prev.filter((item) => item !== "Emoji Picker")
                    );
                  }}
                  onOpen={() => {
                    setShowSubEditMenu((prev) => {
                      if (prev.indexOf("Emoji Picker") === -1) {
                        return [...prev, "Emoji Picker"];
                      }
                    });
                  }}
                />
              }
            >
              <div
                onClick={() => {
                  setShowSubEditMenu((prev) => {
                    if (prev.indexOf("More Emoji") === -1) {
                      return [prev[0], "More Emoji"];
                    } else {
                      return [prev[0]];
                    }
                  });
                }}
              >
                <Tooltip text={"More reactions"}>
                  <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                    <MdOutlineAddReaction />
                  </span>
                </Tooltip>
              </div>
            </PopoverMenu>
          </div>
          {isReverse ? (
            <div className="cursor-pointer flex items-center">
              <Tooltip text={"Edit"}>
                <span className="text-[1rem] text-[var(--cl-snd-600)]">
                  <FaPencil />
                </span>
              </Tooltip>
            </div>
          ) : (
            <div className="cursor-pointer flex items-center">
              <Tooltip text={"Reply"}>
                <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                  <MdOutlineReply />
                </span>
              </Tooltip>
            </div>
          )}

          <PopoverMenu
            isOpen={
              showSubEditMenu.length > 1 && showSubEditMenu[1] === "Edit Menu"
            }
            setIsOpen={() =>
              setShowSubEditMenu((prev) => {
                if (prev.indexOf("Edit Menu") === -1) {
                  return [...prev, "Edit Menu"];
                }
              })
            }
            onClickOutside={() => {
              setShowSubEditMenu([]);
            }}
            positions={["right", "left"]}
            content={<MessageEditMenu isReverse={isReverse} />}
          >
            <div
              className="cursor-pointer flex items-center"
              onClick={() => {
                setShowSubEditMenu((prev) => {
                  if (prev.indexOf("Edit Menu") === -1) {
                    return [prev[0], "Edit Menu"];
                  } else {
                    return [prev[0]];
                  }
                });
              }}
            >
              <Tooltip text={"More options"}>
                <span className="text-[1.5rem] text-[var(--cl-snd-600)]">
                  <IoIosMore />
                </span>
              </Tooltip>
            </div>
          </PopoverMenu>
        </div>
      </div>
    </div>
  );
};

export default MessagePopover;
