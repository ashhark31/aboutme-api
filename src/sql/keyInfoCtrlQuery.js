const { logger } = require("../config/logger");
const { KeyInfoModel } = require("./common-db-methods");

const createKeyInfoCtrlDetails = async (reqData) => {
    try{
        const existingKey = await KeyInfoModel.findOne({key: reqData?.key});
        if(existingKey){
            return {status:400, message: 'key details already exist. Please use unique key.'};
        }

        const newKeyInfoUser = new KeyInfoModel(reqData);
        const result = await newKeyInfoUser.save();
        return { status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const updateKeyInfoCtrlDetails = async (reqData) => {
    try{
        const isKeyExist = await KeyInfoModel.findOne({key: reqData?.key});
        if(!isKeyExist){
            return {status:400, message: 'Key info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await KeyInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveKeyInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await KeyInfoModel.find({});
            return { status: 200, response: result};
        }

        const query = { key: Number(reqId?.key) };
        const result = await KeyInfoModel.find(query);

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

const deleteKeyInfoctrlDetails = async(reqId) => {
    try{
        const isKeyExist = await KeyInfoModel.findOne({key: reqId?.key});
        if(!isKeyExist){
            return {status:400, message: 'Key info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await KeyInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createKeyInfoCtrlDetails,
    updateKeyInfoCtrlDetails,
    retrieveKeyInfoCtrlDetails,
    deleteKeyInfoctrlDetails
}