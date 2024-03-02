const express = require('express');
const db = require('./config/connection');

// Require model
const { User } = require('./models');
const { Thought } = require('./models');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Finds all users
app.get('/users', async (req, res) => {
    try {
      // Using model in route to find all documents that are instances of that model
      const result = await User.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
});