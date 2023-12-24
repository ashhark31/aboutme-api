const { logger } = require("../config/logger");
const { KeyInfoModel } = require("./common-db-methods");

const createKeyInfoCtrlDetails = async (reqData) => {
    try{
        const newKeyInfoUser = new KeyInfoModel(reqData);
        const response = await newKeyInfoUser.save();
        return response;

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const updateKeyInfoCtrlDetails = async (reqData) => {
    try{
        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await KeyInfoModel.findOneAndUpdate(query,updateData, {
            new: true
        })
        return result;
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        })
    }
}

const retrieveKeyInfoCtrlDetails = async(reqId) => {
    try{
        const query = { key: Number(reqId?.key) };
        const result = await KeyInfoModel.find(query);
        return result;
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

const deleteKeyInfoctrlDetails = async(reqId) => {
    try{
        const query = { key: Number(reqId?.key) };
        const result = await KeyInfoModel.findOneAndDelete(query);
        return result;
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