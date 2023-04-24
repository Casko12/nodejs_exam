const permission = "student";
const express = require("express");
const multer = require("multer");
// chon thu muc luu anh
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'pubic/uploads/student');
    },
    filename: function (req,res, cb){
        cb(null, Date.now()+"-"+file.originalname);
    }
});
const upload = multer({storage:storage});
const Student = require("../models/student");
let router = express.Router();
let studentController = require("../controllers/student.controller")

router.use((req,res,next)=>{
    const auth = req.session.auth;
    const permissions = auth && auth.permissions?auth.permissions:[];
    if(permissions.includes(permission)){
        next()
    }
    res.status(404).send("404 not found");
})
router.get("/",studentController.get);
router.get("/create-student",studentController.createForm);
router.post("/create-student",upload.single("avatar"),studentController.save); // up 1 anh thi la single
router.get("/edit-student/:id",studentController.editForm);
router.post("/edit-student/:id",upload.array("images"),studentController.update); //up nhieu anh thi la up array
router.post("/delete-student/:id",studentController.delete);

module.exports = router;
