const { logger } = require("../config/logger");
const { RegistrationAuthModel } = require("./user-schema-methods");

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerAuthInfoCtrlDetails = async (reqData) => {
    try{
        const existingUser = await RegistrationAuthModel.findOne({email: reqData?.email});
        if(existingUser){
            return {status:400, message: 'User already exist'};
        }

        const hashPassword = await bcrypt.hash(reqData?.password, 10);
        const newRegistrationAuthUser = new RegistrationAuthModel({
            firstName: reqData?.firstName,
            lastName: reqData?.lastName,
            email: reqData?.email,
            password: hashPassword
        });
        
        const user = await newRegistrationAuthUser.save();
        const token = await jwt.sign(
            {id: user._id, email: user.email},
            'shhhhh',
            { expiresIn: '2h' }
        )

        user.token = token;
        user.password = undefined
        return {status:200, data:user};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const retrieveRegisterInfoCtrlDetails = async (reqId) => {
    try{
        const user = await RegistrationAuthModel.findOne({email: reqId?.key});
        if(!user){
            return {status:400, message: 'User Not found.'};
        }

        user.token = undefined;
        user.password = undefined
        return {status:200, response:user};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const deleteRegisterInfoctrlDetails = async(reqId) => {
    try{
        const isUserExist = await RegistrationAuthModel.findOne({email: reqId?.key});
        if(!isUserExist){
            return {status:400, message: 'User info does not exist. Please register first.'};
        }

        const query = { email: reqId?.key };
        const result = await RegistrationAuthModel.findOneAndDelete(query);
        return {status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

const loginAuthInfoCtrlDetails = async (reqData) => {
    try{
        const user = await RegistrationAuthModel.findOne({email: reqData?.email});
        if(!user){
            return {status:400, message: 'User does not exist'};
        }

        const isPwdCorrect = await bcrypt.compare(reqData?.password, user.password);
        if(!isPwdCorrect){
            return {status:400, message: 'Password is wrong. Please enter correct password.' }
        }

        const token = await jwt.sign(
            {id: user._id, email: user.email},
            'shhhhh',
            { expiresIn: '2h' }
        )

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            sameSite: 'none',
            secure: true,
            httpOnly: true
        };

        return {status:200, token:token, options:options, response: user};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const dashAuthInfoCtrlDetails = async (reqData) => {
    try{
        const query = {_id: reqData?.id};
        const register = await RegistrationAuthModel.findOne(query);
        const result = {firstName: register?.firstName};
        return {status:200, response:result};
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

module.exports = {
    registerAuthInfoCtrlDetails,
    retrieveRegisterInfoCtrlDetails,
    deleteRegisterInfoctrlDetails,
    loginAuthInfoCtrlDetails,
    dashAuthInfoCtrlDetails
}
