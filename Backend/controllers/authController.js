const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const crypto = require('crypto');
const User = require('../models/User');
const Account = require('../models/Account');

//method to generate signed token - expiry: 15 minutes
const generateToken = (userID) =>
    jwt.sign({id: userID}, process.env.JWT_SECRET, {expiresIn: '900s'});

//method to generate new account object
const generateAccount = async (accountHolder) => {
    //creates a new account with the user as the account holder
    const account = new Account({accountHolder});
    await account.save();
}

exports.register = async (req, res) => {
    //get info from request body
    const { email, username, password } = req.body;

    try
    {
        //check if user exists
        const exists = await User.findOne({email});
        if (exists) return res.status(400).json({message: "User with this email already exists."});

        //generate a 16-byte cryptographically secure salt
        const salt = crypto.randomBytes(16).toString("hex");

        //combine salt and password
        const hash = await argon2.hash(password + salt, {type: argon2.argon2id});

        //initialise new user object
        const user = new User({email, username, password: hash, salt});
        
        //save changes asynchronously
        await user.save();

        //create user account
        await generateAccount(user._id);

        //return success!
        res.status(201).json({message: "User registered successfully!"});
    }
    catch (err){
        res.status(500).json({error: "Internal Server Error"});
    }
}

exports.login = async (req, res) => {
    //get info from request body
    const { email, password } = req.body;

    try
    {
        //find user and validate credentials
        const user = await User.findOne({email});
        if (!user || !(await argon2.verify(user.password, password + user.salt))){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //generate token
        const token = generateToken(user.userID);
        res.json({token});
    }
    catch (err){
        res.status(500).json({error: "Server error"});
    }
}