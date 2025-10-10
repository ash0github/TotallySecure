const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    //check the authorisation header and cookies for valid tokens
    const authHeader = req.headers.authorization;
    const token = req.cookies.token;

    if (!authHeader || !authHeader.startsWith("Bearer "))
        if (!token)
            return res.status(401).json({message: "Unauthorised"});

    if (!token && authHeader)
        token = authHeader.split(" ")[1];
    
    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err){
        res.status(403).json({message: "Invalid or Expired Token"});
    }
}

module.exports = {protect};