const { 
    createCrtInfoCtrlService, 
    updateCrtInfoCtrlService, 
    retrieveCrtInfoCtrlService,
    deleteCrtInfoCtrlService
} = require("../services/crtificationInfoCtrlService");


const createCrtInfoCtrl = async (req,res) => {
    let certInfoCtrlDetails = {data: req.body};
    if(!validateCrtCrtInfoCtrl(certInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: certInfoCtrl details are missing" })
    }

    try{
        const result = await createCrtInfoCtrlService(certInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "certInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}

const updateCrtInfoCtrl = async (req,res) => {
    let certInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptCrtInfoCtrl(certInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: certInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateCrtInfoCtrlService(certInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "CertInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
} 

const retrieveCrtInfoCtrl = async (req,res) => {
    let certInfoId = req.params;
    if(!certInfoId || JSON.stringify(certInfoId) === "{}" || certInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: CertInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveCrtInfoCtrlService(certInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status: 200,
                message: "CertInfoCtrl details are retrieved successfully",
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

const deleteCrtInfoCtrl = async (req,res) => {
    let certInfoId = req.params;
    if(!certInfoId || JSON.stringify(certInfoId) === "{}" || certInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: CertInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteCrtInfoCtrlService(certInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `CertInfoCtrl: ${certInfoId?.key} details are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}


const validateCrtCrtInfoCtrl = (body) => {
    let response = body.data.map((data) => {
        if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
        if(typeof data?.key !== "number") return false;
        if(typeof data?.certName !== "string")   return false;
        if(data?.url && typeof data?.url !== "string")  return false;
        if(data?.description && typeof data?.description !== "string")  return false;
    })

    if(response.includes(false))   return false;
    return true;
}

const validateUptCrtInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string") return false;
    if(data?.body?.certName && typeof data?.body?.certName !== "string")   return false;
    if(data?.body?.url && typeof data?.body?.url !== "string")  return false;
    if(data?.body?.description && typeof data?.body?.description !== "string")  return false;
    return true;
}

module.exports = {
    createCrtInfoCtrl,
    updateCrtInfoCtrl,
    retrieveCrtInfoCtrl,
    deleteCrtInfoCtrl
}