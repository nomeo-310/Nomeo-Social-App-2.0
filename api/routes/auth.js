const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();
const path = require('path')


app.use(express.json());
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
const jwtSecret = 'averylongstrinthatactuallymeansnothingatallandcannotbeeasilyguessed';

//uploading images
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
app.post("/api/upload", upload.single("profileImage"), (req, res) => {
    try {
        return res.status(200).json('file uploaded successfully');
    } catch (error) {
        console.log(error);
    }
});

//register new user
router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User ({
            userName: req.body.userName,
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            location: req.body.location,
            profilePicture: req.file.filename,
            occupation: req.body.occupation, 
            viewedProfile: Math.floor(Math.random()*1000), 
            impressions: Math.floor(Math.random()*1000),
            description: '',
            relationship: '',
        });
        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error);
    }
});

//login user
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg:'user does not exist.'});
    
        const passwordIsCorrect = await bcrypt.compare (password, user.password);
        if (!passwordIsCorrect) return res.status(400).json({msg:'password is not correct.'});
    
        const token = jwt.sign({id:user._id}, jwtSecret);
        res.status(200).json({token, user})
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
});

module.exports = router;