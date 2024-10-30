const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


const allowedOrigins = [
  'https://ominous-space-pancake-54prvxqj4q9h47pg-8080.app.github.dev', // Your actual frontend origin
  'https://ominous-space-pancake-54prvxqj4q9h47pg-3000.app.github.dev', // If this is also an origin that should be allowed
];

// // CORS configuration
app.use(cors({
  origin: allowedOrigins, // Use your actual domain names
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true, // Allow credentials (like cookies)
}));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ominous-space-pancake-54prvxqj4q9h47pg-3000.app.github.dev'); // Change to your actual origin
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const VoteSchema = new mongoose.Schema({
  cats: { type: Number, default: 0 },
  dogs: { type: Number, default: 0 },
});

const Vote = mongoose.model('Vote', VoteSchema);

mongoose.connect('mongodb://localhost:27017/votes', {
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
},);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
