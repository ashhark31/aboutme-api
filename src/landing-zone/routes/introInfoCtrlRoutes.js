const { 
    createIntroInfoCtrlService, 
    updateIntroInfoCtrlService, 
    retrieveIntroInfoCtrlService,
    deleteIntroInfoCtrlService
} = require("../services/introInfoCtrlService");

const createIntroInfoCtrl = async (req,res) => {
    let introInfoCtrlDetails = {data: req.body};
    if(!validateCrtIntroInfoCtrl(introInfoCtrlDetails?.data)){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: introInfoCtrl details are missing" })
    }

    try{
        const result = await createIntroInfoCtrlService(introInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: "introInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
}

const updateIntroInfoCtrl = async (req,res) => {
    let introInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptIntroInfoCtrl(introInfoCtrlDetails)){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: introInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateIntroInfoCtrlService(introInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: "introInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
} 

const retrieveIntroInfoCtrl = async (req,res) => {
    let introInfo = req.params;
    if(!introInfo || JSON.stringify(introInfo) === "{}" || introInfo?.key === ""){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: introInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveIntroInfoCtrlService(introInfo);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status:200,
                message: "introInfoCtrl details are retrieved successfully",
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

const deleteIntroInfoCtrl = async (req,res) => {
    let introInfo = req.params;
    if(!introInfo || JSON.stringify(introInfo) === "{}" || introInfo?.key === ""){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: introInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteIntroInfoCtrlService(introInfo);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: `introInfoCtrl:${introInfo?.key} details are deleted successfully` })
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
const validateCrtIntroInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "number")   return false;
    if(typeof data?.description !== "string")  return false;
    return true;
}

const validateUptIntroInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string")   return false;
    if(data?.body?.description && typeof data?.body?.description !== "string")  return false;
    return true;
}

module.exports = {
    createIntroInfoCtrl,
    updateIntroInfoCtrl,
    retrieveIntroInfoCtrl,
    deleteIntroInfoCtrl
}