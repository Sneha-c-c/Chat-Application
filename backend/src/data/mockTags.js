
let nextTagId = 6;

const tags = [
  { id: 1, name: 'john_doe' },
  { id: 2, name: 'jane_smith' },
  { id: 3, name: 'datastride_team' },
  { id: 4, name: 'frontend' },
  { id: 5, name: 'backend' }
];

function getAllTags() {
  return tags;
}

function searchTags(query) {
  if (!query) {
    return tags;
  }
  const q = query.toLowerCase();
  return tags.filter((t) => t.name.toLowerCase().includes(q));
}

function addTag(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    throw new Error('Tag name is required');
  }
  const exists = tags.find(
    (t) => t.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (exists) {
    return exists;
  }
  const newTag = {
    id: nextTagId++,
    name: trimmed
  };
  tags.push(newTag);
  return newTag;
}

module.exports = {
  getAllTags,
  searchTags,
  addTag
};
