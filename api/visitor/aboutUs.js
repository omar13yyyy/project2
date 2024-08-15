const express = require('express');
const rsql = require("../../database/commitsql")
const router = express.Router()

async function aboutUs(req,res){

    try {
 const result= await rsql(`SELECT "imageUrl", text1 ,text2,text3,text4,text5,"contactUs" FROM "aboutUs"` )
    res.send(result.rows)
} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}



router.route('/aboutUs').get(aboutUs)

module.exports = router;