import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [votes, setVotes] = useState({ cats: 0, dogs: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch initial vote counts from the backend
  useEffect(() => {
    axios.get('https://ominous-space-pancake-54prvxqj4q9h47pg-5000.app.github.dev/api/votes')
      .then(response => {
        setVotes(response.data);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching votes:', err));
  }, []);

  // Handle voting
  const vote = (animal) => {
    axios.post('https://ominous-space-pancake-54prvxqj4q9h47pg-5000.app.github.dev/api/votes', { animal })
      .then(response => setVotes(response.data))
      .catch(err => console.error('Error voting:', err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Vote for Your Favorite Pet!</h1>
      <button onClick={() => vote('cats')}>Vote for Cats</button>
      <span style={{ margin: '0 20px' }}>{votes.cats} votes</span>
      <button onClick={() => vote('dogs')}>Vote for Dogs</button>
      <span style={{ margin: '0 20px' }}>{votes.dogs} votes</span>
    </div>
  );
}

export default App;
