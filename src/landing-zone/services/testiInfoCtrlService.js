const { logger } = require("../../config/logger");
const { 
    createTestiInfoCtrlDetails, 
    updateTestiInfoCtrlDetails, 
    retrieveTestiInfoCtrlDetails,
    deleteTestiInfoctrlDetails
} = require("../sql/testiInfoCtrlQuery");

const createTestiInfoCtrlService = async (testiInfoAvail) => {
    try{
        let result = await createTestiInfoCtrlDetails(testiInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in const createTestiInfoCtrlService : ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateTestiInfoCtrlService = async (testiInfoAvail) => {
    try {
        let result = await updateTestiInfoCtrlDetails(testiInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateTestiInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveTestiInfoCtrlService = async (testiInfoId) => {
    try {
        let result = await retrieveTestiInfoCtrlDetails(testiInfoId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveTestiInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteTestiInfoCtrlService = async (testiInfoId) => {
    try {
        let result = await deleteTestiInfoctrlDetails(testiInfoId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteTestiInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createTestiInfoCtrlService,
    updateTestiInfoCtrlService,
    retrieveTestiInfoCtrlService,
    deleteTestiInfoCtrlService
}