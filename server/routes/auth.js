require('dotenv').config()
const express = require('express')
const router = express.Router();
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const {username, password} = req.body
    // simple validation
    if (!username || !password) {
        return res.status(400).json({success: false, message: 'missing username and password'}  )
    } 
    try {
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({success: false, message: 'user already taked'})
        }
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword
        }) 
        await newUser.save()
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({success: true, message: 'user created successfully', accessToken})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, message: 'internal server error '})
    }
})
module.exports = router