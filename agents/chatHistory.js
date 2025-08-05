let chatLog = [];

export function addToChatHistory(message) {
  chatLog.push({ message, timestamp: new Date().toISOString() });
}

export function getChatHistory() {
  return chatLog;
}

export function clearChatHistory() {
  chatLog = [];
}
