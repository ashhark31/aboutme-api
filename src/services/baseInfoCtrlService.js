const { logger } = require("../config/logger");
const { 
    createBaseInfoCtrlDetails, 
    updateBaseInfoCtrlDetails, 
    retrieveBaseInfoCtrlDetails, 
    deleteBaseInfoctrlDetails
} = require("../sql/baseInfoCtrlQuery");

const createBaseInfoCtrlService = async (baseInfoAvail) => {
    try{
        let result = await createBaseInfoCtrlDetails(baseInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createBaseInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateBaseInfoCtrlService = async (baseInfoAvail) => {
    try {
        let result = await updateBaseInfoCtrlDetails(baseInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateBaseInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveBaseInfoCtrlService = async (baseInfoAvailKey) => {
    try {
        let result = await retrieveBaseInfoCtrlDetails(baseInfoAvailKey);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveBaseInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteBaseInfoCtrlService = async (baseInfoAvailKey) => {
    try {
        let result = await deleteBaseInfoctrlDetails(baseInfoAvailKey);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteBaseInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = { 
    createBaseInfoCtrlService,
    updateBaseInfoCtrlService,
    retrieveBaseInfoCtrlService,
    deleteBaseInfoCtrlService 
}