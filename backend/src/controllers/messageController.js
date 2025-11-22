const { getAllMessages, addMessage } = require('../data/mockMessages');

function getMessages(req, res) {
  try {
    const all = getAllMessages();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
}

function createMessage(req, res) {
  try {
    const { text, tags } = req.body;
    const msg = addMessage(text, tags);
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to create message' });
  }
}

module.exports = {
  getMessages,
  createMessage
};
