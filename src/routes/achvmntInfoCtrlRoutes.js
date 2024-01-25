const { 
    createAchvmntInfoCtrlService, 
    updateAchvmntInfoCtrlService, 
    retrieveAchvmntInfoCtrlService,
    deleteAchvmntInfoCtrlService
} = require("../services/achvmntInfoCtrlService");


const createAchvmntInfoCtrl = async (req,res) => {
    let achvmntInfoCtrlDetails = {data: req.body};
    if(!validateCrtAchvmntInfoCtrl(achvmntInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: achvmntInfoCtrl details are missing" })
    }

    try{
        const result = await createAchvmntInfoCtrlService(achvmntInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "achvmntInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}

const updateAchvmntInfoCtrl = async (req,res) => {
    let achvmntInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptAchvmntInfoCtrl(achvmntInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: achvmntInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateAchvmntInfoCtrlService(achvmntInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "AchvmntInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
} 

const retrieveAchvmntInfoCtrl = async (req,res) => {
    let achvmntInfoId = req.params;
    if(!achvmntInfoId || JSON.stringify(achvmntInfoId) === "{}" || achvmntInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: AchvmntInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveAchvmntInfoCtrlService(achvmntInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status: 200,
                message: "AchvmntInfoCtrl details are retrieved successfully",
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

const deleteAchvmntInfoCtrl = async (req,res) => {
    let achvmntInfoId = req.params;
    if(!achvmntInfoId || JSON.stringify(achvmntInfoId) === "{}" || achvmntInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: AchvmntInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteAchvmntInfoCtrlService(achvmntInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `AchvmntInfoCtrl: ${achvmntInfoId?.key} details are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}


const validateCrtAchvmntInfoCtrl = (body) => {
    let response = body?.data.map((data) => {
        if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
        if(typeof data?.key !== "number") return false;
        if(typeof data?.achvmntTitle !== "string")   return false;
        if(data?.url && typeof data?.url !== "string")  return false;
        if(data?.description && typeof data?.description !== "string")  return false;
        if(data?.achvmntProfileCtrl && typeof data?.achvmntProfileCtrl !== "string")  return false;
    })

    if(response.includes(false))   return false;
    return true;
}

const validateUptAchvmntInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string") return false;
    if(data?.body?.achvmntTitle && typeof data?.body?.achvmntTitle !== "string")   return false;
    if(data?.body?.url && typeof data?.body?.url !== "string")  return false;
    if(data?.body?.description && typeof data?.body?.description !== "string")  return false;
    if(data?.body?.achvmntProfileCtrl && typeof data?.body?.achvmntProfileCtrl !== "string")  return false;
    return true;
}

module.exports = {
    createAchvmntInfoCtrl,
    updateAchvmntInfoCtrl,
    retrieveAchvmntInfoCtrl,
    deleteAchvmntInfoCtrl
}