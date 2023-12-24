const { logger } = require("../config/logger");
const { 
    createProjectInfoCtrlDetails, 
    updateProjectInfoCtrlDetails, 
    retrieveProjectInfoCtrlDetails,
    deleteProjectInfoctrlDetails
} = require("../sql/projectInfoCtrlQuery");


const createProjectInfoCtrlService = async (projInfoAvail) => {
    try{
        let result = await createProjectInfoCtrlDetails(projInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createProjectInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateProjectInfoCtrlService = async (projInfoAvail) => {
    try {
        let result = await updateProjectInfoCtrlDetails(projInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateProjectInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveProjectInfoCtrlService = async (projectId) => {
    try {
        let result = await retrieveProjectInfoCtrlDetails(projectId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveProjectInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteProjectInfoCtrlService = async (projectId) => {
    try {
        let result = await deleteProjectInfoctrlDetails(projectId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteProjectInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createProjectInfoCtrlService,
    updateProjectInfoCtrlService,
    retrieveProjectInfoCtrlService,
    deleteProjectInfoCtrlService
}