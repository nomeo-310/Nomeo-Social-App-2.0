const express = require('express');
const app = express();
const router = express.Router();
const Post = require('../models/Post');
const path = require('path');
const multer = require('multer');


app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '-'+ Date.now()+ '.'+ ext);
    }
});

const upload = multer({storage})
app.post("/api/upload", upload.single("postImage"), (req, res) => {
    try {
        return res.status(200).json('file uploaded successfully');
    } catch (error) {
        console.log(error);
    }
});


//create a post
router.post('/', upload.single('postImage'), async (req, res) => {
    try {
        const newPost = new Post({
            userId: req.body.userId,
            userName: req.body.userName,
            location: req.body.location,
            profilePicture:req.body.profilePicture,
            postCreator: req.body.userId,
            description: req.body.description,
            postPicture: req?.file?.filename || "",
        })
        await newPost.save();
        const savedPost = await Post.find();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(408).json({message: error.message});
    }
});

//get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(505).json(error);
    }
});

// get all timeline posts
router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post)
    } catch (error) {
        res.status(408).json({message: error.message});
    }
});

// get user's posts
router.get('/timeline/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.find({userId: id});
        res.status(200).json(post)
    } catch (error) {
        res.status(408).json({message: error.message});
    }
});

//like or dislke a post
router.put('/:id/like', async (req, res) => {
    const {id, postId} = req.body;
    const post = await Post.findById(postId)
    console.log(post)
    try {
        if (!post.likes.includes(id)) {
            await post.updateOne({$push:{likes: id }})
            res.status(200).json('post liked')
        } else {
            await post.updateOne({$pull:{likes: id }})
            res.status(200).json('post disliked') 
        }
    } catch (error) {
        res.status(408).json({message: error.message});
    }

});

//create comment
router.put('/:id/comments', async (req, res) => {
    const {id} = req.params;
    const post = await Post.findById(id);
    const {profilePicture, commentText, senderId} = req.body
    try {
        await post.updateOne({$push:{comments: {senderId, profilePicture, commentText}}});
        res.status(200).json('comment created')
    } catch (error) {
        res.status(408).json({message: error.message});
    }
})


// //delete a post
// router.delete('/:id', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id)
//         if (post.userId === req.body.userId) {
//             await Post.deleteOne()
//             res.status(200).json('post has been deleted')
//         } else {
//             res.status(408).json('You can only deleted your own post');
//         }
//     } catch (error) {
//         res.status(505).json(error);
//     }
// });

//update user's post
// router.put('/:id/posts', verifyToken, async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const posts = await Post.find({userId});
//         res.status(200).json(posts)
//     } catch (error) {
//         res.status(408).json({message: error.message});
//     }
// });





module.exports = router;