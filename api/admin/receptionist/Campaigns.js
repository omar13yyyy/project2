const express = require('express');
const rsql = require("../../../database/commitsql")
const router = express.Router()
const path = require("path");
const fs = require('fs');
const multer = require("multer");

async function campaigns(req, res) {
  const { start, count } = req.body;
  if (start == 0) {
    res.status(401).send('start can not be 0 ');
    return;
  }

  const offset = (start - 1) * count;

  const pages = await rsql(`SELECT  COUNT(id) as count FROM campaigns `)

  const result = await rsql(`SELECT id, title ,"imageUrl" FROM campaigns ORDER BY id LIMIT $1 OFFSET $2`, [count, offset])
  res.json({
    pages : Math.ceil(pages.rows[0].count/req.body.count),
    result : result.rows
  })


}
//--------------------------
async function campaignsDetails(req, res) {
  const { id } = req.body;
  console.log(id)

  const result = await rsql(`SELECT budget,"targetGroup",reason,description FROM campaigns where id =$1`, [id])
  res.send(result.rows)

}
//--------------------------
async function donationForCamoaugns(req, res) {

  const { id, amount,idUser } = req.body;
  const campaignResult = await rsql(`SELECT * FROM campaigns WHERE id = $1`, [id]);

  if (campaignResult.rows.length === 0) {
    res.status(404).send({ error: `Campaign with ID ${id} not found.` });
    return;
  }

  const { minimumdonation: minimumDonation } = campaignResult.rows[0];

  console.log(campaignResult.rows);
  console.log(minimumDonation);

  if (amount >= minimumDonation) {
    console.log(id);
    const userResult = await rsql(`SELECT "idKey" FROM users WHERE id = $1`, [idUser]);
    const userIdKey = userResult.rows[0].idKey;
    console.log(userIdKey);
    const donationResult = await rsql(`
        INSERT INTO "campaignDonation" ("campaignId", count, userIdKey, "createDate") 
        VALUES ($1, $2, $3, NOW())
      `, [id, amount, userIdKey]);
    res.send({ success: true });
  } else {
    res.status(400).send({ error: `The donation amount must be greater than or equal to the minimum donation of $${minimumDonation}.` });
  }
}
//----------------------------------------

async function previousDonationCampaigns(req, res) {

  const { idUser } = req.body;
  const result0 = await rsql(`SELECT "idKey" FROM users where id =$1`, [idUser]);
  if (result0.rowCount > 0) {
    var userIdKey = result0.rows[0].idKey;
    console.log(userIdKey);
    const result1 = await rsql(`SELECT "campaignId" FROM "campaignDonation" where userIdKey =$1`,[userIdKey]);
    if (result1.rowCount > 0) {
      var campaignDonation = [];
      for (let i = 0; i < result1.rowCount; i++) {
        const CampaignId = result1.rows[i].campaignId;
        console.log(CampaignId);
        const result2 = await rsql(`SELECT title FROM campaigns where id =$1`, [CampaignId,]);
        
        if (result2.rowCount > 0) {
          const result3 = await rsql(`SELECT * FROM "campaignBuying" where campaignId =$1`, [CampaignId,]);
          if (result3.rowCount > 0) {
          campaignDonation.push({
            id: CampaignId,
            title: result2.rows[0].title,
            status:1,
          });
        }else{ campaignDonation.push({
          id: CampaignId,
          title: result2.rows[0].title,
          status:2,

        });
      }}
      }
      res.json(campaignDonation);
    }
  }
}
//------------------------------------------
async function donationForFund(req, res) {
  const userId = req.userId;

  const { idUser, amount } = req.body;
  
    const userResult = await rsql(`SELECT "idKey" FROM users WHERE id = $1`, [idUser]);
    const userIdKey = userResult.rows[0].idKey;
    console.log(userIdKey);
    const donationResult = await rsql(`INSERT INTO "fundDonation" ( count, userIdKey, "createDate") VALUES ($1, $2, NOW())`, [ amount, userIdKey]);
    const thepreviousfund=await rsql(`SELECT count FROM fund ORDER BY count DESC LIMIT 1`);
    var count=thepreviousfund.rows[0].count
    let countfin = count + parseInt(amount);  
      const fund = await rsql('update  fund SET count=$1 WHERE count=$2',[countfin,count]);  

    const fundlogresult = await rsql(`INSERT INTO "fundLog" ( count, state, userIdKey,"createDate") VALUES ($1, $2,$3, NOW())`, [ amount, 1 ,userIdKey]);

    res.send({ success: true });
  
}
async function donationCampaigns(req, res) {
    const { id, idUser } = req.body;

    const donation = await rsql('SELECT * FROM "campaignBuying"WHERE campaignId = $1 AND imageurl IS NOT NULL', [id]);

    if ( donation.rows.length > 0) {
      const imageUrl = donation.rows[0].imageurl;
      const imageStream = fs.createReadStream(imageUrl);
      res.setHeader('Content-Type', 'image/jpeg');
      imageStream.pipe(res);
    } else {
      res.status(404).send('Donation or campaign not found');
    }
  
}

  router.route('/campaigns').post(campaigns)
  router.route('/campaignsDetails').post(campaignsDetails)
  router.route('/donationForCamoaugns').post(donationForCamoaugns)
  router.route('/previousDonationCampaigns').post(previousDonationCampaigns)
  router.route('/donationForFund').post(donationForFund)
  router.route('/donationCampaigns').post(donationCampaigns)




  module.exports = router;
