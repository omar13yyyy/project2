const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");
const router = express.Router();


async function showCampaigns(req,res,next){



    let result = await commitsql(`SELECT id,title FROM campaigns WHERE isFinish = false`);
    res.send(result.rows);
}

async function campaignsDetails(req,res,next){



    let result = await commitsql(`SELECT budget,"targetGroup",reason,description FROM campaigns WHERE id = $1`,[req.body.id]);
    res.send(result.rows);
}
async function profileInfo(req,res,next){



    let result = await commitsql(`SELECT id,name,email,"number" as fullNumber,Date,address FROM users where "idKey" = $1 `,[req.body.id]);
    res.send(result.rows);
}

async function showComplaint(req,res,next){


    const offset = (req.body.start - 1) * req.body.count; 
    let pages = await commitsql(`SELECT COUNT(id) as count FROM complaint  `);

    let result = await commitsql(`SELECT * FROM complaint ORDER BY id DESC   LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    }
router.route('/showCampaigns').get(showCampaigns);
router.route('/campaignsDetails').post(campaignsDetails);
router.route('/profileInfo').post(profileInfo);
router.route('/showComplaint').post(showComplaint);


module.exports =router;