const express = require('express');
const cors = require('cors');
const tagRoutes = require('./routes/tagRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/tags', tagRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('DataStride chat backend is running');
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
