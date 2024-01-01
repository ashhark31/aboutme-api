const { logger } = require("../config/logger");
const { ProjectInfoModel }  = require("./common-db-methods")

const createProjectInfoCtrlDetails = async (reqData) => {
    try{
        const existingProj = reqData.map( async (data) => {
            const isProjExist = await ProjectInfoModel.findOne({key: data?.key});
            if(isProjExist){
                return {
                    status:400, 
                    message: `Project details ${data?.key} already exist. Please use unique key.`
                };
            } 
            return {status:200}
        })

        const project = await Promise.all(existingProj);
        if(project?.status === 400){
            return {status:400, message: project?.message}
        }

        const promise = reqData.map((data) => {
            const newProjectInfoUser = new ProjectInfoModel(data);
            return newProjectInfoUser.save();
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

const updateProjectInfoCtrlDetails = async (reqData) => {
    try{
        const isProjExist = await ProjectInfoModel.findOne({key: reqData?.key});
        if(!isProjExist){
            return {status:400, message: 'Project info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await ProjectInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveProjectInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await ProjectInfoModel.find({}).sort({key:1});
            return { status: 200, response: result};
        }

        const query = { key: Number(reqId?.key) };
        const result = await ProjectInfoModel.find(query);

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

const deleteProjectInfoctrlDetails = async(reqId) => {
    try{
        const isProjExist = await ProjectInfoModel.findOne({key: reqId?.key});
        if(!isProjExist){
            return {status:400, message: 'Project info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await ProjectInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createProjectInfoCtrlDetails,
    updateProjectInfoCtrlDetails,
    retrieveProjectInfoCtrlDetails,
    deleteProjectInfoctrlDetails
}