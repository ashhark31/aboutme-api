const { 
    createSkillInfoCtrlService, 
    updateSkillInfoCtrlService, 
    retrieveSkillInfoCtrlService,
    deleteSkillInfoCtrlService
} = require("../services/skillInfoCtrlService");


const createSkillInfoCtrl = async (req,res) => {
    let skillInfoCtrlDetails = {data: req.body};
    if(!validateCrtSkillInfoCtrl(skillInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: skillInfoCtrl details are missing" })
    }

    try{
        const result = await createSkillInfoCtrlService(skillInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "SkillInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}

const updateSkillInfoCtrl = async (req,res) => {
    let skillInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptSkillInfoCtrl(skillInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: skillInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateSkillInfoCtrlService(skillInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "SkillInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
} 

const retrieveSkillInfoCtrl = async (req,res) => {
    let skillInfoId = req.params;
    if(!skillInfoId || JSON.stringify(skillInfoId) === "{}" || skillInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: SkillInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveSkillInfoCtrlService(skillInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status: 200,
                message: "SkillInfoCtrl details are retrieved successfully",
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

const deleteSkillInfoCtrl = async (req,res) => {
    let skillInfoId = req.params;
    if(!skillInfoId || JSON.stringify(skillInfoId) === "{}" || skillInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: SkillInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteSkillInfoCtrlService(skillInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `SkillInfoCtrl: ${skillInfoId?.key} details are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}



const validateCrtSkillInfoCtrl = (body) => {
    if(!body?.data || Object.keys(body?.data).length === 0 || JSON.stringify(body?.data) === "{}")    return false;
    if(typeof body?.data?.key !== "number") return false;
    if(body?.data?.technical && Object.keys(body?.data?.technical).length === 0) return false;
    if(body?.data?.behaivioral && Object.keys(body?.data?.behaivioral).length === 0) return false;
    
    let response = body?.data?.technical && body?.data?.technical.map((data) => {
        if(typeof data?.name !== "string")  return false;
        if(typeof data?.keywords !== "object")  return false;
    })
    
    if(body?.data?.technical && response.includes(false))    return false;
    
    response = body?.data?.behaivioral && body?.data?.behaivioral?.map((data) => {
        if(typeof data?.name !== "string")  return false;
        if(typeof data?.keywords !== "object")  return false;
    })

    if(body?.data?.behaivioral && response.includes(false))    return false;
    return true;
}

const validateUptSkillInfoCtrl = (data) => {
    let count = 0;
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string") return false;
    if(data?.body?.technical && JSON.stringify(data?.body?.technical) === "{}") return false;
    if(data?.body?.behaivioral && JSON.stringify(data?.body?.behaivioral) === "{}") return false;
    data?.body?.technical && data?.body?.technical?.map((data) => {
        if(typeof data?.name !== "string")  return false;
        if(typeof data?.keywords !== "object")  return false;
        count++;
    })
    if(data?.body?.technical && count !== data?.body?.technical.length)    return false;
    count = 0;
    data?.body?.behaivioral && data?.body?.behaivioral?.map((data) => {
        if(typeof data?.name !== "string")  return false;
        if(typeof data?.keywords !== "object")  return false;
        count++;
    })
    if(data?.body?.behaivioral && count !== data?.body?.behaivioral.length)    return false;
    return true;
}

module.exports = {
    createSkillInfoCtrl,
    updateSkillInfoCtrl,
    retrieveSkillInfoCtrl,
    deleteSkillInfoCtrl
}