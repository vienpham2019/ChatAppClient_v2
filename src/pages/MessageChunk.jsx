import Avatar from "../components/Avatar";
import { getUniqueNum } from "../helper";
import MessageContent from "./MessageContent";

const MessageChunk = ({ groupedMessage, isReverse = false }) => {
  const getGroupMessageClass = (index) => {
    const length = groupedMessage.messages.length;
    if (length === 1) return "";
    const direction = isReverse ? "e" : "s";
    if (index === length - 1) {
      return `rounded-s${direction}-md`;
    }
    if (index === 0) {
      return `rounded-e${direction}-md`;
    }
    return `rounded-${direction}-md`;
  };

  return (
    <div className={`flex ${isReverse && "justify-end "}`}>
      <div
        className={`flex gap-[1rem] w-[70%] ${isReverse && "flex-row-reverse"}`}
      >
        <div className="w-[2.3rem]">
          <Avatar imgUrl={groupedMessage.avatarImg} isOnline={true} />
        </div>

        <div className="grid gap-[0.2rem] relative">
          {groupedMessage.sender !== "You" && (
            <span className="absolute -top-[1.2rem] text-[0.8rem] text-[var(--cl-snd-400)]">
              {groupedMessage.sender}
            </span>
          )}
          {groupedMessage.messages.map((message, i) => (
            <div key={getUniqueNum()}>
              <MessageContent
                message={message}
                timestamp={groupedMessage.timestamp}
                isDisplayTime={groupedMessage.messages.length - 1 === i}
                isReverse={isReverse}
                className={getGroupMessageClass(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageChunk;
