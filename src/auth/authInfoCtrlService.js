const { logger } = require("../config/logger");
const { 
    registerAuthInfoCtrlDetails, 
    loginAuthInfoCtrlDetails, 
    dashAuthInfoCtrlDetails,
    retrieveRegisterInfoCtrlDetails,
    deleteRegisterInfoctrlDetails
} = require("./authInfoCtrlRepo");

const registerAuthInfoCtrlService = async (regisInfoAvail) => {
    try{
        let result = await registerAuthInfoCtrlDetails(regisInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in registerAuthInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveRegisterInfoCtrlService = async (regisInfoAvail) => {
    try{
        let result = await retrieveRegisterInfoCtrlDetails(regisInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveRegisterInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteRegisterInfoCtrlService = async (regisInfoAvail) => {
    try{
        let result = await deleteRegisterInfoctrlDetails(regisInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteRegisterInfoctrlDetails: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const loginAuthInfoCtrlService = async (loginInfoAvail) => {
    try{
        let result = await loginAuthInfoCtrlDetails(loginInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in loginAuthInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const dashAuthInfoCtrlService = async (dashInfoAvail) => {
    try{
        let result = await dashAuthInfoCtrlDetails(dashInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in dashAuthInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    registerAuthInfoCtrlService,
    retrieveRegisterInfoCtrlService,
    deleteRegisterInfoCtrlService,
    loginAuthInfoCtrlService,
    dashAuthInfoCtrlService
}