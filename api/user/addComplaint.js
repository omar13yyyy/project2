const express = require('express');
const rsql = require("../../database/commitsql")
const jwt = require('jsonwebtoken');

const router = express.Router()

async function addComplaint(req,res){
  try {
  const userId = req.userId;
//console.log(userId)
 const result= await rsql(`insert into complaint (complaint,"userId","createDate") VALUES ($1,$2,now()) `,[req.body.desc,userId]);
 res.send({ success: true });
} catch (error) {
  console.error('Error in aboutUs API:', error);
  res.status(500).send({ error: 'An error occurred while processing the request.' });
}
}
router.route('/addComplaint').post(addComplaint)

module.exports = router;