const jwt = require("jsonwebtoken");

const createToken = (data, secretName, expireTime) => {//data=_id
  return jwt.sign({data}, secretName, { expiresIn: expireTime });
};

const verify = (req, res, secretName) => {//add next in arguments?
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secretName, (err, verifyToken) => {
            if (err) {
                return res.sendStatus(403);
            }
            req._id = verifyToken._id;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

const createLoginToken = async (data) => {
    return createToken(data, process.env.LOGIN_SECRET, "2M");
};

const verifyLoginToken = async (req, res, next) => {
  verify(req, res, process.env.LOGIN_SECRET);
  next();
};

module.exports = {createLoginToken,verifyLoginToken};