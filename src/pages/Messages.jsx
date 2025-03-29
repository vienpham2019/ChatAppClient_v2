import { useState } from "react";
import Avata from "../components/Avata";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";

const Messages = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(1);
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Victoria Lane",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey, I'm going to meet a friend of...",
      unread: true,
      online: true,
      favorite: true,
    },
    {
      id: 2,
      name: "Eva McDonald",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Yeah everything is fine. Our next meeting...",
      online: true,
    },
    {
      id: 3,
      name: "James Picard",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Wow that's great!",
    },
    {
      id: 4,
      name: "Ronald Downey",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Why I try this to get demo data following...",
    },
  ]);
  const [directMessages, setDirectMessages] = useState([
    {
      id: 5,
      name: "Nicholas Stokes",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Excited to meet you again!",
    },
    {
      id: 6,
      name: "Kathryn Pearsey",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "See you soon 👋",
      unread: true,
    },
    {
      id: 7,
      name: "Robert Ledsome",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for your answer!",
    },
    {
      id: 8,
      name: "Alaya Cordova",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hi there, how are you?",
    },
    {
      id: 9,
      name: "Adinda Kirana",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How are you and your family",
    },
    {
      id: 10,
      name: "John Foss",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Good Morning 😃",
      unread: true,
    },
    {
      id: 11,
      name: "Gloria Underhill",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "OK, sure",
    },
  ]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Victoria Lane",
      senderId: 1,
      content: "Good morning 👋",
      timestamp: "10:07 am",
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: "You",
      senderId: 0,
      content: "Good morning. How are you? What about our next meeting?",
      timestamp: "10:12 am",
      isCurrentUser: true,
    },
    {
      id: 3,
      sender: "Victoria Lane",
      senderId: 1,
      content: "Yeah everything is fine. Our next meeting tomorrow at 10:00 AM",
      timestamp: "10:13 am",
      isCurrentUser: false,
    },
    {
      id: 4,
      sender: "Victoria Lane",
      senderId: 1,
      content:
        "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁",
      timestamp: "10:13 am",
      isCurrentUser: false,
    },
    {
      id: 5,
      sender: "You",
      senderId: 0,
      content: "Wow that's great!",
      timestamp: "10:14 am",
      isCurrentUser: true,
    },
    {
      id: 6,
      sender: "Victoria Lane",
      senderId: 1,
      content: "",
      timestamp: "10:15 am",
      isCurrentUser: false,
      attachment: {
        name: "design-phase-1-approved.pdf",
        size: "2.3 MB",
        type: "pdf",
      },
    },
  ]);

  return <div></div>;
  return (
    <>
      {/* Contacts Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "hidden" : "fixed md:relative"
        } md:flex flex-col w-full md:w-72 bg-white border-r border-gray-200 z-30`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-700 font-medium flex items-center">
              Messages <span className="text-xs text-gray-500 ml-1">(128)</span>
            </h2>
          </div>
          <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search here..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-500 mb-3">
                FAVORITES
              </h3>
              <IoMdArrowDropdown />
            </div>
            <div className="space-y-1">
              {favorites.map((contact) => (
                <button
                  key={contact.id}
                  className={`w-full flex items-center p-2 rounded-lg ${
                    activeContact === contact.id
                      ? "bg-indigo-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setActiveContact(contact.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Avata
                    isOnline={contact.online}
                    imgUrl={`https://i.pravatar.cc/150?img=${contact.id}`}
                  />
                  <div className="ml-3 text-left flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {contact.name}
                      </p>
                      {contact.unread && (
                        <span className="w-[0.5rem] aspect-square bg-[var(--cl-prim-700)] rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--cl-snd-500)] truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 mb-3 flex justify-between">
              DIRECT MESSAGES
              <button className="text-[var(--cl-prim-700)]">
                {/* <ChevronDown size={16} /> */}
              </button>
            </h3>
            <div className="space-y-1">
              {directMessages.map((contact) => (
                <button
                  key={contact.id}
                  className={`w-full flex items-center p-2 rounded-lg ${
                    activeContact === contact.id
                      ? "bg-indigo-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setActiveContact(contact.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Avata
                    isOnline={contact.online}
                    imgUrl={`https://i.pravatar.cc/150?img=${contact.id}`}
                  />
                  <div className="ml-3 text-left flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {contact.name}
                      </p>
                      {contact.unread && (
                        <span className="h-2 w-2 bg-indigo-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-col flex-1 bg-white">
        {/* Chat Header */}
        {/* <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <img
                src={
                  activeContactData?.avatar ||
                  "/placeholder.svg?height=40&width=40"
                }
                alt={activeContactData?.name || "Contact"}
              />
            </Avatar>
            <div className="ml-3">
              <h2 className="text-sm font-medium">
                {activeContactData?.name || "Select a contact"}
              </h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-500 hover:text-gray-700">
              <Search size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Phone size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Video size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FileText size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Info size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical size={20} />
            </button>
          </div>
        </div> */}

        {/* Messages */}
        {/* <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!message.isCurrentUser && (
                <Avatar className="h-8 w-8 mt-1 mr-2">
                  <img
                    src={
                      activeContactData?.avatar ||
                      "/placeholder.svg?height=40&width=40"
                    }
                    alt={activeContactData?.name || "Contact"}
                  />
                </Avatar>
              )}
              <div className={`max-w-[70%]`}>
                {message.content && (
                  <div
                    className={`rounded-lg p-3 ${
                      message.isCurrentUser
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                )}
                {message.attachment && (
                  <div className="mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-3 flex items-center">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {message.attachment.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {message.attachment.size}
                        </p>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
                <div
                  className={`text-xs mt-1 ${
                    message.isCurrentUser
                      ? "text-right text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div> */}

        {/* Message Input */}
        {/* <div className="p-4 border-t border-gray-200">
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Smile size={20} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-0 focus:ring-0 text-sm px-3 py-2"
            />
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Paperclip size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-2 rounded-md ${
                newMessage.trim()
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Messages;
