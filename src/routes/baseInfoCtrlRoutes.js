const { 
    createBaseInfoCtrlService, 
    updateBaseInfoCtrlService, 
    retrieveBaseInfoCtrlService,
    deleteBaseInfoCtrlService
} = require("../services/baseInfoCtrlService")

const createBaseInfoCtrl = async (req,res) => {
    let baseInfoCtrlDetails = {data: req.body};
    if(!validateCrtBaseInfoCtrl(baseInfoCtrlDetails?.data)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params or required details are missing" })
    }

    try{
        const result = await createBaseInfoCtrlService(baseInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "Base information details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}

const updateBaseInfoCtrl = async (req,res) => {
    let baseInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptBaseInfoCtrl(baseInfoCtrlDetails)){
        res.status(400)
        return res.send({ message: "Invalid input params: baseInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateBaseInfoCtrlService(baseInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "Base info details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
} 

const retrieveBaseInfoCtrl = async (req,res) => {
    let baseInfoId = req.params;
    if(!baseInfoId || JSON.stringify(baseInfoId) === "{}" || baseInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: baseInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveBaseInfoCtrlService(baseInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status: 200,
                message: "Base information details are retrieved successfully",
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

const deleteBaseInfoCtrl = async (req,res) => {
    let baseInfoId = req.params;
    if(!baseInfoId || JSON.stringify(baseInfoId) === "{}" || baseInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: baseInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteBaseInfoCtrlService(baseInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `Base info details followed by ${baseInfoId?.baseInfoCtrlKey} are deleted successfully` })
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
const validateCrtBaseInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "number")   return false;
    if(typeof data?.headlineInfoCtrl !== "string")  return false;
    if(typeof data?.userFirstName !== "string") return false;
    if(typeof data?.userLastName !== "string")  return false;
    if(data?.userDOBCtrl && typeof data?.userDOBCtrl !== "string")   return false;
    if(data?.addressCityInfo && typeof data?.addressCityInfo !== "string")   return false;
    if(data?.addressStateInfo && typeof data?.addressStateInfo !== "string")  return false;
    if(data?.addressCountryInfo && typeof data?.addressCountryInfo !== "string")    return false;
    if(typeof data?.userEmailInfo !== "string") return false;
    if(typeof data?.linkedinInfoCtrl !== "string")  return false;
    if(data?.twitterInfoCtrl && typeof data?.twitterInfoCtrl !== "string")   return false;
    if(data?.baseProfileCtrl && typeof data?.baseProfileCtrl !== "string")   return false;
    return true;
}

const validateUptBaseInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string")   return false;
    if(data?.body?.headlineInfoCtrl && typeof data?.body?.headlineInfoCtrl !== "string")  return false;
    if(data?.body?.userFirstName && typeof data?.body?.userFirstName !== "string") return false;
    if(data?.body?.userLastName && typeof data?.body?.userLastName !== "string")  return false;
    if(data?.body?.userDOBCtrl && typeof data?.body?.userDOBCtrl !== "string")   return false;
    if(data?.body?.addressCityInfo && typeof data?.body?.addressCityInfo !== "string")   return false;
    if(data?.body?.addressStateInfo && typeof data?.body?.addressStateInfo !== "string")  return false;
    if(data?.body?.addressCountryInfo && typeof data?.body?.addressCountryInfo !== "string")    return false;
    if(data?.body?.userEmailInfo && typeof data?.body?.userEmailInfo !== "string") return false;
    if(data?.body?.linkedinInfoCtrl && typeof data?.body?.linkedinInfoCtrl !== "string")  return false;
    if(data?.body?.twitterInfoCtrl && typeof data?.body?.twitterInfoCtrl !== "string")   return false;
    if(data?.body?.baseProfileCtrl && typeof data?.body?.baseProfileCtrl !== "string")   return false;
    return true;
}

module.exports = { 
    createBaseInfoCtrl,
    updateBaseInfoCtrl,
    retrieveBaseInfoCtrl,
    deleteBaseInfoCtrl 
}