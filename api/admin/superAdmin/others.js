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
              checkFileType(file, cb);}
          });
  
  
          const checkFileType = function (file, cb) {
          //Allowed file extensions
          const fileTypes = /jpeg|jpg|png|gif|svg/;
          
          const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
          
          const mimeType = fileTypes.test(file.mimetype);
          
          if (mimeType && extName) {
          return cb(null, true);
          } else {
          cb("Error: You can Only Upload Images!!");
          }
          };
    

async function addCampaigns(req,res,next){


    if (req.file) {
    let result = await commitsql(`INSERT INTO campaigns (budget,"targetGroup",reason,description,minimumDonation,"imageUrl","createDate") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [req.body.budget,req.body.TargetGroup,req.body.reason,req.body.descr,req.body.minimumDonation,req.file.path,new Date().toISOString()]);
    res.send("Done");

}
}
async function deleteCampaigns(req,res,next){
    let result = await  commitsql(`UPDATE campaigns SET isDisable = $2  WHERE id = $1`,[req.body.id,true]);
    res.send("Done");


}


async function fundLog(req,res,next){
    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT COUNT(id) as count FROM "fundLog"   `);

    let result = await commitsql(`SELECT * FROM "fundLog"   LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })}

async function campaignsDonationLog(req,res,next){
    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT COUNT("campaignDonation".id) as count  FROM "campaignDonation" JOIN request ON "campaignDonation"."campaignId" =request.id LIMIT $1 OFFSET $2  `,[req.body.count,offset]);

    let result = await commitsql(`SELECT "campaignDonation".userIdKey,"campaignDonation".count,"campaignDonation"."createDate",request.title as requestTitle FROM "campaignDonation" JOIN request ON "campaignDonation"."campaignId" =request.id LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    }

async function requestDonationLog(req,res,next){
    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT  COUNT("requestDonation".id) as count FROM "requestDonation" JOIN campaigns ON "requestDonation"."requestId"=campaigns.id LIMIT $1 OFFSET $2  `,[req.body.count,offset]);

    let result = await commitsql(`SELECT "requestDonation".userIdKey,"requestDonation".count,"requestDonation"."createDate",campaigns.title as requestTitle FROM "requestDonation" JOIN campaigns ON "requestDonation"."requestId"=campaigns.id LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    }

async function decreaseFund(req,res,next){
    //TODO : create function and handle fund less than count
    let result = await commitsql(`INSERT INTO "fundLog" (count,state,userIdKey,"createDate") VALUES ($1,$2,$3,$4)`,[req.body.count,2,req.body.reason ,new Date().toISOString()]);
    res.send("DONE")
}


router.route('/addCampaigns').post(upload.single("image"),addCampaigns);
router.route('/deleteCampaigns').post(deleteCampaigns);
router.route('/fundLog').post(fundLog);
router.route('/campaignDonationLog').post(campaignsDonationLog);
router.route('/requestDonationLog').post(requestDonationLog);
router.route('/decreaseFund').post(decreaseFund);


module.exports =router;