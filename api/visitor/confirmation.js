const express = require('express')
const rsql=require("../../database/commitsql")
const jwt = require('jsonwebtoken')


const router= express.Router()


async function confirmation (req,res)
{ 
  
  const { email, code } = req.body
  const result0= await rsql(  `SELECT "createDate",code FROM confirmation WHERE  email= $1`,[email]);
  if (result0.rowCount === 0) {     
    return res.status(404).send('Confirmation code not found');
  }
  const { createDate } = result0.rows[0];
  const expiryTime = new Date(createDate);
  expiryTime.setMinutes(expiryTime.getMinutes() + 5);
  console.log(expiryTime);

 const result1 = await rsql('SELECT id FROM users where email=$1 ', [email]);


const confirmationCode = result0.rows[0].code
    console.log('code for'+email+'is:'+confirmationCode)


  if (code !== confirmationCode) {

    return res.status(401).send('Incorrect verification code');
  }

   const now = Date.now();
console.log(expiryTime)
    if (now > expiryTime) {
     
      await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]); 
 return res.status(401).send('The confirmation code is expired or invalid');
 
   }
   
else {
  if (code == confirmationCode)
  
  {
    const token = jwt.sign({ id: result1.rows[0].id}, process.env.TOKEN_SECRET)
    res.send(token)  
    await rsql(`UPDATE users SET comf = true WHERE email = $1`, [email]);

    await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]);
  }


}


}



router.route('/confirmation').post(confirmation)


module.exports=router