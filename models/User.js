const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ]
},
{
    toJSON: {
      // Mongoose will not include virtuals by default, so add a `virtuals` property and set it's value to true
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the # of user's friends
userSchema.virtual('friendCount')
.get(function () {
  return this.friends.length; // retrieves the length of the user's `friends` array field on query
})

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;