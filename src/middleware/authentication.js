const jwt = require("jsonwebtoken")
const ENVPropertyValues = require("../utils/envProperties")

const authentication = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        if(!token){
            return res.send({ status:400, message: 'Please login first.' });
        }

        const decode = await jwt.verify(
            token, 
            'shhhhh'
        )

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