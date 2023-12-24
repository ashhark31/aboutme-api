const express = require('express')
const router = express()

const {
    createIntroInfoCtrl,
    updateIntroInfoCtrl,
    retrieveIntroInfoCtrl,
    deleteIntroInfoCtrl
} = require("./routes/introInfoCtrlRoutes")

const {
    createTestiInfoCtrl,
    updateTestiInfoCtrl,
    retrieveTestiInfoCtrl,
    deleteTestiInfoCtrl
} = require("./routes/testiInfoCtrlRoutes")

const {
    createBlogInfoCtrl,
    updateBlogInfoCtrl,
    retrieveBlogInfoCtrl,
    deleteBlogInfoCtrl
} = require("./routes/blogInfoCtrlRoutes")

// Intro_Info_Ctrl_Routes
router.post("/v1/createIntroInfoCtrl", createIntroInfoCtrl);
router.put("/v1/updateIntroInfoCtrl/:key", updateIntroInfoCtrl);
router.get("/v1/retrieveIntroInfoCtrl/:key", retrieveIntroInfoCtrl);
router.delete("/v1/deleteIntroInfoCtrl/:key", deleteIntroInfoCtrl);

// Testimonials_Info_Ctrl_Routes
router.post("/v1/createTestiInfoCtrl", createTestiInfoCtrl);
router.put("/v1/updateTestiInfoCtrl/:key", updateTestiInfoCtrl);
router.get("/v1/retrieveTestiInfoCtrl/:key", retrieveTestiInfoCtrl);
router.delete("/v1/deleteTestiInfoCtrl/:key", deleteTestiInfoCtrl);

// Blog_Info_Ctrl_Routes
router.post("/v1/createBlogInfoCtrl", createBlogInfoCtrl);
router.put("/v1/updateBlogInfoCtrl/:key", updateBlogInfoCtrl);
router.get("/v1/retrieveBlogInfoCtrl/:key", retrieveBlogInfoCtrl);
router.delete("/v1/deleteBlogInfoCtrl/:key", deleteBlogInfoCtrl);

module.exports = router