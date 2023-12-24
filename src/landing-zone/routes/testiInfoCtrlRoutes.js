const { 
    createTestiInfoCtrlService, 
    updateTestiInfoCtrlService, 
    retrieveTestiInfoCtrlService,
    deleteTestiInfoCtrlService
} = require("../services/testiInfoCtrlService");

const createTestiInfoCtrl = async (req,res) => {
    let testiInfoCtrlDetails = {data: req.body};
    if(!validateCrtTestiInfoCtrl(testiInfoCtrlDetails?.data)){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: testiInfoCtrl details are missing" })
    }

    try{
        const result = await createTestiInfoCtrlService(testiInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: "testiInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
}

const updateTestiInfoCtrl = async (req,res) => {
    let testiInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptTestiInfoCtrl(testiInfoCtrlDetails)){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: testiInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateTestiInfoCtrlService(testiInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: "testiInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
} 

const retrieveTestiInfoCtrl = async (req,res) => {
    let testiInfo = req.params;
    if(!testiInfo || JSON.stringify(testiInfo) === "{}" || testiInfo?.key === ""){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: testiInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveTestiInfoCtrlService(testiInfo);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status:200,
                message: "testiInfoCtrl details are retrieved successfully",
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

const deleteTestiInfoCtrl = async (req,res) => {
    let testiInfo = req.params;
    if(!testiInfo || JSON.stringify(testiInfo) === "{}" || testiInfo?.key === ""){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: testiInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteTestiInfoCtrlService(testiInfo);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: `testiInfoCtrl:${testiInfo?.key} details are deleted successfully` })
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
const validateCrtTestiInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "number")   return false;
    if(typeof data?.userName !== "string")  return false;
    if(data?.headline && typeof data?.headline !== "string")   return false;
    if(typeof data?.feedback !== "string")  return false;
    if(data?.userProfile && typeof data?.userProfile !== "string") return false;
    return true;
}

const validateUptTestiInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string")   return false;
    if(data?.body?.userName && typeof data?.body?.userName !== "string")  return false;
    if(data?.body?.headline && typeof data?.body?.headline !== "string")   return false;
    if(data?.body?.feedback && typeof data?.body?.feedback !== "string")  return false;
    if(data?.body?.userProfile && typeof data?.body?.userProfile !== "string") return false;
    return true;
}

module.exports = {
    createTestiInfoCtrl,
    updateTestiInfoCtrl,
    retrieveTestiInfoCtrl,
    deleteTestiInfoCtrl
}