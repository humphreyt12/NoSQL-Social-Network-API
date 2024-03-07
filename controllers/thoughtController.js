const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
//get all thoughts  
 async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch(err) {
    res.status(500).json(err)
  }
  },
//get a single thought by id
 async getSingleThought(req, res) {
   try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought){
      return  res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch(err) {
    res.status(500).json(err);
  }
},   
//create a new thought
async createThought(req, res) {
  try {
   const dbThoughtData = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username
    });
    res.json(dbThoughtData);
  } catch(err) {
    res.status(500).json(err);
  }       
},
//update a thought
async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { thoughtText: req.body.thoughtText,
        username: req.body.username
      }, 
      { new: true }, 
    );
  if (!thought) {
    res.status(404).json({ message: 'No thought found with this id!' });
  } 
    res.json (thought);
  } catch (err) {
    res.status(500).json({ message: 'error', err });
  }   
},
//remove thought and update associated user
async removeThought(req, res) {
  try {
   const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
   if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' })
   }
   const user = await  User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
    if (!user) {
      return  res.status(404).json({message: 'Error deleting thought' });
    }
    res.json({ message: 'Thought successfully deleted!' });   
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  } 
},
//add reaction and update associated thought
async addReaction(req, res) {
  try{
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
  if (!thought) {
    return res.status(404).json({ message: 'No thought with this id!' });
  } 
  res.json(`Reaction added`)
  } catch(err) {
    res.status(500).json(err);
  }      
},
//remove reaction and update associated thought
async removeReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(`Reaction deleted`);
  } catch(err) {
    res.status(500).json(err);   
  } 
  },
};