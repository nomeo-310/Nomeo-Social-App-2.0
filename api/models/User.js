const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        min: 3,
        max: 15,
        unique:true,
    },
    fullName: {
        type: String,
        require: true,
        min: 3,
        max: 15,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        unique:true
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Array,
        default: false,
    },
    description: {
        type: String,
        max: 200,
    },
    socialProfiles: {
        type: Array,
        default: [],
    },
    relationship: {
        type: String,
    },
    hobby: {
        type:String,
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
}, 
{timestamps: true}
)

module.exports = mongoose.model('User', UserSchema);