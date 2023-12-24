const { logger } = require("../config/logger");
const { AchvmntInfoModel } = require("./common-db-methods");

const createAchvmntInfoCtrlDetails = async (reqData) => {
    try{
        const existingAchvmnt = reqData.map( async (data) => {
            const isAchvmntExist = await AchvmntInfoModel.findOne({key: data?.key});
            if(isAchvmntExist){
                return {
                    status:400, 
                    message: `Achievement details ${data?.key} already exist. Please use unique key.`
                };
            } 
            return {status:200}
        })

        const achievement = await Promise.all(existingAchvmnt);
        if(achievement?.status === 400){
            return {status:400, message: achievement?.message}
        }

        const promise = reqData.map((data) => {
            const newAchvmntInfoUser = new AchvmntInfoModel(data);
            return newAchvmntInfoUser.save();
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

const updateAchvmntInfoCtrlDetails = async (reqData) => {
    try{
        const isAchvmntExist = await AchvmntInfoModel.findOne({key: reqData?.key});
        if(!isAchvmntExist){
            return {status:400, message: 'Achievement info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await AchvmntInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveAchvmntInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await AchvmntInfoModel.find({});
            return { status: 200, response: result};
        }

        const query = { key: Number(reqId?.key) };
        const result = await AchvmntInfoModel.find(query);

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

const deleteAchvmntInfoctrlDetails = async(reqId) => {
    try{
        const isAchvmntExist = await AchvmntInfoModel.findOne({key: reqId?.key});
        if(!isAchvmntExist){
            return {status:400, message: 'Achievement info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await AchvmntInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};
        
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createAchvmntInfoCtrlDetails,
    updateAchvmntInfoCtrlDetails,
    retrieveAchvmntInfoCtrlDetails,
    deleteAchvmntInfoctrlDetails
}