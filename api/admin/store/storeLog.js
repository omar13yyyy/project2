const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();

async function storeLog(req,res,next){
    const offset = (req.body.start - 1) * req.body.count; 
    let pages = await commitsql(`SELECT COUNT("storeItem".id) as count FROM "storeLog" JOIN "storeItem"
        ON "storeItem".id= "storeLog"."itemId"`);

    let result = await commitsql(`SELECT "storeItem".title,"storeLog".count,"storeLog".state,"storeLog"."createDate" FROM "storeLog" JOIN "storeItem"
        ON "storeItem".id= "storeLog"."itemId" LIMIT $1 OFFSET $2  `,[req.body.count,offset]);
        res.json({
            pages : Math.ceil(pages.rows[0].count/req.body.count),
            result : result.rows
          })
        }

router.route('/storeLog').post(storeLog);

module.exports =router;