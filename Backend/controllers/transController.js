const argon2 = require('argon2');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Account = require('../models/Account');

exports.transact = async (req, res) => {
    //get info from the request body
    const { currency, beneficiary, beneficiaryAccn, amount, swiftCode } = req.body;

    try
    {
        //get user and accn info
        const user = await User.findOne({userID: req.user.id});
        if (!user) return res.status(404).json({message: "User not found"});
        const accn = await Account.findOne({accountHolder: user._id});
        if (!accn) return res.status(404).json({message: "Account not found"});

        //generate a 16-byte cryptographically secure salt
        const salt = crypto.randomBytes(16).toString("hex");

        //combine salt and necessary info
        const beneficiaryAccnHash = await argon2.hash(beneficiaryAccn + salt, {type: argon2.argon2id})
        const swiftHash = await argon2.hash(swiftCode + salt, {type: argon2.argon2id})

        //initialise a transaction
        const transaction = new Transaction({
            currency, amount, beneficiary, salt,
            beneficiaryAccn: beneficiaryAccnHash,
            swiftCode: swiftHash,
            benefactor: user._id,
            benefactorAccn: accn._id
        });

        //save changes async
        await transaction.save();

        //return success!
        res.status(201).json({message: "Transaction successful!"});
    }
    catch (err){
        res.status(500).json({error: "Internal Server Error"});
    }
}

exports.fetchTransactions = async (req, res) => {
    try
    {
        //get user and accn info
        const user = await User.findOne({userID: req.user.id});
        if (!user) return res.status(404).json({message: "User not found"});

        const transactions = await Transaction.find({benefactor: user._id});
        if (!transactions.length) return res.status(244).json({message: "No Transactions"});

        //return success!
        res.status(201).json({message: "Retrieved Transactions.", transactions});
    }
    catch (err){
        res.status(500).json({error: "Internal Server Error"});
    }
}