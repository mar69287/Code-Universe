const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});


const profileSchema = new Schema({

    email: String,
    age: Number,
    location: String,
    skills: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: String,
    bio: String,
    github: String,
    linkedIn: String,
    portfolio: String,
    skills: [skillSchema],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);