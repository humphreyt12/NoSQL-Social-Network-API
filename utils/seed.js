const connection = require('../config/connection');
const { Thought, User } = require('../models');
// const { getRandomUser, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
 // Delete the collections if they exist
    let socialCheck = await connection.db.listCollections({ name: 'social'}).toArray();
    if (socialCheck.length) {
        await connection.dropCollection('social');
    }

  await Thought.deleteMany({});
  await User.deleteMany({});

  console.info('Seeding complete! 🌱');
  process.exit(0);
});