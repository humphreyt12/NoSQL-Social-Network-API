const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  //get all users
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
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // update a user
    async updateUser(req, res) {
      try {
        const user = await  User.findOneAndUpdate(
          { _id: req.params.userId }, 
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
      const thought = await Thought.deleteMany( { _id:{ $in: user.thoughts } });
      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts for that user' });
      }
      res.json({ message: 'User and associated thoughts successfully deleted'});
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
    async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
      { _id: req.params.userId}, 
      {$pull: {friends: req.params.friendId }},
      { new: true} 
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch(err) {
      res.status(500).json(err);
    }       
  },
};