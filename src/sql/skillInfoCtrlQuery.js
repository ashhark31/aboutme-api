const { logger } = require("../config/logger");
const { SkillInfoModel } = require("./common-db-methods");

const createSkillInfoCtrlDetails = async (reqData) => {
    try{
        const existingSkill = await SkillInfoModel.findOne({key: reqData?.key});
        if(existingSkill){
            return {status:400, message: 'Skill details already exist. Please use unique key.'};
        }

        const newSkillInfoUser = new SkillInfoModel(reqData);
        const result = await newSkillInfoUser.save();
        return { status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const updateSkillInfoCtrlDetails = async (reqData) => {
    try{
        const isSkillExist = await SkillInfoModel.findOne({key: reqData?.key});
        if(!isSkillExist){
            return {status:400, message: 'Skill info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await SkillInfoModel.findOneAndUpdate(query,updateData, {
            new: true
        })
        return { status: 200, response: result};
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        })
    }
}

const retrieveSkillInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await SkillInfoModel.find({}).sort({key:1});
            return { status: 200, response: result};
        }

        const query = { key: Number(reqId?.key) };
        const result = await SkillInfoModel.find(query);

        if(result.length)
            return { status: 200, response: result};
        return { status: 400, message: 'Details not found.'}

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

const deleteSkillInfoctrlDetails = async(reqId) => {
    try{
        const isSkillExist = await SkillInfoModel.findOne({key: reqId?.key});
        if(!isSkillExist){
            return {status:400, message: 'Skill info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await SkillInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createSkillInfoCtrlDetails,
    updateSkillInfoCtrlDetails,
    retrieveSkillInfoCtrlDetails,
    deleteSkillInfoctrlDetails
}