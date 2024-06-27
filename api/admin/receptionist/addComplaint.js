const express = require('express');
const rsql = require("../../../database/commitsql")
const jwt = require('jsonwebtoken');

const router = express.Router()

async function addComplaint(req,res){
  //const userId = req.userId
//console.log(userId)

 const result= await rsql(`insert into complaint (complaint,"userId","createDate") VALUES ($1,$2,now()) `,[req.body.descr,req.body.idUser]);
 res.send({ success: true });

}
router.route('/addComplaint').post(addComplaint)

module.exports = router;