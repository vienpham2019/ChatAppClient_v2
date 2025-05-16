import { createSlice } from "@reduxjs/toolkit";
const messages = [
  {
    id: "msg1",
    userId: "user1", // Alice's user ID
    message: "Hey! Are we still on for the meeting today?",
    timestamp: "2025-04-11T09:15:00Z",
    isEdit: false,
    reactions: [
      { userId: "user2", emoji: "👍", emojiLabel: "thumbs up" },
      { userId: "user3", emoji: "✅", emojiLabel: "check mark" },
    ],
    attachments: [], // no attachments
    isDeleted: false,
  },
  {
    id: "msg2",
    userId: "user1", // Alice's user ID
    message: "Just finished the report.",
    timestamp: "2025-04-11T09:15:30Z",
    isEdit: true,
    reactions: [{ userId: "user4", emoji: "🎉", emojiLabel: "party popper" }],
    attachments: [
      { fileUrl: "https://example.com/report.pdf", fileType: "file" }, // file attachment
    ],
    isDeleted: false,
  },
  {
    id: "msg3",
    userId: "user2", // Bob's user ID
    message: "Great work on the report!",
    timestamp: "2025-04-11T09:17:22Z",
    isEdit: false,
    replyTo: "msg2", // replying to Alice's report
    reactions: [
      { userId: "user1", emoji: "😊", emojiLabel: "smiling face" },
      { userId: "user5", emoji: "👏", emojiLabel: "clapping hands" },
    ],
    attachments: [], // no attachments
    isDeleted: false,
  },
  {
    id: "msg4",
    userId: "user3", // Carol's user ID
    message: "I’ll bring the slides for the presentation.",
    timestamp: "2025-04-11T09:21:10Z",
    isEdit: false,
    reactions: [],
    attachments: [], // no attachments
    isDeleted: false,
  },
  {
    id: "msg5",
    userId: "user3", // Dave's user ID
    message: "Meeting is in Room 302, right?",
    timestamp: "2025-04-11T09:21:45Z",
    isEdit: false,
    reactions: [],
    attachments: [], // no attachments
    isDeleted: false,
  },
  {
    id: "msg5",
    userId: "user3", // Dave's user ID
    message: "I mean 301 !",
    timestamp: "2025-04-11T09:21:45Z",
    isEdit: false,
    reactions: [],
    attachments: [], // no attachments
    isDeleted: false,
  },
  {
    id: "msg6",
    userId: "user3", // Eve's user ID
    message: "Running 5 minutes late, sorry!",
    timestamp: "2025-04-11T09:23:00Z",
    isEdit: false,
    reactions: [{ userId: "user2", emoji: "⏱️", emojiLabel: "stopwatch" }],
    attachments: [], // no attachments
    isDeleted: false,
  },
  {
    id: "msg7",
    userId: "user1", // Alice's user ID
    message: "Yes, Room 302. See you soon!",
    timestamp: "2025-04-11T09:24:30Z",
    isEdit: true,
    replyTo: "msg5", // replying to Dave
    reactions: [
      { userId: "user3", emoji: "🙂", emojiLabel: "slightly smiling face" },
      { userId: "user4", emoji: "👍", emojiLabel: "thumbs up" },
    ],
    attachments: [], // no attachments
    isDeleted: false,
  },
  // 5 more added messages
  {
    id: "msg8",
    userId: "user1", // New User (Grace)
    message: "I'll bring snacks for the meeting!",
    timestamp: "2025-04-11T09:30:15Z",
    isEdit: false,
    reactions: [{ userId: "user2", emoji: "🍪", emojiLabel: "cookie" }],
    attachments: [],
    isDeleted: false,
  },
  {
    id: "msg9",
    userId: "user1", // New User (Henry)
    message: "Can't wait for the presentation!",
    timestamp: "2025-04-11T09:32:00Z",
    isEdit: false,
    reactions: [{ userId: "user3", emoji: "🎤", emojiLabel: "microphone" }],
    attachments: [],
    isDeleted: false,
  },
  {
    id: "msg10",
    userId: "user2", // New User (Ivy)
    message: "Is the meeting room available now?",
    timestamp: "2025-04-11T09:35:00Z",
    isEdit: false,
    reactions: [],
    attachments: [],
    isDeleted: false,
  },
  {
    id: "msg11",
    userId: "user2", // New User (Jack)
    message: "I'm ready for the meeting.",
    timestamp: "2025-04-11T09:40:10Z",
    isEdit: false,
    reactions: [],
    attachments: [],
    isDeleted: false,
  },
  {
    id: "msg12",
    userId: "user1", // Alice's user ID
    message: "Let's start the meeting!",
    timestamp: "2025-04-11T09:45:30Z",
    isEdit: false,
    reactions: [
      { userId: "user2", emoji: "🎉", emojiLabel: "party popper" },
      { userId: "user5", emoji: "👍", emojiLabel: "thumbs up" },
    ],
    attachments: [],
    isDeleted: false,
  },
];

const users = [
  {
    userId: "user1",
    name: "Alice Verzosa",
    profilePictureUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    userId: "user2",
    name: "Trent Riewe",
    profilePictureUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    userId: "user3",
    name: "Kimberly Claibome",
    profilePictureUrl: "https://i.pravatar.cc/150?img=9",
  },
];

const initialState = {
  showSubEditMenu: false,
  editMessageId: "1-1",
  messages,
  users,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setShowSubEditMenu(state, action) {
      state.showSubEditMenu = action.payload;
    },
    setEditMessageId(state, action) {
      state.editMessageId = action.payload;
    },
  },
});

export const { setShowSubEditMenu, setEditMessageId } = messageSlice.actions;
export default messageSlice.reducer;
