const { 
    registerAuthInfoCtrlService, 
    loginAuthInfoCtrlService, 
    dashAuthInfoCtrlService,
    retrieveRegisterInfoCtrlService,
    deleteRegisterInfoCtrlService
} = require("./authInfoCtrlService");

const registerAuthInfoCtrl = async (req,res) => {
    let regisInfoCtrlDetails = {data: req.body};
    if(!validateRegisAuthInfoCtrl(regisInfoCtrlDetails?.data)){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: registerAuthInfoCtrl details are missing" })
    }

    try{
        const result = await registerAuthInfoCtrlService(regisInfoCtrlDetails?.data);
        if(result?.status === 200){
            res.status(200)
            return res.send({ status:200, message: "registerAuthInfoCtrl details are created successfully" })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
}

const retrieveRegisterInfoCtrl = async (req,res) => {
    let registerInfoId = req.params;
    if(!registerInfoId || JSON.stringify(registerInfoId) === "{}" || registerInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: registerInfoId details are missing" }) 
    }

    try{
        const result = await retrieveRegisterInfoCtrlService(registerInfoId);
        if(result?.status === 200){
            res.status(200)
            return res.send({ 
                status:200, 
                message: "Registeration details are retrieved successfully", 
                data: result?.response 
            })
        } else {
            res.status(result?.status)
            return res.send({ status:400, message: result?.message, data: result?.response })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
}

const deleteRegisterInfoCtrl = async (req,res) => {
    let registerInfoId = req.params;
    if(!registerInfoId || JSON.stringify(registerInfoId) === "{}" || registerInfoId?.key === ""){
        res.status(400)
        return res.send({ status: 400, message: "Invalid input params: registerInfoId details are missing" }) 
    }

    try{
        const result = await deleteRegisterInfoCtrlService(registerInfoId);
        if(result && result?.status === 200){
            res.status(200)
            return res.send({ status: 200, message: `Registeration info details followed by ${registerInfoId?.key} are deleted successfully` })
        } else {
            res.status(result?.status)
            return res.send({ status: 400, message: result?.message })
        }
        
    } catch (err) {
        res.status(500);
        return res.send({ status: 500, message: err.message });
    }
}

const loginAuthInfoCtrl = async (req,res) => {
    let loginInfoCtrlDetails = {data: req.body};
    if(!validateLoginAuthInfoCtrl(loginInfoCtrlDetails?.data)){
        res.status(400)
        return res.send({ status:400, message: "Invalid input params: loginAuthInfoCtrl details are missing" })
    }

    try{
        const result = await loginAuthInfoCtrlService(loginInfoCtrlDetails?.data);
        if(result?.status === 200){
            res.status(200).cookie("token", result?.token, result?.options);
            return res.send({ 
                status:200, 
                message: 'loginAuthInfoCtrl are authenticated successfully',
                token: result?.response?.token 
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

const logoutAuthInfoCtrl = async (req,res) => {
    try{
        res.status(200).cookie('token', '', {
            domain: 'https://aboutme-ui-service.onrender.com',
            maxAge: 0,
            overwrite: true,
          });
        return res.send({ status:200, message: "Successfully Logged Out" })
    } catch (err) {
        res.status(500);
        return res.send({ status:500, message: err.message });
    }
}

const dashboardInfoCtrl = async (req, res) => {
    try{
        const result = await dashAuthInfoCtrlService(req?.user);
        if(result?.status === 200){
            res.status(200)
            return res.send({ 
                status:200,
                message: `Welcome back ${result?.response?.firstName}`
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


const validateRegisAuthInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.firstName !== "string") return false;
    if(typeof data?.lastName !== "string")   return false;
    if(typeof data?.email !== "string") return false;
    if(typeof data?.password !== "string")   return false;
    return true;
}

const validateLoginAuthInfoCtrl = (data) => {
    if(!data || Object.keys(data).length === 0 || JSON.stringify(data) === "{}")    return false;
    if(typeof data?.email !== "string") return false;
    if(typeof data?.password !== "string")   return false;
    return true;
}

module.exports = {
    registerAuthInfoCtrl,
    retrieveRegisterInfoCtrl,
    deleteRegisterInfoCtrl,
    loginAuthInfoCtrl,
    logoutAuthInfoCtrl,
    dashboardInfoCtrl
}