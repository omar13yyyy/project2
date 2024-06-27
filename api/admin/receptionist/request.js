const express = require('express');
const rsql = require("../../../database/commitsql")
const router = express.Router()
const fs = require('fs');
const multer = require("multer");

async function requests(req, res) {
    const { start, count } = req.body;
    if (start == 0) {
        res.status(401).send('start can not be 0 ');
        return;
    }

    const offset = (start - 1) * count;
    const pages = await rsql(`SELECT COUNT(id) as count  FROM request `)

    const result = await rsql(`SELECT id, title  FROM request ORDER BY id LIMIT $1 OFFSET $2`, [count, offset])
    res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    
}
//--------------------------
async function requestDetails(req, res) {
    const { id } = req.body;
    console.log(id)

    const result = await rsql(`SELECT description2,priority FROM request where id =$1`, [id])
    res.send(result.rows)

}
//-------------------------
async function addRequest(req, res) {
    const { title, work, reason } = req.body;

    //console.log(userId)

    const result = await rsql(`insert into request (title,description1,work,userId) VALUES ($1,$2,$3,$4) `, [title, work, reason, req.body.idUser]);
    res.send({ success: true });

}
//-------------------------------
async function previousRequest(req, res) {

    //console.log(userId)

    const result = await rsql(`SELECT id,description1,status FROM request where userId =$1`, [req.body.idUser])

    res.send(result.rows)

}
//-------------------------------
async function donationForRequest(req, res) {

    const { id, amount } = req.body;
    // const campaignResult = await rsql(`SELECT * FROM campaigns WHERE id = $1`, [id]);

    // if (campaignResult.rows.length === 0) {
    //   res.status(404).send({ error: `Campaign with ID ${id} not found.` });
    //   return;
    // }

    // const { minimumdonation: minimumDonation } = campaignResult.rows[0];

    // console.log(campaignResult.rows);
    // console.log(minimumDonation);

    // if (amount >= minimumDonation) {
    console.log(id);
    const userResult = await rsql(`SELECT "idKey" FROM users WHERE id = $1`, [req.body.idUser]);
    const userIdKey = userResult.rows[0].idKey;
    console.log(userIdKey);
    const donationResult = await rsql(`INSERT INTO "requestDonation" ("requestId", count, userIdKey, "createDate") VALUES ($1, $2, $3, NOW())`, [id, amount, userIdKey]);
    res.send({ success: true });
    // } else {
    //   res.status(400).send({ error: `The donation amount must be greater than or equal to the minimum donation of $${minimumDonation}.` });
    // }
}

async function previousDonationRequest(req, res) {

 
    const result0 = await rsql(`SELECT "idKey" FROM users where id =$1`, [req.body.idUser]);
    if (result0.rowCount > 0) {
        var userIdKey = result0.rows[0].idKey;
        console.log(userIdKey);
        const result1 = await rsql(`SELECT "requestId" FROM "requestDonation" where userIdKey =$1`, [userIdKey]);
        if (result1.rowCount > 0) {
            var requestDonation = [];
            for (let i = 0; i < result1.rowCount; i++) {
                const requestId = result1.rows[i].requestId;
                console.log(requestId);
                const result2 = await rsql(`SELECT title,status FROM request where id =$1`, [requestId]);

                if (result2.rowCount > 0) {
                    requestDonation.push({
                        id: requestId,
                        title: result2.rows[0].title,
                        status:result2.rows[0].status,
                    });
                }
            }
            res.json(requestDonation);
        }
    }
}

async function cancellingRequest(req, res) {
    let bool =  await rsql(` SELECT requestDelete($1) `,[req.body.idRequest]);
    if (bool)
    res.send({ success: true });

    else
    res.send("can not delete request");

 
 
}
async function donationRequest(req, res) {
    const { id, idUser } = req.body;

    const donation = await rsql('SELECT * FROM "requestBuying" WHERE requestid = $1 AND imageurl IS NOT NULL', [id]);

    if ( donation.rows.length > 0) {
      const imageUrl = donation.rows[0].imageurl;
      const imageStream = fs.createReadStream(imageUrl);
      res.setHeader('Content-Type', 'image/jpeg');
      imageStream.pipe(res);
    } else {
      res.status(404).send(' not found');
    }
  
}
router.route('/requests').post(requests)
router.route('/requestDetails').post(requestDetails)
router.route('/addRequest').post(addRequest)
router.route('/previousRequest').post(previousRequest)
router.route('/donationForRequest').post(donationForRequest)
router.route('/previousDonationRequest').post(previousDonationRequest)
router.route('/cancellingRequest').post(cancellingRequest)
router.route('/donationRequest').post(donationRequest)



module.exports = router;
