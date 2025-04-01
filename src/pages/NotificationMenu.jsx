import { IoMdNotifications } from "react-icons/io";
import Avatar from "../components/Avatar";
import { calTimeAgo } from "../helper/index.js";

const NotificationMenu = () => {
  const notifications = [
    {
      names: ["Victoria Lane", "Adinda Kirana"],
      imgs: [
        "https://i.pravatar.cc/150?img=3",
        "https://i.pravatar.cc/150?img=9",
      ],
      type: "FriendRequestAccepted",
    },
    {
      id: "1",
      name: "Victoria Lane",
      type: "FriendRequest",
      img: "https://i.pravatar.cc/150?img=1",
      requestDay: "2025-04-01T09:59:00",
    },
    {
      id: "2",
      name: "Adinda Kirana",
      type: "FriendRequest",
      img: "https://i.pravatar.cc/150?img=2",
      requestDay: "2025-03-31T23:00:00",
    },
    {
      id: "3",
      name: "Alaya Cordova",
      type: "FriendRequest",
      img: "https://i.pravatar.cc/150?img=3",
      requestDay: "2025-03-31T10:00:00",
    },
    {
      id: "4",
      name: "Alaya Cordova",
      type: "FriendRequest",
      img: "https://i.pravatar.cc/150?img=5",
      requestDay: "2025-03-31T10:00:00",
    },
  ];

  const displayAcceptFriendRequest = ({ names, imgs }) => {
    return (
      <div className="flex gap-[0.4rem] border-y border-[var(--cl-snd-300)] py-[0.5rem]">
        <div
          className={`flex items-center ${
            imgs[1] ? "min-w-[6rem]" : "min-w-[4rem] justify-center"
          } relative`}
        >
          {" "}
          {/* // 2 7rem */}
          <div className="z-[1] border-[0.2rem] rounded-full border-white">
            <Avatar imgUrl={imgs[0]} />
          </div>
          {imgs[1] && (
            <div className="absolute left-[2.4rem]">
              <Avatar imgUrl={imgs[1]} />
            </div>
          )}
        </div>
        <span className="text-[0.7rem] flex-auto">
          <strong>{names[0]}</strong>{" "}
          {names[1] && (
            <>
              {" and "}
              <strong>{names[1]}</strong>
            </>
          )}
          {names[2] && ` and ${names.length - 2} other`}
          {names.length - 2 > 1 ? "s " : " "}
          accepted your friend reuqest{names.length > 1 && "s"}.
        </span>
      </div>
    );
  };

  const displayFriendRequest = ({ name, requestDay, img }) => {
    return (
      <div className="px-4 py-2">
        <div className="flex gap-[0.6rem] items-center">
          <Avatar imgUrl={img} />
          <div className="flex-1">
            <div>
              <div>
                <strong className="text-[var(--cl-snd-800)] mr-1">
                  {name}
                </strong>
                <span className="text-[var(--cl-snd-600)] text-[0.8rem]">
                  sent you a friend request.{" "}
                </span>
              </div>
              <span className="font-bold text-[0.8rem] text-[var(--cl-prim-400)]">
                {calTimeAgo(requestDay)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-[0.6rem] flex gap-3">
          <button className="border rounded flex-auto cursor-pointer text-[var(--cl-prim-400)] hover:text-[var(--cl-prim-700)]">
            Accept
          </button>
          <button className="border rounded flex-auto cursor-pointer text-[var(--cl-snd-400)] hover:text-[var(--cl-snd-700)]">
            Delete
          </button>
        </div>
      </div>
    );
  };
  const displayNotifications = () => {
    if (notifications.length === 0) {
      return displayNoNotifications();
    }
    return (
      <div className="space-y-6">
        {/* April 3 Group */}
        <div className="grid gap-1">
          {notifications.map((request) => {
            if (request.type === "FriendRequest") {
              return displayFriendRequest(request);
            } else if (request.type === "FriendRequestAccepted") {
              return displayAcceptFriendRequest(request);
            }
          })}
        </div>
      </div>
    );
  };

  const displayNoNotifications = () => {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          <IoMdNotifications className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="font-medium text-gray-700">No Notifications</h3>
        <p className="text-sm text-gray-500 mt-1">Notification Inbox Empty</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-72 bg-white border-r border-[var(--cl-snd-200)] overflow-y-auto h-screen">
      <div className="px-4 pt-4 overflow-y-auto">
        <div className=" flex items-center justify-between mb-[0.5rem]">
          <h2 className="text-gray-700 font-medium flex items-center">
            Notifications{" "}
            <span className="text-xs text-gray-500 ml-1">(4)</span>
          </h2>
        </div>
        {displayNotifications()}
      </div>
    </div>
  );
};

export default NotificationMenu;
