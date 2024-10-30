const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const VoteSchema = new mongoose.Schema({
  cats: { type: Number, default: 0 },
  dogs: { type: Number, default: 0 },
});

const Vote = mongoose.model('Vote', VoteSchema);

mongoose.connect('mongodb://mongo:27017/votes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/votes', async (req, res) => {
  let votes = await Vote.findOne();
  if (!votes) {
    votes = new Vote();
    await votes.save();
  }
  res.json(votes);
});

app.post('/api/votes', async (req, res) => {
  const { animal } = req.body;
  let votes = await Vote.findOne();
  if (animal === 'cats') votes.cats += 1;
  if (animal === 'dogs') votes.dogs += 1;
  await votes.save();
  res.json(votes);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
