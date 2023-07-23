const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const app = express();


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
app.patch("/api/upload", upload.single("coverImage"), (req, res) => {
    try {
        return res.status(200).json('file uploaded successfully');
    } catch (error) {
        console.log(error);
    }
});

//register new user
router.patch("/:id/image", upload.single('coverImage'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.set({coverPicture: req.file.filename});
        await user.save()
        res.status(200).json('image saved')
    } catch (error) {
        return res.status(500).json(error);
    }
});

//updating user profile
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        const user = await User.findById(req.params.id);
        try {
            const {userId, userName, fullName, description, hobby, location, occupation, relationship } = req.body;
            user.set({userId, userName, fullName, description, hobby, location, occupation, relationship});
            await user.save();
            res.status(200).json('Account has been updated');
         } catch (error) {
             return res.status(500).json(error); 
         }
    } else {
        return res.status(404).json('You can only update your account')
    }
});


//get a user
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);      
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
});

//get all user
router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);      
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
});

//add or remove a friend 
router.put('/:id/:friendId', async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.followers.includes(friendId)) {
            user.followers = user.followers.filter((id) => id !== friendId);
            friend.followers = user.followers.filter((id) => id !== id); 
        } else {
            user.followers.push(friendId);
            friend.followers.push(id); 
        }
        await user.save();
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
        ({_id, userName, fullName, occupation, location, profilePicture }) => {
            return {_id, userName, fullName, occupation, location, profilePicture };
        });
        res.status(200).json(formattedFriends)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
});

//get friends
router.get('/:id/friends', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.followers.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
        ({_id, userName, fullName, occupation, location, profilePicture }) => {
            return {_id, userName, fullName, occupation, location, profilePicture };
        });
        res.status(200).json(formattedFriends)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
});




// update user
router.patch('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        const user = await User.findById(req.params.id);
        try {
            const {userId, userName, fullName, description, hobby, location, occupation, relationship, profilePicture} = req.body;
            user.set({userId, userName, fullName, description, hobby, location, occupation, relationship, profilePicture });
            await user.save();
            res.status(200).json('Account has been updated');
         } catch (error) {
             return res.status(500).json(error); 
         }
    } else {
        return res.status(404).json('You can only update your account')
    }
});

module.exports = router;