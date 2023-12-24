const { 
    createProjectInfoCtrlService, 
    updateProjectInfoCtrlService, 
    retrieveProjectInfoCtrlService,
    deleteProjectInfoCtrlService
} = require("../services/projectInfoCtrlService");


const createProjectInfoCtrl = async (req,res) => {
    let projInfoCtrlDetails = {data: req.body};
    if(!validateCrtProjInfoCtrl(projInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: projectInfoCtrl details are missing" })
    }

    try{
        const result = await createProjectInfoCtrlService(projInfoCtrlDetails?.data);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "projectInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}

const updateProjectInfoCtrl = async (req,res) => {
    let projInfoCtrlDetails = { key: req.params.key, body: req.body };
    if(!validateUptProjInfoCtrl(projInfoCtrlDetails)){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: projectInfoCtrl details are missing" }) 
    }

    try{
        const result = await updateProjectInfoCtrlService(projInfoCtrlDetails);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: "ProjectInfoCtrl details are updated successfully" })
        } else {
            res.status(result?.status)
            return res.send({status: 400, message: result?.message })
        }
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
} 

const retrieveProjectInfoCtrl = async (req,res) => {
    let projectInfoId = req.params;
    if(!projectInfoId || JSON.stringify(projectInfoId) === "{}" || projectInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: ProjectInfoCtrl details are missing" }) 
    }

    try{
        const result = await retrieveProjectInfoCtrlService(projectInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ 
                status: 200,
                message: "ProjectInfoCtrl details are retrieved successfully",
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

const deleteProjectInfoCtrl = async (req,res) => {
    let projectInfoId = req.params;
    if(!projectInfoId || JSON.stringify(projectInfoId) === "{}" || projectInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: ProjectInfoCtrl details are missing" }) 
    }

    try{
        const result = await deleteProjectInfoCtrlService(projectInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `ProjectInfoCtrl: ${projectInfoId?.key} details are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}



const validateCrtProjInfoCtrl = (body) => {
    let response = body.data.map((data) => {
        if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
        if(typeof data?.key !== "number") return false;
        if(typeof data?.projectTitle !== "string")   return false;
        if(data?.url && typeof data?.url !== "string")  return false;
        if(data?.techUsed && typeof data?.techUsed !== "object")   return false;
        if(data?.description && typeof data?.description !== "string")  return false;
    })

    if(response.includes(false))   return false;
    return true;
}

const validateUptProjInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.key !== "string") return false;
    if(data?.body?.projectTitle && typeof data?.body?.projectTitle !== "string")   return false;
    if(data?.body?.url && typeof data?.body?.url !== "string")  return false;
    if(data?.body?.techUsed && typeof data?.body?.techUsed !== "object")   return false;
    if(data?.body?.description && typeof data?.body?.description !== "string")  return false;
    return true;
}

module.exports = {
    createProjectInfoCtrl,
    updateProjectInfoCtrl,
    retrieveProjectInfoCtrl,
    deleteProjectInfoCtrl
}