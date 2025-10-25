const Transaction = require('../models/Transaction');
const User = require('../models/User');
const mongoose = require('mongoose');

//fetch single transaction - helper
const fetchTransaction = async (transactionID) => {
    try
    {
        const transaction = await Transaction.findOne({transactionID});
        return transaction;
    }
    catch (err){
        res.status(500).json({error: "Internal Server Error"});
    }
}

//update transaction status - single handler.
exports.updateTransactionStatus = async (req, res) => {
    const { id, status } = req.body // transactionID
    try 
    {
        if (!status) return res.status(400).json({ message: "Status required" });

        //normalise and check if the status is valid
        const normalised = String(status).toLowerCase();
        const allowed = ['pending', 'approved', 'flagged', 'rejected'];
        if (!allowed.includes(normalised)) return res.status(400).json({ message: "Invalid status" });

        const tx = await Transaction.findOneAndUpdate(
            { transactionID: id },
            { $set: {status: normalised} },
            { new: true }
        );

        if (!tx) return res.status(404).json({ message: "Transaction not found" });

        return res.json({ message: "Status updated", transaction: tx });
    } 
    catch (err) {
        return res.status(500).json({ error: "Internal Server error" });
    }
};

//fetch transactions - approved|rejected
exports.fetchApprovedRejected = async (req, res) => {
    const { status } = req.body
    try 
    {
        if (!status) return res.status(400).json({ message: "status query required" });

        const allowed = ['approved', 'rejected'];
        if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status filter" });

        const txs = await Transaction.find({ status: status }).lean();
        return res.json({message: "Successfully fetched transactions!", transactions: txs });
    } 
    catch (err) {
        return res.status(500).json({ error: "Internal Server error" });
    }
};

//fetch transactions - pending|flagged
exports.fetchPendingFlagged = async (req, res) => {
    const { status } = req.body
    try 
    {
        if (!status) return res.status(400).json({ message: "status query required" });

        const allowed = ['pending', 'flagged'];
        if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status filter" });

        const txs = await Transaction.find({ status: status }).lean();
        return res.json({message: "Successfully fetched transactions!", transactions: txs });
    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server error" });
    }
};

//fetch users and display activity status
exports.fetchUsers = async (req, res) => {
    try
    {
        const users = await User.find(); //fetches js docs -performance wise

        const now = Date.now();
        const timespan = 7 * 24 * 60 * 60 * 1000; //7 span

        const updateUsers = await Promise.all(
            users.map(async (u) => {
                const isActive = (now - new Date(u.lastLoggedIn).getTime()) <= timespan; //check if now-lastLoggedIn is less than equal to 7 days
                const newStatus = isActive ? 'active' : 'inactive'; //if true active, else inactive

                //update db IF there is a change
                if(u.status !== newStatus){
                    u.status = newStatus;
                    await u.save();
                }

                return {
                    username: u.username,
                    dateOfReg: u.dateOfReg,
                    status: u.status,
                    concatAccn: u.concatAccn,
                };
            })
        );

        res.status(200).json({message: "Successfully fetched users!", users: updateUsers});
    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server error" });
    }
}