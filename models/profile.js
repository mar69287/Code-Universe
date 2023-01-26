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
    name: String,
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
    skills: [skillSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);