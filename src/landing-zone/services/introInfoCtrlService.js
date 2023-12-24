const { logger } = require("../../config/logger");
const { 
    createIntroInfoCtrlDetails, 
    updateIntroInfoCtrlDetails, 
    retrieveIntroInfoCtrlDetails,
    deleteIntroInfoctrlDetails
} = require("../sql/introInfoCtrlQuery");

const createIntroInfoCtrlService = async (introInfoAvail) => {
    try{
        let result = await createIntroInfoCtrlDetails(introInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createIntroInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateIntroInfoCtrlService = async (introInfoAvail) => {
    try {
        let result = await updateIntroInfoCtrlDetails(introInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateIntroInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveIntroInfoCtrlService = async (introInfoId) => {
    try {
        let result = await retrieveIntroInfoCtrlDetails(introInfoId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveIntroInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteIntroInfoCtrlService = async (introInfoId) => {
    try {
        let result = await deleteIntroInfoctrlDetails(introInfoId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteIntroInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createIntroInfoCtrlService,
    updateIntroInfoCtrlService,
    retrieveIntroInfoCtrlService,
    deleteIntroInfoCtrlService
}