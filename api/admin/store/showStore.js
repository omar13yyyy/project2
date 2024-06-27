const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();

async function showCategories(req,res,next){
    let result = await commitsql(`SELECT *FROM "storeCategory"`);
    res.send(result.rows);
}

async function showSubCategories(req,res,next){

    let result = await commitsql(`SELECT *FROM "storeSubCategory" WHERE "categoryId" IN ($1)`,[req.body.id]);
    res.send(result.rows);
}

async function storeItem(req,res,next){

    let result = await commitsql(`SELECT *FROM "storeItem" WHERE "subCategoryId" IN ($1)`,[req.body.id]);
    res.send(result.rows);
}


router.route('/showCategories').get(showCategories);
router.route('/showSubCategories').post(showSubCategories);
router.route('/storeItem').post(storeItem);


module.exports =router;