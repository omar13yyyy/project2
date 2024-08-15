
const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");
const router = express.Router();

async function fundLog(req,res,next){
  try{

    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT COUNT(id) as count FROM "fundLog"   `);

    let result = await commitsql(`SELECT * FROM "fundLog"   LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    }catch{
      console.log("catch")
      res.status(400).send('catch');
  }  
}

async function campaignsDonationLog(req,res,next){
  try{

    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT COUNT("campaignDonation".id) as count  FROM "campaignDonation" JOIN request ON "campaignDonation"."campaignId" =request.id LIMIT $1 OFFSET $2  `,[req.body.count,offset]);

    let result = await commitsql(`SELECT "campaignDonation".userIdKey,"campaignDonation".count,"campaignDonation"."createDate",campaigns.title as requestTitle FROM "campaignDonation" JOIN campaigns ON "campaignDonation"."campaignId" =campaigns.id LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    }catch{
      console.log("catch")
      res.status(400).send('catch');
  }  
    }

async function requestDonationLog(req,res,next){
  try{

    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT  COUNT("requestDonation".id) as count FROM "requestDonation" JOIN campaigns ON "requestDonation"."requestId"=campaigns.id LIMIT $1 OFFSET $2  `,[req.body.count,offset]);

    let result = await commitsql(`SELECT "requestDonation".userIdKey,"requestDonation".count,"requestDonation"."createDate",campaigns.title as requestTitle FROM "requestDonation" JOIN campaigns ON "requestDonation"."requestId"=campaigns.id LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    }catch{
      console.log("catch")
      res.status(400).send('catch');
  }  
    }

async function decreaseFund(req,res,next){
  try{

    //TODO : create function and handle fund less than count
    let result = await commitsql(`INSERT INTO "fundLog" (count,state,userIdKey,"createDate") VALUES ($1,$2,$3,$4)`,[req.body.count,2,req.body.reason ,new Date().toISOString()]);
    res.send("DONE")
  }catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}


router.route('/fundLog').post(fundLog);
router.route('/campaignDonationLog').post(campaignsDonationLog);
router.route('/requestDonationLog').post(requestDonationLog);
router.route('/decreaseFund').post(decreaseFund);

module.exports =router;