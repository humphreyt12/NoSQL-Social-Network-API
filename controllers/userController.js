const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  //get users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err)
      }
    },
  //get a single user by id
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId });
          
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
    
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
      // create a new user
      async createUser(req, res) {
        try {
          const dbUserData = await User.create(req.body);
          res.json(dbUserData);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // update a user
      updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            {
              username: req.body.username,
              email: req.body.email
            }, 
            { new: true }, 
            (err, result) => {
              if (result) {
                res.status(200).json(result);
                console.log(`Updated: ${result}`);
              } else {
                console.log(err);
                res.status(500).json({ message: 'error', err });
              }
            }
        )
    },
   // delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : Thought.deleteMany( { username: user.username})
                  .then((thoughts) => 
                    !thoughts
                    ? res.status(404).json({ message: 'No thoughts for that user' })
                    : res.json(user)
                  )
                )
            .catch((err) => res.status(500).json(err));
      },
   // add a friend
    addFriend(req, res) {
          
      User.findOne({ _id: req.params.friendId })
          .select('-__v')
          .then((user) => {
              return User.findOneAndUpdate (
                { _id: req.params.userId}, 
                {$addToSet: {
                    friends: user._id
                }},
                { new: true} 
              );
          }).then((user) => 
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
   // delete friend
    removeFriend(req, res) {
    
      User.findOne({ _id: req.params.friendId })
          .select('-__v')
          .then((user) => {
            return User.findOneAndUpdate (
                { _id: req.params.userId}, 
                {$pull: {
                  friends: user._id
              }},
              { new: true} 
            );
        }).then((user) => 
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    }
};