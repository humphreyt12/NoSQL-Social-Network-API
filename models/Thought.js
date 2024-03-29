const { Schema, model } = require('mongoose');

//not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model
const reactionSchema = new Schema({
            reactionId: {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId(),
            },
            reactionBody: {
                type: String, 
                required: true, 
                minlength: 1,
                maxlength: 280
            },
            username: { 
                type: String, 
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            }, 
    });

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that gets the # of reactions
thoughtSchema.virtual('reactionCount')
//Getter
.get(function () {
    return this.reactions.length;
})

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;