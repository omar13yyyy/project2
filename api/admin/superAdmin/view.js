const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");
const router = express.Router();


async function showCampaigns(req,res,next){

    try{


    let result = await commitsql(`SELECT id,title FROM campaigns WHERE isFinish = false`);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}

async function campaignsDetails(req,res,next){


    try{

    let result = await commitsql(`SELECT budget,"targetGroup",reason,description FROM campaigns WHERE id = $1`,[req.body.id]);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}
async function profileInfo(req,res,next){

    try{


    let result = await commitsql(`SELECT id,name,email,"number" as fullNumber,Date,address FROM users where "idKey" = $1 `,[req.body.id]);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}

async function showComplaint(req,res,next){
    try{


    const offset = (req.body.start - 1) * req.body.count; 
    let pages = await commitsql(`SELECT COUNT(id) as count FROM complaint  `);

    let result = await commitsql(`SELECT * FROM complaint ORDER BY id DESC   LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    }catch{
        console.log("catch")
        res.status(400).send('catch');
    }  
    }
router.route('/showCampaigns').get(showCampaigns);
router.route('/campaignsDetails').post(campaignsDetails);
router.route('/profileInfo').post(profileInfo);
router.route('/showComplaint').post(showComplaint);


module.exports =router;