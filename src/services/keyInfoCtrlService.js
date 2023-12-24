const { logger } = require("../config/logger");
const { 
    createKeyInfoCtrlDetails, 
    updateKeyInfoCtrlDetails, 
    retrieveKeyInfoCtrlDetails,
    deleteKeyInfoctrlDetails
} = require("../sql/keyInfoCtrlQuery");

const createKeyInfoCtrlService = async (keyInfoAvail) => {
    try{
        let result = await createKeyInfoCtrlDetails(keyInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createKeyInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateKeyInfoCtrlService = async (keyInfoAvail) => {
    try {
        let result = await updateKeyInfoCtrlDetails(keyInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateKeyInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveKeyInfoCtrlService = async (keyInfoId) => {
    try {
        let result = await retrieveKeyInfoCtrlDetails(keyInfoId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveKeyInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteKeyInfoCtrlService = async (keyInfoId) => {
    try {
        let result = await deleteKeyInfoctrlDetails(keyInfoId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteKeyInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createKeyInfoCtrlService,
    updateKeyInfoCtrlService,
    retrieveKeyInfoCtrlService,
    deleteKeyInfoCtrlService
}