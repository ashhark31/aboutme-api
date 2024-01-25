const { 
    createEduInfoCtrlService,
    updateEduInfoCtrlService,
    retrieveEduInfoCtrlService,
    deleteEduInfoCtrlService
} = require("../services/eduInfoCtrlService");


const createEduInfoCtrl = async (req,res) => {
    let eduInfoCtrlDetails = {data: req.body};
    if(!validateCrtEduInfoCtrl(eduInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: eduInfoCtrl details are missing" })
    }

    try{
        const result = await createEduInfoCtrlService(eduInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "EduInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 400, message: err.message });
    }
}

const updateEduInfoCtrl = async (req,res) => {
    let eduInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptEduInfoCtrl(eduInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: eduInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateEduInfoCtrlService(eduInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "EduInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ message: err.message });
    }
} 

const retrieveEduInfoCtrl = async (req,res) => {
    let eduInfoId = req.params;
    if(!eduInfoId || JSON.stringify(eduInfoId) === "{}" || eduInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: EduInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveEduInfoCtrlService(eduInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status: 200,
                message: "EduInfoCtrl details are retrieved successfully",
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

const deleteEduInfoCtrl = async (req,res) => {
    let eduInfoId = req.params;
    if(!eduInfoId || JSON.stringify(eduInfoId) === "{}" || eduInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: EduInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteEduInfoCtrlService(eduInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `EduInfoCtrl:${eduInfoId?.key} details are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
}


//Schama
const validateCrtEduInfoCtrl = (body) => {
    let response = body?.data.map((data) => {
        if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
        if(typeof data?.key !== "number") return false;
        if(typeof data?.degreeName !== "string")   return false;
        if(typeof data?.courseName !== "string")  return false;
        if(typeof data?.university !== "string") return false;
        if(typeof data?.graduationYear !== "string")  return false;
        if(data?.universityProfileCtrl && typeof data?.universityProfileCtrl !== "string")   return false;
        return true;
    })

    if(response.includes(false))   return false;
    return true;
}

const validateUptEduInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string")   return false;
    if(data?.body?.degreeName && typeof data?.body?.degreeName !== "string")  return false;
    if(data?.body?.courseName && typeof data?.body?.courseName !== "string")  return false;
    if(data?.body?.university && typeof data?.body?.university !== "string")  return false;
    if(data?.body?.graduationYear && typeof data?.body?.graduationYear !== "string")  return false;
    if(data?.body?.universityProfileCtrl && typeof data?.body?.universityProfileCtrl !== "string")   return false;
    return true;
}

module.exports = {
    createEduInfoCtrl,
    updateEduInfoCtrl,
    retrieveEduInfoCtrl,
    deleteEduInfoCtrl
}