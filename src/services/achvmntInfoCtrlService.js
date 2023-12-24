const { logger } = require("../config/logger");
const { 
    createAchvmntInfoCtrlDetails, 
    updateAchvmntInfoCtrlDetails, 
    retrieveAchvmntInfoCtrlDetails,
    deleteAchvmntInfoctrlDetails
} = require("../sql/achvmntInfoCtrlQuery");


const createAchvmntInfoCtrlService = async (achvmntInfoAvail) => {
    try{
        let result = await createAchvmntInfoCtrlDetails(achvmntInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createAchvmntInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateAchvmntInfoCtrlService = async (achvmntInfoAvail) => {
    try {
        let result = await updateAchvmntInfoCtrlDetails(achvmntInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateAchvmntInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveAchvmntInfoCtrlService = async (achvmntId) => {
    try {
        let result = await retrieveAchvmntInfoCtrlDetails(achvmntId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveAchvmntInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteAchvmntInfoCtrlService = async (achvmntId) => {
    try {
        let result = await deleteAchvmntInfoctrlDetails(achvmntId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteAchvmntInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createAchvmntInfoCtrlService,
    updateAchvmntInfoCtrlService,
    retrieveAchvmntInfoCtrlService,
    deleteAchvmntInfoCtrlService
}