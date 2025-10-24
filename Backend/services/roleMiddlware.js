const Admin = require('../models/Admin');
const User = require('../models/User');

exports.verifyRole = (role) => {
return async (req, res, next) => {
    try
    {
        let user = null;

        switch (role)
        {
            case 'admin':
                user = await Admin.findOne({adminID: req.user.id});
                break;
            
            case 'user':
                user = await User.findOne({userID: req.user.id});
                break;

            default:
                return res.status(400).json({message: 'Invalid role guard'});
        }

        //check if user exists in any of those roles
        if (!user) return res.status(401).json({message: "User not found"});

        //check if admin and verify
        if (role === 'admin')
        {
            const isAdmin = user.roles.includes('admin');
            if (!isAdmin) return res.status(403).json({message: "Forbidden Access"});
            return next();
        }

        //check if user and verify
        if (role === 'user')
        {
            const isUser = user.roles.includes('user');
            if (!isUser) return res.status(403).json({message: "Forbidden Access"});
            return next();
        }        
    }
    catch (err)
    {
        res.status(500).json({error: "Server Error"});
    }
};
};