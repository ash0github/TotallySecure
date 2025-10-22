const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const crypto = require('crypto');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Account = require('../models/Account');
const OTP = require('../models/OTP');
const cookieParser = require('cookie-parser');
const { sendEmail, confirmRegMail } = require('../services/otpMiddleware');

//method to generate signed token - expiry: 15 minutes
const generateToken = (userID) =>
    jwt.sign({id: userID}, process.env.JWT_SECRET, {expiresIn: '1800s'});

//method to generate new account object
const generateAccount = async (accountHolder) => {
    //creates a new account with the user as the account holder
    const account = new Account({accountHolder});
    await account.save();
}

//method to send OTP
const sendOTP = async (req, res) => {
    //get info from request body
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({message: "User not found"});

        //generate 6-digit OTP string
        const baseCode = Math.floor(100000 + Math.random() * 900000).toString();

        //hash OTP
        const code = await argon2.hash(baseCode, {type: argon2.argon2id});

        //set expiry and save OTP
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); //+5 minutes
        await OTP.deleteMany({userID: user._id}); //delete any existing OTPs
        await OTP.create({userID: user._id, code, expiresAt})

        //send via email
        await sendEmail(user.email, baseCode);
        res.json({message: "Login successul! Verification code sent."});
    }
    catch (err){
        res.status(500).json({error: "Server error"});
    }
}

exports.register = async (req, res) => {
    //get info from request body
    const { email, username, password, firstName, lastName, accountNumber, idNumber } = req.body;

    try
    {
        //check if user exists
        const exists = await User.findOne({email});
        if (exists) return res.status(400).json({message: "User with this email already exists."});

        //generate a 16-byte cryptographically secure salt
        const salt = crypto.randomBytes(16).toString("hex");

        //combine salt and password
        const passwordHash = await argon2.hash(password + salt, {type: argon2.argon2id});
        const accountHash = await argon2.hash(accountNumber + salt, {type: argon2.argon2id});
        const idHash = await argon2.hash(idNumber + salt, {type: argon2.argon2id});

        //concat fields
        const concatID = `**********${idNumber.slice(-3)}`;
        const concatAccn = `******${accountNumber.slice(-4)}`;

        //initialise new user object
        const user = new User({email, username, password: passwordHash, salt, firstName, lastName, accountNumber: accountHash, idNumber: idHash, concatID, concatAccn});
        
        //save changes asynchronously
        await user.save();

        //create user account
        await generateAccount(user._id);

        //send confirmation email
        await confirmRegMail(email, accountNumber);

        //return success!
        res.status(201).json({message: "User registered successfully!"});
    }
    catch (err){
        res.status(500).json({error: "Internal Server Error"});
    }
}

exports.login = async (req, res) => {
    //get info from request body
    const { email, password, accountNumber } = req.body;

    try
    {
        //find user and validate credentials
        const user = await User.findOne({email});
        if (!user || !(await argon2.verify(user.password, password + user.salt)) || !(await argon2.verify(user.accountNumber, accountNumber + user.salt))){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //send OTP
        await sendOTP({ body: {email}}, res);
        //res.json({message: "Login successul! Verification code sent."});
    }
    catch (err){
        res.status(500).json({error: "Server error"});
    }
}

exports.adminLogin = async (req, res) => {
    //get info from request body
    const { email, password, accountNumber } = req.body;

    try
    {
        //find user and validate credentials
        const admin = await Admin.findOne({email});
        if (!admin || !(await argon2.verify(admin.password, password + admin.salt))){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //send OTP
        await sendOTP({ body: {email}}, res);
        //res.json({message: "Login successul! Verification code sent."});
    }
    catch (err){
        res.status(500).json({error: "Server error"});
    }
}

exports.verifyOTP = async (req, res) => {
    //get info from request body
    const { email, code } = req.body;

    try{
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({message: "User not found"});

        //validate the otp
        //check if it exists and if the code and hash match
        const otp = await OTP.findOne({userID: user._id});
        if (!otp || !(await argon2.verify(otp.code, code))){
            return res.status(400).json({message: "Invalid code"});
        }

        //check if it is expired
        if (otp.expiresAt < new Date()) {
            await OTP.deleteMany({userID: user._id}); //deletes all previous otps associated to the user
            return res.status(400).json({message: "Code expired"});
        }

        //else deletes all previous otps associated to the user
        await OTP.deleteMany({userID: user._id});

        //generate token
        const token = generateToken(user.userID);

        //set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, //inidactes https
            sameSite: 'none',
            priority: 'high',
            maxAge: 30 * 60 * 1000 //30 min
        });

        res.status(200).json({message: "Verification successful!"});
    }
    catch (err){
        res.status(500).json({error: "Server error"});
    }
}