const { getAllTags, searchTags, addTag } = require('../data/mockTags');

function getTags(req, res) {
  try {
    const { query } = req.query;
    if (query && query.length > 0) {
      const filtered = searchTags(query);
      res.json(filtered);
    } else {
      const all = getAllTags();
      res.json(all);
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tags' });
  }
}

function createTag(req, res) {
  try {
    const { name } = req.body;
    const newTag = addTag(name);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to create tag' });
  }
}

module.exports = {
  getTags,
  createTag
};
