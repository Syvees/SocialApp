const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    const userToken = req.cookies.usertoken;
    jwt.verify(userToken, secret, (err, payload) => {
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}

