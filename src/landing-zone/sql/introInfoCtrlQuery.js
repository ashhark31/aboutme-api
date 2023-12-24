const { logger } = require("../../config/logger");
const { IntroInfoModel } = require("./landing-schema-methods");

const createIntroInfoCtrlDetails = async (reqData) => {
    try{
        const existingInfo = await IntroInfoModel.findOne({key: reqData?.key});
        if(existingInfo){
            return {status:400, message: 'Info details already exist. Please use unique key.'};
        }

        const newIntroInfoUser = new IntroInfoModel(reqData);
        const result = await newIntroInfoUser.save();
        return { status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const updateIntroInfoCtrlDetails = async (reqData) => {
    try{
        const isInfoExist = await IntroInfoModel.findOne({key: reqData?.key});
        if(!isInfoExist){
            return {status:400, message: 'Info info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await IntroInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveIntroInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await IntroInfoModel.find({});
            return { status: 200, response: result};
        }
        const query = { key: Number(reqId?.key) };
        const result = await IntroInfoModel.find(query);
        
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

const deleteIntroInfoctrlDetails = async(reqId) => {
    try{
        const isInfoExist = await IntroInfoModel.findOne({key: reqId?.key});
        if(!isInfoExist){
            return {status:400, message: 'Info info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await IntroInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};
        
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createIntroInfoCtrlDetails,
    updateIntroInfoCtrlDetails,
    retrieveIntroInfoCtrlDetails,
    deleteIntroInfoctrlDetails
}