const jwt = require("jsonwebtoken")

const verifyToken = (req, res , next) => {
    let token;
    let authHeader = req.header.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if (err) {
                return res.status(403).json({ message: "Invalid Token" });
            }
            req.admin = decoded.admin;
            next();
        })
    }
}

module.exports = verifyToken;