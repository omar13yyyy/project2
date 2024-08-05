const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");
const router = express.Router();

const storageEngine = multer.diskStorage({
    destination: "./images/a",
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
    

async function addCampaigns(req,res,next){

    try{

    if (req.file) {
    let result = await commitsql(`INSERT INTO campaigns (budget,"targetGroup",reason,description,minimumDonation,"imageUrl","createDate") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [req.body.budget,req.body.TargetGroup,req.body.reason,req.body.descr,req.body.minimumDonation,req.file.path,new Date().toISOString()]);
    res.send("Done");
    

}
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}
async function deleteCampaigns(req,res,next){
    try{

    let result = await  commitsql(`UPDATE campaigns SET isDisable = $2  WHERE id = $1`,[req.body.id,true]);
    res.send("Done");

}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}



router.route('/addCampaigns').post(upload.single("image"),addCampaigns);
router.route('/deleteCampaigns').post(deleteCampaigns);




module.exports =router;