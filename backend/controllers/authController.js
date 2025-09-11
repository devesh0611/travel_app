const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_KEY

//SignUp
exports.signup = async (req, res) => {
    const {name, hall, gender, email, password} = req.body;
    

    try {

        console.log("Request body: ", req,body);
        // Check if user exists
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message : 'User already exists'});

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new User
        const newUser = new User({name, hall, gender, email, password : hashedPassword});

        // Create JWT token
        console.log(JWT_SECRET)
        const token = jwt.sign({id : newUser._id}, JWT_SECRET, {expiresIn : '1d'});
        await newUser.save()
        res.status(201).json({token, user : {id : newUser._id, name, hall, gender, email}});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message : 'SignUp failed', error : err.message});
    }
};


// Login
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message : 'Invalid Credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message : "Invalid Credentials"});

        const token = jwt.sign({id : user._id}, JWT_SECRET, {expiresIn : '1d'});
        res.status(200).json({token, user : {id : user._id, name : user.name, hall : user.hall, gender : user.gender, email }});
    }
    catch(err) {
        res.status(500).json({message : 'Login Failed', error : err.message});
    }
};