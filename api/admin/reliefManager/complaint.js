const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();

async function showComplaint(req,res,next){

const offset = (req.body.start - 1) * req.body.count; 
let pages = await commitsql(`SELECT COUNT(complaint.id) as count from complaint JOIN users ON users.id=complaint."userId"  `,);

let result = await commitsql(`SELECT complaint.id,complaint.complaint,users.name,users.number from complaint JOIN users ON users.id=complaint."userId" ORDER BY id DESC LIMIT $1 OFFSET $2 `,[req.body.count,offset]);
res.json({
    pages : Math.ceil(pages.rows[0].count/req.body.count),
    result : result.rows
  })}
router.route('/showComplaint').post(showComplaint);


module.exports =router;