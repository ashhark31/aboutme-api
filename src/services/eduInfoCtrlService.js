const { logger } = require("../config/logger");
const { 
    createEduInfoCtrlDetails,
    updateEduInfoCtrlDetails,
    retrieveEduInfoCtrlDetails,
    deleteEduInfoCtrlDetails
} = require("../sql/eduInfoCtrlQuery");


const createEduInfoCtrlService = async (eduInfoAvail) => {
    try{
        let result = await createEduInfoCtrlDetails(eduInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createEduInfoCtrlDetails: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateEduInfoCtrlService = async (eduInfoAvail) => {
    try {
        let result = await updateEduInfoCtrlDetails(eduInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateEduInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveEduInfoCtrlService = async (eduId) => {
    try {
        let result = await retrieveEduInfoCtrlDetails(eduId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveEduInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteEduInfoCtrlService = async (eduId) => {
    try {
        let result = await deleteEduInfoCtrlDetails(eduId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteEduInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createEduInfoCtrlService,
    updateEduInfoCtrlService,
    retrieveEduInfoCtrlService,
    deleteEduInfoCtrlService
}