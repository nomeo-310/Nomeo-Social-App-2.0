const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type:String,
    },
    location: {
        type: String
    },
    profilePicture: {
        type:String,
        default: ''
    },
    description: {
        type: String,
        max: 500,
    },
    postPicture: {
        type: String,
       default: '',
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
}, 
{timestamps: true}
)

module.exports = mongoose.model('Post', PostSchema);