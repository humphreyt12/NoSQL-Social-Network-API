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

//  // Empty arrays for randomly generated users
//  const users = [];

//  for (let i = 0; i < 10; i++) {
//     const users = getRandomUser();
//     const newUser = {
//       username: Math.floor(Math.random() * 10 + 1),
//       email: Math.random().toString(36).substring(2)+'@'+(Math.random() * 0xffff).toString(36)
//     };
//     users.push(newUser);
//   }

//   const thoughts = [];

//   for (let i = 0; i < 10; i++) {
//     const thoughts = getRandomThoughts();
//     const newThought = {
//         thoughtText:
//         username: Math.floor(Math.random() * 10 + 1),
//         userId:
//     };
//     thoughts.push(newThought);
//   }

  // Wait for the users to be inserted into the database
  await Social.collection.insertMany(users);

  await Thought.deleteMany({});
  await User.deleteMany({});

  console.info('Seeding complete! 🌱');
  process.exit(0);
});