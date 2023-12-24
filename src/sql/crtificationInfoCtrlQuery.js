const { logger } = require("../config/logger");
const { CrtificationInfoModel } = require("./common-db-methods");


const createCrtInfoCtrlDetails = async (reqData) => {
    try{
        const existingCrt = reqData.map( async (data) => {
            const isCrtExist = await CrtificationInfoModel.findOne({key: data?.key});
            if(isCrtExist){
                return {
                    status:400, 
                    message: `Project details ${data?.key} already exist. Please use unique key.`
                };
            } 
            return {status:200}
        })

        const certification = await Promise.all(existingCrt);
        if(certification?.status === 400){
            return {status:400, message: certification?.message}
        }

        const promise = reqData.map((data) => {
            const newCrtInfoUser = new CrtificationInfoModel(data);
            return newCrtInfoUser.save();
        })

        const result = await Promise.all(promise);
        return { status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const updateCrtInfoCtrlDetails = async (reqData) => {
    try{
        const isCrtExist = await CrtificationInfoModel.findOne({key: reqData?.key});
        if(!isCrtExist){
            return {status:400, message: 'Certification info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await CrtificationInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveCrtInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await CrtificationInfoModel.find({});
            return { status: 200, response: result};
        }

        const query = { key: Number(reqId?.key) };
        const result = await CrtificationInfoModel.find(query);
        
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

const deleteCrtInfoctrlDetails = async(reqId) => {
    try{
        const isCrtExist = await CrtificationInfoModel.findOne({key: reqId?.key});
        if(!isCrtExist){
            return {status:400, message: 'Certification info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await CrtificationInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createCrtInfoCtrlDetails,
    updateCrtInfoCtrlDetails,
    retrieveCrtInfoCtrlDetails,
    deleteCrtInfoctrlDetails
}