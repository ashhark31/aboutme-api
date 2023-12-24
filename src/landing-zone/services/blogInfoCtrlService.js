const { logger } = require("../../config/logger");
const { 
    createBlogInfoCtrlDetails, 
    updateBlogInfoCtrlDetails, 
    retrieveBlogInfoCtrlDetails,
    deleteBlogInfoctrlDetails
} = require("../sql/blogInfoCtrlQuery");

const createBlogInfoCtrlService = async (blogInfoAvail) => {
    try{
        let result = await createBlogInfoCtrlDetails(blogInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in const createBlogInfoCtrlService : ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const updateBlogInfoCtrlService = async (blogInfoAvail) => {
    try {
        let result = await updateBlogInfoCtrlDetails(blogInfoAvail);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in updateBlogInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const retrieveBlogInfoCtrlService = async (blogiInfoId) => {
    try {
        let result = await retrieveBlogInfoCtrlDetails(blogiInfoId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in retrieveBlogInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

const deleteBlogInfoCtrlService = async (blogiInfoId) => {
    try {
        let result = await deleteBlogInfoctrlDetails(blogiInfoId);
        return result;
    } catch (err) {
        logger.info({
            message: `Error caught in deleteBlogInfoCtrlService: ${err.message}`,
            extra: err.stack
        })
        throw err;
    }
}

module.exports = {
    createBlogInfoCtrlService,
    updateBlogInfoCtrlService,
    retrieveBlogInfoCtrlService,
    deleteBlogInfoCtrlService
}