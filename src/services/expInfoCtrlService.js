const { logger } = require("../config/logger");
const { 
    createExpInfoCtrlDetails, 
    updateExpInfoCtrlDetails, 
    retrieveExpInfoCtrlDetails,
    deleteExpInfoCtrlDetails
} = require("../sql/expInfoCtrlQuery");


const createExpInfoCtrlService = async (expInfoAvail) => {
    try{
        let result = await createExpInfoCtrlDetails(expInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createExpInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateExpInfoCtrlService = async (expInfoAvail) => {
    try {
        let result = await updateExpInfoCtrlDetails(expInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateExpInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveExpInfoCtrlService = async (empId) => {
    try {
        let result = await retrieveExpInfoCtrlDetails(empId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveExpInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteExpInfoCtrlService = async (empId) => {
    try {
        let result = await deleteExpInfoCtrlDetails(empId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteExpInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createExpInfoCtrlService,
    updateExpInfoCtrlService,
    retrieveExpInfoCtrlService,
    deleteExpInfoCtrlService
}