const { logger } = require("../config/logger");
const { 
    createCrtInfoCtrlDetails, 
    updateCrtInfoCtrlDetails, 
    retrieveCrtInfoCtrlDetails,
    deleteCrtInfoctrlDetails
} = require("../sql/crtificationInfoCtrlQuery");


const createCrtInfoCtrlService = async (certInfoAvail) => {
    try{
        let result = await createCrtInfoCtrlDetails(certInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createCrtInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateCrtInfoCtrlService = async (certInfoAvail) => {
    try {
        let result = await updateCrtInfoCtrlDetails(certInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateCrtInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveCrtInfoCtrlService = async (certId) => {
    try {
        let result = await retrieveCrtInfoCtrlDetails(certId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveCrtInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteCrtInfoCtrlService = async (certId) => {
    try {
        let result = await deleteCrtInfoctrlDetails(certId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteCrtInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createCrtInfoCtrlService,
    updateCrtInfoCtrlService,
    retrieveCrtInfoCtrlService,
    deleteCrtInfoCtrlService
}