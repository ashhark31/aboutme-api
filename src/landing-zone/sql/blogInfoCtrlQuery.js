const { logger } = require("../../config/logger");
const { BlogInfoModel } = require("./landing-schema-methods");

const createBlogInfoCtrlDetails = async (reqData) => {
    try{
        const existingBlog = await BlogInfoModel.findOne({key: reqData?.key});
        if(existingBlog){
            return {status:400, message: 'Blog details already exist. Please use unique key.'};
        }

        const newBlogInfoUser = new BlogInfoModel(reqData);
        const result = await newBlogInfoUser.save();
        return { status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const updateBlogInfoCtrlDetails = async (reqData) => {
    try{
        const isBlogExist = await BlogInfoModel.findOne({key: reqData?.key});
        if(!isBlogExist){
            return {status:400, message: 'Blog info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await BlogInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveBlogInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await BlogInfoModel.find({}).sort({key:1});
            return { status: 200, response: result};
        }
        const query = { key: Number(reqId?.key) };
        const result = await BlogInfoModel.find(query);

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

const deleteBlogInfoctrlDetails = async(reqId) => {
    try{
        const isBlogExist = await BlogInfoModel.findOne({key: reqId?.key});
        if(!isBlogExist){
            return {status:400, message: 'Blog info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await BlogInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};
        
    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createBlogInfoCtrlDetails,
    updateBlogInfoCtrlDetails,
    retrieveBlogInfoCtrlDetails,
    deleteBlogInfoctrlDetails
}