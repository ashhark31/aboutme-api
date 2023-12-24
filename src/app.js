const express = require('express')
const router = express()
const bodyParser = require("body-parser")
const handleAPIDocs = require("./middleware/apiDocs")
const cors = require("cors")

const { 
    createBaseInfoCtrl, 
    updateBaseInfoCtrl, 
    retrieveBaseInfoCtrl,
    deleteBaseInfoCtrl
}  = require("./routes/baseInfoCtrlRoutes")

const { 
    createExpInfoCtrl, 
    updateExpInfoCtrl, 
    retrieveExpInfoCtrl,
    deleteExpInfoCtrl
} = require('./routes/expInfoCtrlRoutes')

const {
    createProjectInfoCtrl,
    updateProjectInfoCtrl,
    retrieveProjectInfoCtrl,
    deleteProjectInfoCtrl
} = require("./routes/projectInfoCtrlRoutes")

const {
    createSkillInfoCtrl,
    updateSkillInfoCtrl,
    retrieveSkillInfoCtrl,
    deleteSkillInfoCtrl
} = require("./routes/skillInfoCtrlRoutes")

const {
    createAchvmntInfoCtrl,
    updateAchvmntInfoCtrl,
    retrieveAchvmntInfoCtrl,
    deleteAchvmntInfoCtrl
} = require("./routes/achvmntInfoCtrlRoutes")

const {
    createCrtInfoCtrl,
    updateCrtInfoCtrl,
    retrieveCrtInfoCtrl,
    deleteCrtInfoCtrl
} = require("./routes/crtificationInfoCtrlRoutes")

const {
    createKeyInfoCtrl,
    updateKeyInfoCtrl,
    retrieveKeyInfoCtrl,
    deleteKeyInfoCtrl
} = require("./routes/keyInfoCtrlRoutes")

const landing_zone = require("./landing-zone/landing_zone")
const authentication = require("./auth/auth");

// const corsConfig = {credentials: true, origin: 'http://localhost:3000'};
const corsConfig = {credentials: true, origin: 'https://aboutme-ui-service.netlify.app'};
// const corsConfig = {credentials: true, origin: 'https://aboutme-ui-service.onrender.com'};
router.use(cors(corsConfig))
// router.options('*', cors())
router.use(bodyParser.json({ limit: "999mb" }))
router.use(
    bodyParser.urlencoded({
        limit: "999mb",
        extended: true,
        parameterLimit: 100000,
    })
)

// Base_Info_Ctrl_Routes
router.post("/v1/createBaseInfoCtrl", createBaseInfoCtrl);
router.put("/v1/updateBaseInfoCtrl/:key", updateBaseInfoCtrl);
router.get("/v1/retrieveBaseInfoCtrl/:key", retrieveBaseInfoCtrl);
router.delete("/v1/deleteBaseInfoCtrl/:key", deleteBaseInfoCtrl);

// Exp_Info_Ctrl_Routes
router.post("/v1/createExpInfoCtrl", createExpInfoCtrl);
router.put("/v1/updateExpInfoCtrl/:key", updateExpInfoCtrl);
router.get("/v1/retrieveExpInfoCtrl/:key", retrieveExpInfoCtrl);
router.delete("/v1/deleteExpInfoCtrl/:key", deleteExpInfoCtrl);

// Project_Info_Ctrl_Routes
router.post("/v1/createProjectInfoCtrl", createProjectInfoCtrl);
router.put("/v1/updateProjectInfoCtrl/:key", updateProjectInfoCtrl);
router.get("/v1/retrieveProjectInfoCtrl/:key", retrieveProjectInfoCtrl);
router.delete("/v1/deleteProjectInfoCtrl/:key", deleteProjectInfoCtrl);

// Skill_Info_Ctrl_Routes
router.post("/v1/createSkillInfoCtrl", createSkillInfoCtrl);
router.put("/v1/updateSkillInfoCtrl/:key", updateSkillInfoCtrl);
router.get("/v1/retrieveSkillInfoCtrl/:key", retrieveSkillInfoCtrl);
router.delete("/v1/deleteSkillInfoCtrl/:key", deleteSkillInfoCtrl);

// Achievement_Info_Ctrl_Routes
router.post("/v1/createAchvmntInfoCtrl", createAchvmntInfoCtrl);
router.put("/v1/updateAchvmntInfoCtrl/:key", updateAchvmntInfoCtrl);
router.get("/v1/retrieveAchvmntInfoCtrl/:key", retrieveAchvmntInfoCtrl);
router.delete("/v1/deleteAchvmntInfoCtrl/:key", deleteAchvmntInfoCtrl);

// Certification_Info_Ctrl_Routes
router.post("/v1/createCrtificationInfoCtrl", createCrtInfoCtrl);
router.put("/v1/updateCrtificationInfoCtrl/:key", updateCrtInfoCtrl);
router.get("/v1/retrieveCrtificationInfoCtrl/:key", retrieveCrtInfoCtrl);
router.delete("/v1/deleteCrtificationInfoCtrl/:key", deleteCrtInfoCtrl);

// Key_Info_Ctrl_Routes
router.post("/v1/createKeyInfoCtrl", createKeyInfoCtrl);
router.put("/v1/updateKeyInfoCtrl/:key", updateKeyInfoCtrl);
router.get("/v1/retrieveKeyInfoCtrl/:key", retrieveKeyInfoCtrl);
router.delete("/v1/deleteKeyInfoCtrl/:key", deleteKeyInfoCtrl);

router.use("/", landing_zone);
router.use("/", authentication);
router.use("/api-swagger", handleAPIDocs)
module.exports = router;