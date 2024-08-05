const express = require('express')
const rsql=require("../../database/commitsql")
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const moment = require('moment')
const jwt = require('jsonwebtoken')


const router= express.Router()

async function resetconfirmation (req,res)
{
    const { email, code ,newPassword} = req.body

    const result= await rsql(  `SELECT * FROM confirmation WHERE  email= $1`,[email]);
    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid email or code press to resend the code again' });
      return;
    }
    const { createDate } = result.rows[0];
    const expiryTime = new Date(createDate);
    expiryTime.setMinutes(expiryTime.getMinutes() + 1);
    console.log(expiryTime);
  

  const confirmationCode = result.rows[0].code
 

   const now = Date.now();

    if (now > expiryTime) {
     
      await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]); 
 return res.send('The confirmation code is expired or invalid');
 
   }
   
else{
  if (code == confirmationCode)
  
  {
    await rsql(`UPDATE users SET comf = true WHERE email = $1`, [email]);

  await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]

  );

  const hashednewPassword =bcrypt.hashSync(newPassword, 10);
  await rsql('UPDATE users SET password = $1 WHERE email = $2', [hashednewPassword, email])
       
  const token = jwt.sign({ id: result.rows[0].id }, process.env.TOKEN_SECRET)
  res.send(token)
    
  }else res.send('rong code')
}
}




router.route('/resetconfirmation').post(resetconfirmation)


module.exports=router