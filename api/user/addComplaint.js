const express = require('express');
const rsql = require("../../database/commitsql")
const jwt = require('jsonwebtoken');

const router = express.Router()

async function addComplaint(req,res){
  const userId =1
//console.log(userId)
//TODO : get user id from token
 const result= await rsql(`insert into complaint (complaint,"userId","createDate") VALUES ($1,$2,now()) `,[req.body.descr,userId]);
 res.send({ success: true });

}
router.route('/addComplaint').post(addComplaint)

module.exports = router;