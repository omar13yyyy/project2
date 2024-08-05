const express = require('express');
const rsql = require("../../database/commitsql")
const jwt = require('jsonwebtoken');

const router = express.Router()

async function profileInfo(req,res){
  const userId = req.userId

 const result= await rsql(`select "idKey",name,email,"number",address,date from users where id=$1  `,[userId]);
 res.send(result.rows)

}

async function editProfileInfo(req,res){
  const { name, fullNumber,addr,Date } = req.body;
  const userId = req.userId;

  const result = await rsql('update  users SET name=$1, "number"=$2, address=$3, date=$4 WHERE id=$5',[name, fullNumber, addr, Date, userId]);  
    res.send({ success: true });
}

router.route('/profileInfo').get(profileInfo)
router.route('/editProfileInfo').post(editProfileInfo)


module.exports = router;