const { logger } = require("../config/logger");
const { 
    createSkillInfoCtrlDetails, 
    updateSkillInfoCtrlDetails, 
    retrieveSkillInfoCtrlDetails,
    deleteSkillInfoctrlDetails
} = require("../sql/skillInfoCtrlQuery");


const createSkillInfoCtrlService = async (skillInfoAvail) => {
    try{
        let result = await createSkillInfoCtrlDetails(skillInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in createSkillInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateSkillInfoCtrlService = async (skillInfoAvail) => {
    try {
        let result = await updateSkillInfoCtrlDetails(skillInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateSkillInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveSkillInfoCtrlService = async (skillId) => {
    try {
        let result = await retrieveSkillInfoCtrlDetails(skillId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveSkillInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteSkillInfoCtrlService = async (skillId) => {
    try {
        let result = await deleteSkillInfoctrlDetails(skillId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteSkillInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createSkillInfoCtrlService,
    updateSkillInfoCtrlService,
    retrieveSkillInfoCtrlService,
    deleteSkillInfoCtrlService
}