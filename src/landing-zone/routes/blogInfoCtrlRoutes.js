const { 
    createBlogInfoCtrlService, 
    updateBlogInfoCtrlService, 
    retrieveBlogInfoCtrlService,
    deleteBlogInfoCtrlService
} = require("../services/blogInfoCtrlService");

const createBlogInfoCtrl = async (req,res) => {
    let blogInfoCtrlDetails = {data: req.body};
    if(!validateCrtBlogInfoCtrl(blogInfoCtrlDetails?.data)){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: blogInfoCtrl details are missing" })
    }

    try{
        const result = await createBlogInfoCtrlService(blogInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: "blogInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({status:500, message: err.message });
    }
}

const updateBlogInfoCtrl = async (req,res) => {
    let blogInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptBlogInfoCtrl(blogInfoCtrlDetails)){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: blogInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateBlogInfoCtrlService(blogInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: "blogInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
} 

const retrieveBlogInfoCtrl = async (req,res) => {
    let blogInfo = req.params;
    if(!blogInfo || JSON.stringify(blogInfo) === "{}" || blogInfo?.key === ""){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: blogInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveBlogInfoCtrlService(blogInfo);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status:200,
                message: "blogInfoCtrl details are retrieved successfully",
                data: result?.response 
            })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
}

const deleteBlogInfoCtrl = async (req,res) => {
    let blogInfo = req.params;
    if(!blogInfo || JSON.stringify(blogInfo) === "{}" || blogInfo?.key === ""){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: blogInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteBlogInfoCtrlService(blogInfo);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: `blogInfoCtrl:${blogInfo?.key} details are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
}


// Request Body validations
const validateCrtBlogInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "number")   return false;
    if(typeof data?.headline !== "string")  return false;
    if(typeof data?.content !== "string")  return false;
    if(data?.image && typeof data?.image !== "string") return false;
    return true;
}

const validateUptBlogInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string")   return false;
    if(data?.body?.headline && typeof data?.body?.headline !== "string")  return false;
    if(data?.body?.content && typeof data?.body?.content !== "string")  return false;
    if(data?.body?.image && typeof data?.body?.image !== "string") return false;
    return true;
}

module.exports = {
    createBlogInfoCtrl,
    updateBlogInfoCtrl,
    retrieveBlogInfoCtrl,
    deleteBlogInfoCtrl
}