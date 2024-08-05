const express = require('express')
const rsql=require("../../../database/commitsql")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const router= express.Router()

async function login(req,res)  
{
  try{
  const {email,password } = req.body;
   const result = await rsql('SELECT  * FROM admin where email=$1 ', [email]);
 if (result.rowCount === 0) {
  res.status(401).send('Invalid email or password');
  return;
} 
  
const isPasswordValid = await bcrypt.compare(password, result.rows[0].password);

if (!isPasswordValid) {
  res.status(401).send('Invalid password');
  return;
  }



  const token = jwt.sign( result.rows[0] , process.env.TOKEN_SECRET_ADMIN)

  res.send({token :token})
}catch{
  console.log("catch")
  res.status(400).send('catch');

}
}


//function generateToken(id) {
 // const token = jwt.sign({ id }, process.env.TOKEN_SECRET)
 // return token  
//}

router.route('/login').post(login)
module.exports=router
