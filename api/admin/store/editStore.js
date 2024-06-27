const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();



async function addCategory(req,res,next){

    let result = await commitsql(`INSERT INTO "storeCategory" (title,"createDate") VALUES ($1,$2)`,[req.body.title,new Date().toISOString()]);
    res.send("done");
}

async function addSubCategory(req,res,next){

    let result = await commitsql(`INSERT INTO "storeSubCategory" ("categoryId",title,"createDate") VALUES ($1,$2,$3)`,[req.body.id,req.body.title,new Date().toISOString()]);
    res.send("done");
}

async function addItem(req,res,next){

    let result = await commitsql(`SELECT addItem($1,$2,$3,$4)`,[req.body.id,req.body.title,req.body.count,new Date().toISOString()]);
    res.send("done");
}
async function addExistingItem(req,res,next){

    let result = await commitsql(`SELECT addExistingItem($1,$2,$3) `,[req.body.count,req.body.id,new Date().toISOString()]);
    res.send("done");
}

async function DecreaseExistingItem(req,res,next){

    let result = await commitsql(`SELECT DecreaseExistingItem($1,$2,$3) `,[req.body.count,req.body.id,new Date().toISOString()]);
    res.send("done");
}


router.route('/addCategory').post(addCategory);
router.route('/addSubCategory').post(addSubCategory);
router.route('/addItem').post(addItem);
router.route('/addExistingItem').post(addExistingItem);
router.route('/DecreaseExistingItem').post(DecreaseExistingItem);
module.exports =router;