const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();

async function previousCampaigns(req,res,next){

    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT COUNT(id) as count FROM "previousCampaigns" WHERE "isDisable" = false `);

    let result = await commitsql(`SELECT id,title,ImageUrl FROM "previousCampaigns" WHERE "isDisable" = false LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
    })
}

async function previousCampaignsDetails(req,res,next){



    let result = await commitsql(`SELECT description as descr FROM "previousCampaigns" WHERE id =$1  `,[req.body.id]);
    res.send(result.rows);
}


async function aboutUs(req,res,next){



    let result = await commitsql(`SELECT * FROM "aboutUs"   `);
    res.send(result.rows);
}

async function ads(req,res,next){

    const offset = (req.body.start - 1) * req.body.count; 

    let pages = await commitsql(`SELECT COUNT(id) as count FROM ads  WHERE "isDisable" = false `);

    let result = await commitsql(`SELECT * FROM ads  WHERE "isDisable" = false LIMIT $1 OFFSET $2 `,[req.body.count,offset]);
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
    })

}


router.route('/previousCampaigns').post(previousCampaigns);
router.route('/previousCampaignsDetails').post(previousCampaignsDetails);
router.route('/aboutUs').get(aboutUs);
router.route('/ads').post(ads);


module.exports =router;