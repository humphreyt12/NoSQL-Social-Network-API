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
    async updateUser(req, res) {
      try {
        const user = await  User.findOneAndUpdate(
          { _id: req.params.userId }, 
          { $set: 
            {
            username: req.body.username,
            email: req.body.email
            } 
          }, 
          { new: true }, 
        );
        if (!user) {
          res.status(404).json({ message: 'No user found with this id!' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

  // delete a user and remove their associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
    
      if (!user) {
        return res.status(404).json({ message: 'No user exits with that ID' });
      }
      const thought = await Thought.deleteMany( { $pull:{username: user.username} });
      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts for that user' });
      }
      res.json({ message: 'User successfully deleted'});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // add a friend and update user's friend list
  async addFriend(req, res) {    
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, 
        {$addToSet: {friends: req.params.friendId }},
        { new: true} 
      );
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
    } catch (err) {
    res.status(500).json(err);
    }    
  },
   // delete friend and update user's friend list
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