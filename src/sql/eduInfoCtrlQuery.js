const { logger } = require("../config/logger");
const { EduInfoModel } = require("./common-db-methods");


const createEduInfoCtrlDetails = async (reqData) => {
    try{
        const existingUser = reqData.map( async (data) => {
            const isUserExist = await EduInfoModel.findOne({key: data?.key});
            if(isUserExist){
                return {
                    status:400, 
                    message: `Education details ${data?.key} already exist. Please use unique key.`
                };
            } 
            return {status:200}
        })

        const user = await Promise.all(existingUser);
        if(user?.status === 400){
            return {status:400, message: user?.message}
        }

        const promise = reqData.map((data) => {
            const newEduInfoUser = new EduInfoModel(data);
            return newEduInfoUser.save();
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

const updateEduInfoCtrlDetails = async (reqData) => {
    try{
        const isUserExist = await EduInfoModel.findOne({key: reqData?.key});
        if(!isUserExist){
            return {status:400, message: 'Education info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await EduInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveEduInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await EduInfoModel.find({}).sort({key:1});
            return { status: 200, response: result};
        }

        const query = { key: Number(reqId?.key) };
        const result = await EduInfoModel.find(query);

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

const deleteEduInfoCtrlDetails = async(reqId) => {
    try{
        const isUserExist = await EduInfoModel.findOne({key: reqId?.key});
        if(!isUserExist){
            return {status:400, message: 'Education info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await EduInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};
        
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createEduInfoCtrlDetails,
    updateEduInfoCtrlDetails,
    retrieveEduInfoCtrlDetails,
    deleteEduInfoCtrlDetails
}