const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    github: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const projectSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        min: [1, "too low"],
        max: [20, "too high"]
    },
    // created: {
    //     type: Date,
    //     default: Date.now
    // },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: String,
    userAvatar: String,
    volunteers: [volunteerSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model("Project", projectSchema)