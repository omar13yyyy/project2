const express = require('express')
const rsql=require("../../database/commitsql")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const router= express.Router()

async function login(req,res)  
{    try {
  const {email,password } = req.body;
console.log(email)
const comf = await rsql('SELECT comf FROM users  where email=$1 ', [email]);

if( comf.rows[0].comf==true){
   const result = await rsql('SELECT id, password FROM users where email=$1 ', [email]);
 if (result.rowCount === 0) {
  res.status(401).send('Invalid idkey or password');
  return;
} 
  
const isPasswordValid = await bcrypt.compare(password, result.rows[0].password);

if (!isPasswordValid) {
  res.status(401).send('Invalid password');
  return;
  }



  const token = jwt.sign({ id:result.rows[0].id }, process.env.TOKEN_SECRET)

  res.send(token)

}
else{
     res.status(401).send('Please confirm your account or create a new one.');
}
} catch (error) {
  console.error('Error in aboutUs API:', error);
  res.status(500).send({ error: 'An error occurred while processing the request.' });
}
}



router.route('/login').post(login)
module.exports=router
