const jwt = require("jsonwebtoken")
const {logger} = require("../config/logger")

const authentication = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        if(!token){
            return res.send({ status:400, message: 'Please login first.' });
        }

        const decode = await jwt.verify(token, 'shhhhh', (err,decoded) => {
            if(err){
                if (err.name === 'TokenExpiredError') {
                    return res.status(400).json({ error: 'Token expired' });
                }
            }
            return decoded;
        })

        req.user = decode;
        return next();

    } catch (err) {
        logger.error({
            message: `Something went wrong while execution ${err.message}`
        })
        throw err;
    }
}

module.exports = authentication