export const groupMessages = (messages) => {
  const grouped = [];

  for (let i = 0; i < messages.length; i++) {
    const { sender, message, timestamp } = messages[i];
    const lastGroup = grouped[grouped.length - 1];

    if (
      lastGroup &&
      lastGroup.timestamp === timestamp &&
      lastGroup.sender === sender
    ) {
      lastGroup.messages.push(message);
    } else {
      grouped.push({
        sender,
        timestamp,
        messages: [message],
      });
    }
  }

  return grouped;
};
