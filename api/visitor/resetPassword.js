const express = require('express')
const rsql=require("../../database/commitsql")
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const moment = require('moment')


const router= express.Router()

async function resetPassword (req,res)
{    try {

    const { email } = req.body;
    const codeString  = Math.floor(1000 + Math.random() * 9000);
  const code= codeString.toString();

await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]); 
await rsql(`INSERT INTO confirmation (email,code,"createDate") VALUES ($1, $2,now())`,[req.body.email,code]);


    const result= await rsql(`SELECT code FROM confirmation WHERE email = $1`,[email])
    console.log('code for'+email+'is:'+code)
    res.send('done');
  } catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}

router.route('/resetPassword').post(resetPassword)


module.exports=router