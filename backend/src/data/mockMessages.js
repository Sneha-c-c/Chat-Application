
let nextMessageId = 3;

const messages = [
  {
    id: 1,
    text: 'Welcome to the DataStride chat demo!',
    tags: []
  },
  {
    id: 2,
    text: 'Try tagging someone like @john_doe or @datastride_team',
    tags: ['john_doe', 'datastride_team']
  }
];

function getAllMessages() {
  return messages;
}

function addMessage(text, tags) {
  const trimmed = (text || '').trim();
  if (!trimmed) {
    throw new Error('Message text is required');
  }
  const msg = {
    id: nextMessageId++,
    text: trimmed,
    tags: Array.isArray(tags) ? tags : []
  };
  messages.push(msg);
  return msg;
}

module.exports = {
  getAllMessages,
  addMessage
};
