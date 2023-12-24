const express = require('express')
const router = express()
const cookieParser = require("cookie-parser")

const {
    registerAuthInfoCtrl,
    loginAuthInfoCtrl,
    dashboardInfoCtrl,
    logoutAuthInfoCtrl,
    retrieveRegisterInfoCtrl,
    deleteRegisterInfoCtrl
} = require("./authInfoCtrlRoutes");

const authentication = require('../middleware/authentication');

router.use(cookieParser());
router.post("/v1/auth/registerAuthInfoCtrl", registerAuthInfoCtrl);
router.get("/v1/auth/retrieveRegisterAuthInfoCtrl/:key", retrieveRegisterInfoCtrl);
router.delete("/v1/auth/deleteRegisterAuthInfoCtrl/:key", deleteRegisterInfoCtrl);

router.post("/v1/auth/loginAuthInfoCtrl", loginAuthInfoCtrl);
router.post("/v1/auth/logoutAuthInfoCtrl", authentication, logoutAuthInfoCtrl);
router.get("/v1/auth/dashboard", authentication, dashboardInfoCtrl);

module.exports = router;