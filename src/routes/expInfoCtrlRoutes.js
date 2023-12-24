const { 
    createExpInfoCtrlService, 
    updateExpInfoCtrlService, 
    retrieveExpInfoCtrlService,
    deleteExpInfoCtrlService
} = require("../services/ExpInfoCtrlService");


const createExpInfoCtrl = async (req,res) => {
    let expInfoCtrlDetails = {data: req.body};
    if(!validateCrtExpInfoCtrl(expInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: expInfoCtrl details are missing" })
    }

    try{
        const result = await createExpInfoCtrlService(expInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "ExpInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 400, message: err.message });
    }
}

const updateExpInfoCtrl = async (req,res) => {
    let expInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptExpInfoCtrl(expInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: expInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateExpInfoCtrlService(expInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "ExpInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ message: err.message });
    }
} 

const retrieveExpInfoCtrl = async (req,res) => {
    let empInfoId = req.params;
    if(!empInfoId || JSON.stringify(empInfoId) === "{}" || empInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: ExpInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveExpInfoCtrlService(empInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status: 200,
                message: "ExpInfoCtrl details are retrieved successfully",
                data: result?.response 
            })
        } else {
            res.status(result?.status)
            return res.send({ message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ message: err.message });
    }
}

const deleteExpInfoCtrl = async (req,res) => {
    let expInfoId = req.params;
    if(!expInfoId || JSON.stringify(expInfoId) === "{}" || expInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: ExpInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteExpInfoCtrlService(expInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `ExpInfoCtrl:${expInfoId?.key} details are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ message: err.message });
    }
}


//Schama
const validateCrtExpInfoCtrl = (body) => {
    let response = body.data.map((data) => {
        if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
        if(typeof data?.key !== "number") return false;
        if(typeof data?.companyName !== "string")   return false;
        if(typeof data?.position !== "string")  return false;
        if(typeof data?.startDate !== "string") return false;
        if(data?.endDate && typeof data?.endDate !== "string")  return false;
        if(typeof data?.currentlyWorking !== "boolean")   return false;
        if(data?.description && typeof data?.description !== "string")  return false;
        return true;
    })

    if(response.includes(false))   return false;
    return true;
}

const validateUptExpInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string")   return false;
    if(data?.body?.companyName && typeof data?.body?.companyName !== "string")  return false;
    if(data?.body?.position && typeof data?.body?.position !== "string")  return false;
    if(data?.body?.startDate && typeof data?.body?.startDate !== "string")  return false;
    if(data?.body?.endDate && typeof data?.body?.endDate !== "string")  return false;
    if(data?.body?.currentlyWorking && typeof data?.body?.currentlyWorking !== "boolean")  return false;
    if(data?.body?.description && typeof data?.body?.description !== "string")  return false;
    return true;
}

module.exports = {
    createExpInfoCtrl,
    updateExpInfoCtrl,
    retrieveExpInfoCtrl,
    deleteExpInfoCtrl
}