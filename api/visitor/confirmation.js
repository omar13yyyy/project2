const express = require('express')
const rsql=require("../../database/commitsql")
const jwt = require('jsonwebtoken')


const router= express.Router()


async function confirmation (req,res)
{ const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 5);
  const { email, code } = req.body

  
 const result= await rsql(  `SELECT code FROM confirmation WHERE  email= $1`,[email]);
    
 if (result.rowCount === 0) {
    return res.status(404).send('Confirmation code not found');
  }
const confirmationCode = result.rows[0].code
    console.log('code for'+email+'is:'+confirmationCode)


  if (code !== confirmationCode) {

    return res.status(401).send('Incorrect verification code');
  }

   const now = Date.now();

    if (now > expiryTime) {
     
      await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]); 
 return res.status(401).send('nop');
 
   }
   
else {
  if (code == confirmationCode)
  
  {
    const token = jwt.sign({ id: result.rows[0].id}, process.env.TOKEN_SECRET)
    res.send(token)  
    await rsql(`DELETE FROM confirmation WHERE email = $1`,[email]

  );}


}


}



//function generateToken(id) {
 // const token = jwt.sign({ id }, process.env.TOKEN_SECRET)
 // return token  
//}


router.route('/confirmation').post(confirmation)


module.exports=router