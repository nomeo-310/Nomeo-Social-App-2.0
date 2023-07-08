const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


//register new user
router.post("/register", async (req, res) => {
    try {
        //generate encrpted password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //new user is created
        const newUser = new User ({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        });
        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;