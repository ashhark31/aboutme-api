const { 
    createKeyInfoCtrlService, 
    updateKeyInfoCtrlService, 
    retrieveKeyInfoCtrlService,
    deleteKeyInfoCtrlService
} = require("../services/keyInfoCtrlService");

const createKeyInfoCtrl = async (req,res) => {
    let keyInfoCtrlDetails = {data: req.body};
    if(!validateCrtKeyInfoCtrl(keyInfoCtrlDetails?.data)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: KeyInfoCtrl details are missing" })
    }

    try{
        const result = await createKeyInfoCtrlService(keyInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "KeyInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}

const updateKeyInfoCtrl = async (req,res) => {
    let keyInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptKeyInfoCtrl(keyInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: KeyInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateKeyInfoCtrlService(keyInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "KeyInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
} 

const retrieveKeyInfoCtrl = async (req,res) => {
    let keyInfo = req.params;
    if(!keyInfo || JSON.stringify(keyInfo) === "{}" || keyInfo?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: KeyInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveKeyInfoCtrlService(keyInfo);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status: 200,
                message: "KeyInfoCtrl details are retrieved successfully",
                data: result?.response 
            })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}

const deleteKeyInfoCtrl = async (req,res) => {
    let keyInfo = req.params;
    if(!keyInfo || JSON.stringify(keyInfo) === "{}" || keyInfo?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: KeyInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteKeyInfoCtrlService(keyInfo);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `KeyInfoCtrl:${keyInfo?.key} details are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}


// Request Body validations
const validateCrtKeyInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "number")   return false;
    if(typeof data?.baseInfoCtrlKey !== "number")  return false;
    if(typeof data?.eduId !== "object") return false;
    if(typeof data?.empId !== "object") return false;
    if(typeof data?.projectId !== "object")  return false;
    if(typeof data?.skillId !== "number")  return false;
    if(typeof data?.achvmntId !== "object") return false;
    if(typeof data?.certId !== "object")  return false;
    return true;
}

const validateUptKeyInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string")   return false;
    if(data?.body?.baseInfoCtrlKey && typeof data?.body?.baseInfoCtrlKey !== "number")  return false;
    if(data?.body?.eduId && typeof data?.body?.eduId !== "object") return false;
    if(data?.body?.empId && typeof data?.body?.empId !== "object") return false;
    if(data?.body?.projectId && typeof data?.body?.projectId !== "object")  return false;
    if(data?.body?.skillId && typeof data?.body?.skillId !== "number")  return false;
    if(data?.body?.achvmntId && typeof data?.body?.achvmntId !== "object") return false;
    if(data?.body?.certId && typeof data?.body?.certId !== "object")  return false;
    return true;
}

module.exports = {
    createKeyInfoCtrl,
    updateKeyInfoCtrl,
    retrieveKeyInfoCtrl,
    deleteKeyInfoCtrl
}