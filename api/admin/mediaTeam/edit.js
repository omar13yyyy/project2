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
    
  

async function addPreviousCampaigns(req,res,next){
    try{

    if (req.file) {

            let result = await commitsql(`INSERT INTO "previousCampaigns" (title,description,imageUrl,"createDate") VALUES ($1,$2,$3,$4)`,[req.body.title,req.body.descr,req.file.path,new Date().toISOString()]);



    res.send("Done");
    }
    else{
        res.status(400).send("please send image ..");

    }

}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}


async function addAds(req,res,next){
    try{

    if (req.file) {
            let result = await  commitsql(`INSERT INTO ads (title,description,"imageUrl","createDate") VALUES ($1,$2,$3,$4)`,[req.body.title,req.body.descr,req.file.path,new Date().toISOString()]);



    res.send("Done");
    }
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}
async function deleteAds(req,res,next){
    try{

    let result = await  commitsql(`UPDATE ads SET "isDisable" = $2  WHERE id = $1`,[req.body.id,true]);



    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }

}
async function editAboutUs(req,res,next){
    try{

    let result = await commitsql(`UPDATE "aboutUs" SET text1 = $1 ,text2=$2,text3=$3,text4=$4,text5 =$5,"contactUs" = $6`,
    [req.body.text1,req.body.text2,req.body.text3,req.body.text4,req.body.text5,req.body.contactUs]);



    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }

}
async function editAboutUsImage(req,res,next){
    try{

    if (req.file) {
    let oldImage = await commitsql(`SELECT "imageUrl" FROM "aboutUs"`);
        
    let result = await commitsql(`UPDATE "aboutUs" SET "imageUrl" =$1`, [req.file.path]);
    try{
        fs.unlinkSync(oldImage.rows[0].imageUrl);

    }
    catch {
        console.log("old image not found to delete it")
    }
    }

    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }

}
async function DeletePreviousCampaigns(req,res,next){
    try{
    let result = await  commitsql(`UPDATE ads SET "isDisable" = $2  WHERE id = $1`,[req.body.id,true]);



    res.send("Done");
    
}catch{
  console.log("catch")
  res.status(400).send('catch');

}
}

router.route('/addPreviousCampaigns').post(upload.single("image"),addPreviousCampaigns);
router.route('/addAds').post(upload.single("image"),addAds);
router.route('/deleteAds').post(deleteAds);
router.route('/editaboutUs').post(editAboutUs);
router.route('/editAboutUsImage').post(upload.single("image"),editAboutUsImage);
router.route('/DeletePreviousCampaigns').post(DeletePreviousCampaigns);


module.exports =router;