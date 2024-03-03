const users = [
    {
        username: "lernantino",
        email: "lernantino@gmail.com",
    },
    {
        username: "humphreyt12",
        email: "humphreyt12@yahoo.com",
    },
    {
        username: "tiaskye",
        email: "tiaskye@hotmail.com",
    },
    {
        username: "mertello",
        email: "mertello@gmail.com"
    },
];

const thoughts = [
    "Here's a cool thought...",
    "Hello world, this is a comment",
    "I like this socialnetwork",
    "Social media is a big waste of time",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random user
const getRandomUser = () =>
  `${getRandomArrItem(users)}${Math.floor(Math.random() * 10 + 1)}`;

// Function to generate random thoughts that we can add to user object.
const getRandomThoughts = (int) => {
    const thoughts = [];
    for (let i = 0; i < int; i++) {
      thoughts.push({
        thoughtText: getRandomArrItem(thoughts),
      });
    }
    return thoughts;
  };

  // Export the functions for use in seed.js
  module.exports = {getRandomUser, getRandomThoughts};