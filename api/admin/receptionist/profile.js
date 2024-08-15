const express = require('express');
const rsql = require("../../../database/commitsql")
const jwt = require('jsonwebtoken');

const router = express.Router()

async function getUserId(req,res){
  try {
  const result= await rsql(`select id from users where "idKey"=$1  `,[req.body.key]);
  res.send(result.rows)
} catch (error) {
  console.error('Error in aboutUs API:', error);
  res.status(500).send({ error: 'An error occurred while processing the request.' });
}
 }
 //--------------------------------
async function profileInfo(req,res){
  try {
 const result= await rsql(`select "idKey",name,email,"number",address,date from users where id=$1  `,[req.body.idUser]);
 res.send(result.rows)
} catch (error) {
  console.error('Error in aboutUs API:', error);
  res.status(500).send({ error: 'An error occurred while processing the request.' });
}
}

async function editProfileInfo(req,res){
  try {
  const { name, fullNumber,addr,Date ,idUser} = req.body;

  const result = await rsql('update  users SET name=$1, "number"=$2, address=$3, date=$4 WHERE id=$5',[name, fullNumber, addr, Date, idUser]);  
    res.send({ success: true });
  } catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}

router.route('/profileInfo').post(profileInfo)
router.route('/editProfileInfo').post(editProfileInfo)
router.route('/getUserId').post(getUserId)

module.exports = router;