const permission = "user";
const express = require("express");


const User = require("../models/user");
let router = express.Router();
let userController = require("../controllers/user.controller")

// router.use((req,res,next)=>{
//     const auth = req.session.auth;
//     const permissions = auth && auth.permissions?auth.permissions:[];
//     if(permissions.includes(permission)){
//         next()
//     }
//     res.status(404).send("404 not found");
// })
router.get("/",userController.get);
router.get("/create-user",userController.createForm);
router.post("/create-user",userController.save);
router.get("/edit-user/:id",userController.editForm);
router.post("/edit-user/:id",userController.update);
router.post("/delete-user/:id",userController.delete);

module.exports = router;
