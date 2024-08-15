const express = require('express')
const rsql = require("../../../database/commitsql")
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const moment = require('moment')


const router= express.Router()

async function createAccount (req,res)
{    try {
  const {id,name,Email,fullNumber,Date,addr } = req.body;




    const { password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
const user = await rsql(`SELECT * FROM "users" WHERE email=$1`, [Email])
if (user.rows.length) {
  res.status(400).send("Email already exists")
  return  
}
const result= await rsql(`INSERT INTO "users" ("idKey",name, email,password,"number",Date,address,"createDate") VALUES ($1, $2, $3,$4, $5, $6,$7,now())`, [id,name,Email,hashedPassword,fullNumber,Date,addr])
const result1 = await rsql(`SELECT id from "users" where "idKey"=$1`, [id])

res.send(result1.rows)
} catch (error) {
  console.error('Error in aboutUs API:', error);
  res.status(500).send({ error: 'An error occurred while processing the request.' });
}
}
router.route('/createAccount').post(createAccount)


module.exports=router