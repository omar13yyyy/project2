const express = require('express')
const rsql=require("../../database/commitsql")
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const moment = require('moment')
const jwt = require('jsonwebtoken')


const router= express.Router()

async function resetconfirmation (req,res)
{
  
    //TODO : send code via Email

    
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 5);

  const {email, code, newPassword } = req.body;
console.log(email)
const  result= await rsql('SELECT * FROM confirmation WHERE email = $1 ', [email])
if (result.rows.length === 0) {
    res.status(401).json({ error: 'Invalid email or code press to resend the code again' });
    return;
  }
  const confirmationCode = result.rows[0].code
 

   const now = Date.now();

    if (now > expiryTime) {
     
      await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]); 
 return res.send('nop');
 
   }
   
else{
  if (code == confirmationCode)
  
  {
  
  await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]

  );

  const hashednewPassword =bcrypt.hashSync(newPassword, 10);
  await rsql('UPDATE users SET password = $1 WHERE email = $2', [hashednewPassword, email])
       
  const token = jwt.sign({ id: result.rows[0].id }, process.env.TOKEN_SECRET)
  res.send(token)
    
  }else res.send('rong code')
}
}


//function generateToken(id) {
 // const token = jwt.sign({ id }, process.env.TOKEN_SECRET)
 // return token  
//}

router.route('/resetconfirmation').post(resetconfirmation)


module.exports=router