const express = require('express');
const rsql = require("../../database/commitsql")
const router = express.Router()


async function previousCampaigns(req, res) {
  const { start, count } = req.body;
  if (start == 0) {
    res.status(401).send('start can not be 0 ');
    return;
  }

  const offset = (start - 1) * count;

  const result = await rsql(`SELECT id, title ,imageUrl FROM "previousCampaigns" ORDER BY id LIMIT $1 OFFSET $2`, [count, offset])
  res.send(result.rows)

}
//----------------------------
async function previousCampaignsDetails(req, res) {
  const { id } = req.body;


  const result = await rsql(`SELECT description FROM "previousCampaigns" where id =$1`, [id])
  res.send(result.rows)

}
//----------------------------
async function campaigns(req, res) {
  const { start, count } = req.body;
  if (start == 0) {
    res.status(401).send('start can not be 0 ');
    return;
  }

  const offset = (start - 1) * count;

  const result = await rsql(`SELECT id, title ,"imageUrl" FROM campaigns ORDER BY id LIMIT $1 OFFSET $2`, [count, offset])
  res.send(result.rows)

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
  const userId = 1;
  //TODO get user id form token 

  const { id, amount } = req.body;
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
    const userResult = await rsql(`SELECT "idKey" FROM users WHERE id = $1`, [userId]);
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
  const userId = 1;
  //TODO get user id form token 

  const { id } = req.body;
  console.log(id);
  const result0 = await rsql(`SELECT "idKey" FROM users where id =$1`, [userId]);
  if (result0.rowCount > 0) {
    var userIdKey = result0.rows[0].idKey;
    console.log(userIdKey);
    const result1 = await rsql(`SELECT "campaignId" FROM "campaignDonation" where userIdKey =$1`,[userIdKey]);
    if (result1.rowCount > 0) {
      var campaignDonation = [];
      for (let i = 0; i < result1.rowCount; i++) {
        const CampaignId = result1.rows[i].campaignId;
        console.log(CampaignId);
        const result2 = await rsql(`SELECT title FROM campaigns where id =$1`, [CampaignId]);
        
        if (result2.rowCount > 0) {
          const result3 = await rsql(`SELECT * FROM "campaignBuying" where campaignId =$1`, [CampaignId]);
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
  const userId = 1;
  //TODO get user id form token 

  const { id, amount } = req.body;
  
    const userResult = await rsql(`SELECT "idKey" FROM users WHERE id = $1`, [userId]);
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
  res.send(donation.rows);

}


  router.route('/previousCampaigns').post(previousCampaigns)
  router.route('/previousCampaignsDetails').post(previousCampaignsDetails)
  router.route('/campaigns').post(campaigns)
  router.route('/campaignsDetails').post(campaignsDetails)
  router.route('/donationForCamoaugns').post(donationForCamoaugns)
  router.route('/previousDonationCampaigns').get(previousDonationCampaigns)
  router.route('/donationForFund').post(donationForFund)
  router.route('/donationCampaigns').post(donationCampaigns)



  module.exports = router;
