const { logger } = require("../../config/logger");
const { TestiInfoModel } = require("./landing-schema-methods");

const createTestiInfoCtrlDetails = async (reqData) => {
    try{
        const existingTesti = await TestiInfoModel.findOne({key: reqData?.key});
        if(existingTesti){
            return {status:400, message: 'Testimonials details already exist. Please use unique key.'};
        }

        const newTestiInfoUser = new TestiInfoModel(reqData);
        const result = await newTestiInfoUser.save();
        return { status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`
        })
        throw err;
    }
}

const updateTestiInfoCtrlDetails = async (reqData) => {
    try{
        const isTestiExist = await TestiInfoModel.findOne({key: reqData?.key});
        if(!isTestiExist){
            return {status:400, message: 'Testimonials info does not exist. Please create data first.'};
        }

        if(JSON.stringify(reqData?.body) === "{}"){
            return { status: 400, message: 'Nothing to be update!' }
        }

        const query = { key: Number(reqData?.key) };
        const updateData = reqData?.body;
        const result = await TestiInfoModel.findOneAndUpdate(query,updateData, {
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

const retrieveTestiInfoCtrlDetails = async(reqId) => {
    try{
        if(isNaN(reqId?.key)){
            const result = await TestiInfoModel.find({});
            return { status: 200, response: result};
        }

        const query = { key: Number(reqId?.key) };
        const result = await TestiInfoModel.find(query);

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

const deleteTestiInfoctrlDetails = async(reqId) => {
    try{
        const isTestiExist = await TestiInfoModel.findOne({key: reqId?.key});
        if(!isTestiExist){
            return {status:400, message: 'Testimonials info does not exist. Please create data first.'};
        }

        const query = { key: Number(reqId?.key) };
        const result = await TestiInfoModel.findOneAndDelete(query);
        return {status: 200, response: result};

    } catch (err) {
        logger.error({
            message: `Something went wrong while executing DB query ${err.message}`,
            extra: err.stack
        }) 
    }
}

module.exports = {
    createTestiInfoCtrlDetails,
    updateTestiInfoCtrlDetails,
    retrieveTestiInfoCtrlDetails,
    deleteTestiInfoctrlDetails
}