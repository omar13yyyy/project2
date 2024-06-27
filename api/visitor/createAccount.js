const express = require('express')
const rsql=require("../../database/commitsql")
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const moment = require('moment')
const {signupValidator}=require('../../validators/validator')


const router= express.Router()

async function createAccount (req,res)
{
  //TODO : send code via Email

  const {id,name,Email,fullNumber,Date,addr } = req.body;

  const codeString  = Math.floor(1000 + Math.random() * 9000);
  const code= codeString.toString();
  //const code = crypto.randomBytes(2).toString('hex');
await rsql(`DELETE FROM confirmation WHERE email = $1`,[Email]); 
 await rsql(`INSERT INTO confirmation (email,code,"createDate") VALUES ($1, $2,now())`,[req.body.Email,code]);
    console.log('code for'+Email+'is:'+code)



    const { password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
const user = await rsql(`SELECT * FROM "users" WHERE email=$1`, [Email])
if (user.rows.length) {
  res.status(400).send("Email already exists")
  return  
}
const result= await rsql(`INSERT INTO "users" ("idKey",name, email,password,"number",Date,address,"createDate") VALUES ($1, $2, $3,$4, $5, $6,$7,now())`, [id,name,Email,hashedPassword,fullNumber,Date,addr])

res.send({ success: true  });
  
}
router.route('/createAccount').post(signupValidator,createAccount)


module.exports=router