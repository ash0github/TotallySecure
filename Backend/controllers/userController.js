const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

const refreshBalance = async (id) => {
    if (!id) throw new Error("InvalidUser");

    //fetch account
    const account = await Account.findOne({accountHolder: id});
    if (!account) throw new Error("Account not found");

    //return account balance!
    return account.balance;
}

exports.fetchUser = async (req, res) => {
    try
    {
        //get user info
        const user = await User.findOne({userID: req.user.id});
        if (!user) return res.status(404).json({message: "User not found"});

        //refresh balance
        const balance = await refreshBalance(user._id)
        if (!balance && balance !== 0) return res.status(404).json({message: "Balance not found"});

        //return success!
        res.status(201).json({message: "Retrieved User.", user, balance});
    }
    catch (err){
        res.status(500).json({error: "Internal Server Error", err});
    }
}

exports.dashboard = async (req, res) => {
    try
    {
        //get user and accn and transaction info
        const user = await User.findOne({userID: req.user.id});
        if (!user) return res.status(404).json({message: "User not found"});
        const accn = await Account.findOne({accountHolder: user._id});
        if (!accn) return res.status(404).json({message: "Account not found"});
        const transactions = await Transaction.find({benefactor: user._id});

        //return success!
        return res.status(201).json({message: "User Dashboard Loaded.", user, accn, transactions});
    }
    catch (err){
        res.status(500).json({error: "Internal Server Error", err});
    }
}