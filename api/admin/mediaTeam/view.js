const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();

async function previousCampaigns(req,res,next){
    try{

    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT COUNT(id) as count FROM "previousCampaigns" WHERE "isDisable" = false `);

    let result = await commitsql(`SELECT id,title,ImageUrl FROM "previousCampaigns" WHERE "isDisable" = false LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
    })
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}

async function previousCampaignsDetails(req,res,next){


    try{

    let result = await commitsql(`SELECT description as descr FROM "previousCampaigns" WHERE id =$1  `,[req.body.id]);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}


async function aboutUs(req,res,next){

    try{


    let result = await commitsql(`SELECT * FROM "aboutUs"   `);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}

async function ads(req,res,next){
    try{

    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT COUNT(id) as count FROM ads  WHERE "isDisable" = false `);

    let result = await commitsql(`SELECT * FROM ads  WHERE "isDisable" = false LIMIT $1 OFFSET $2 `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
    })
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
  }
}


router.route('/previousCampaigns').post(previousCampaigns);
router.route('/previousCampaignsDetails').post(previousCampaignsDetails);
router.route('/aboutUs').get(aboutUs);
router.route('/ads').post(ads);


module.exports =router;