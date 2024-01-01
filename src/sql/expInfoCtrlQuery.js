const { logger } = require("../config/logger");
const { ExpInfoModel } = require("./common-db-methods");


const createExpInfoCtrlDetails = async (reqData) => {
    try{
        const existingUser = reqData.map( async (data) => {
            const isUserExist = await ExpInfoModel.findOne({key: data?.key});
            if(isUserExist){
                return {
                    status:400, 
                    message: `Experience details ${data?.key} already exist. Please use unique key.`
                };
            } 
            return {status:200}
        })

        const user = await Promise.all(existingUser);
        if(user?.status === 400){
            return {status:400, message: user?.message}
        }

        const promise = reqData.map((data) => {
            const newExpInfoUser = new ExpInfoModel(data);
            return newExpInfoUser.save();
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

const updateExpInfoCtrlDetails = async (reqData) => {
    try{
        const isUserExist = await ExpInfoModel.findOne({key: reqData?.key});
        if(!isUserExist){
            return {status:400, message: 'Exp info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await ExpInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveExpInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await ExpInfoModel.find({}).sort({key:1});
            return { status: 200, response: result};
        }

        const query = { key: Number(reqId?.key) };
        const result = await ExpInfoModel.find(query);

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

const deleteExpInfoCtrlDetails = async(reqId) => {
    try{
        const isUserExist = await ExpInfoModel.findOne({key: reqId?.key});
        if(!isUserExist){
            return {status:400, message: 'Exp info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await ExpInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};
        
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createExpInfoCtrlDetails,
    updateExpInfoCtrlDetails,
    retrieveExpInfoCtrlDetails,
    deleteExpInfoCtrlDetails
}