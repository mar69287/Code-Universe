const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    bio: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);