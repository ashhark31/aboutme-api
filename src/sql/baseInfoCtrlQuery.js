const { logger } = require("../config/logger");
const {BaseInfoModel} = require("./common-db-methods");

const createBaseInfoCtrlDetails = async (reqData) => {
    try{
        const existingUser = await BaseInfoModel.findOne({key: reqData?.key});
        if(existingUser){
            return {status:400, message: 'Base details already exist. Please use unique key.'};
        }

        const newBaseInfoUser = new BaseInfoModel(reqData);
        const result = await newBaseInfoUser.save();
        return { status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const updateBaseInfoCtrlDetails = async (reqData) => {
    try{
        const isUserExist = await BaseInfoModel.findOne({key: reqData?.key});
        if(!isUserExist){
            return {status:400, message: 'Base info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await BaseInfoModel.findOneAndUpdate(query,updateData, {            new: true
        })
        return { status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        })
    }
}

const retrieveBaseInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await BaseInfoModel.find({});
            return { status: 200, response: result};
        }
        
        const query = { key: Number(reqId?.key) };
        const result = await BaseInfoModel.find(query);

        if(result.length)
            return { status: 200, response: result};
        return { status: 400, message: 'Details not found.'}

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
        throw err;
    }
}

const deleteBaseInfoctrlDetails = async(reqId) => {
    try{
        const isUserExist = await BaseInfoModel.findOne({key: reqId?.key});
        if(!isUserExist){
            return {status:400, message: 'Base info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await BaseInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = { 
    createBaseInfoCtrlDetails,
    updateBaseInfoCtrlDetails,
    retrieveBaseInfoCtrlDetails,
    deleteBaseInfoctrlDetails
}