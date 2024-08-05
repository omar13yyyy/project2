const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");

const router = express.Router();

const storageEngine = multer.diskStorage({
  destination: "./images/b",
   filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
    },
    });
const upload = multer({
        storage: storageEngine,
        fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
        });


        const checkFileType = function (file, cb) {
        //Allowed file extensions
        const fileTypes = /jpeg|jpg|png|gif|svg/;
        
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        
        const mimeType = fileTypes.test(file.mimetype);
        
       if (/*mimeType &&*/ extName) {
        return cb(null, true);
        } else {
        cb("Error: You can Only Upload Images!!");
        }
        };
  

async function enterForm(req,res,next){
    try{

    //TODO: get teamId from token.

    let result = await commitsql(`INSERT INTO "enteredForm" ("requestId","formItemId",answer,"createDate") VALUES ($1,$2,$3,$4)`,[req.body.idRequest,req.body.idFormItem,req.body.answer,new Date().toISOString()]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}

async function uploadImages(req,res,next){
    try{

    //TODO: get teamId from token.
    if (req.files) {
        for(let i =0 ; i<req.files.length;i++){
            let result = await commitsql(`INSERT INTO "documentImage" ("imageUrl","requestId","createDate") VALUES ($1,$2,$3)`,[req.files[i].path,req.body.idRequest,new Date().toISOString()]);

}

    res.send("Done");
    }
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}

router.route('/enterForm').post(enterForm);
router.route('/uploadImages').post(upload.array("images"),uploadImages);
module.exports =router;