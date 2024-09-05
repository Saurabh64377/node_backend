const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {

    //extract the jwt token from the request headers
    // const token = req.headers["x-access-token"]
    const token = req.headers.authorization.split(' ')[1];
   
    if (!token) return res.status(401).json({ error: 'unauthrization' });
        //verify the jwt token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Invalid token' });
        }

}


//function to generate jwt token

const generateToken = (userData) => {
    //generate a new JWT token using userData

    return jwt.sign(userData, process.env.JWT_SECRET)

    // if we want to use expiretime then the object be a pure objectform
    // return jwt.sign({userData}, process.env.JWT_SECRET , {expiresIn:84600})
}

module.exports =
{
    jwtAuthMiddleware,
    generateToken
}