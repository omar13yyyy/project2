const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");


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
const router = express.Router();


async function showCampaigns(req,res,next){
    try{


    let result = await commitsql(`SELECT * from campaigns WHERE isFinish = false AND isAllotment =false`);
    for(let i =0 ; i<result.rowCount;i++){
        let SUM = await commitsql(`SELECT SUM(count) FROM "campaignDonation" where "campaignId" =$1`,[result.rows[i].id]);
        console.log(SUM.rows[0].sum)
        if(SUM.rows[0].sum !=  null ){
            result.rows[i].sum = SUM.rows[0].sum

        }
        else
        result.rows[i].sum = "0"



    }

    res.send(result.rows);

}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}
/*
async function campaignsAllotmentStore(req,res,next){
    TODO://

    let result = await commitsql(`UPDATE campaigns SET (isAllotment =true) where id = $1`,[req.body.idCampaign]);
    res.send(result.rows);


}
*/

async function showFundCampaigns(req,res,next){
    try{

 
    let result = await commitsql(`SELECT SUM(count) FROM "campaignDonation" where "campaignId" =$1`,[req.body.id]);
    res.send(result.rows[0]);
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}

async function campaignBuying(req,res,next){
    
    if (req.files) {

       // await commitsql(`UPDATE campaigns SET isAllotment = true where id = $1`,[req.body.idCampaign]);

        for(let i =0 ; i<req.files.length;i++){
            let result = await commitsql(`INSERT INTO "campaignBuying" (campaignId,imageUrl,cost,"createDate") VALUES ($1,$2,$3,$4)`,[req.body.idCampaign,req.files[i].path,req.body.amount[i],new Date().toISOString()]);

}

    res.send("Done");
}else{
    res.status(400).send("images count must == amount count");
}
    
try{}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}
router.route('/showCampaigns').get(showCampaigns);
//router.route('/campaignsAllotmentStore').post(campaignsAllotmentStore);
router.route('/showFundCampaigns').post(showFundCampaigns);

router.route('/campaignBuying').post(upload.array("images"),campaignBuying);

module.exports =router;