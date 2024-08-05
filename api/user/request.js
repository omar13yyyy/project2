const express = require('express');
const rsql = require("../../database/commitsql")
const router = express.Router()

async function requests(req, res) {
    const { start, count } = req.body;
    if (start == 0) {
        res.status(401).send('start can not be 0 ');
        return;
    }

    const offset = (start - 1) * count;

    const result = await rsql(`SELECT id, title  FROM request ORDER BY id LIMIT $1 OFFSET $2`, [count, offset])
    res.send(result.rows)

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

    const userId = req.userId;
    //console.log(userId)

    const result = await rsql(`insert into request (title,description1,work,userId) VALUES ($1,$2,$3,$4) `, [title, work, reason, userId]);
    res.send({ success: true });

}
//-------------------------------
async function previousRequest(req, res) {

    const userId = req.userId;
    //console.log(userId)

    const result = await rsql(`SELECT id,description1,status FROM request where userId =$1`, [userId])

    res.send(result.rows)

}
//-------------------------------
async function donationForRequest(req, res) {
    const userId = req.userId;

    const { id, amount } = req.body;
    const userResult = await rsql(`SELECT "idKey" FROM users WHERE id = $1`, [userId]);
    const userIdKey = userResult.rows[0].idKey;
    console.log(userIdKey);
    var wallet = await rsql(`select * from wallets where "idKey"=$1`, [userIdKey])

    if (wallet.rows.length === 0 || wallet.rows[0].amountwallet < amount) {
        res.status(400).send({ error: `The donation amount must be greater than amount of wallet` });
        return;
    }
    console.log(wallet.rows[0].amountwallet)
    var total = wallet.rows[0].amountwallet - amount
    console.log(total)
    const wallet1 = await rsql('update  wallets SET amountwallet=$1 WHERE "idKey"=$2', [total, userIdKey]);

    console.log(userIdKey);
    const donationResult = await rsql(`INSERT INTO "requestDonation" ("requestId", count, userIdKey, "createDate") VALUES ($1, $2, $3, NOW())`, [id, amount, userIdKey]);
    res.send({ success: true });

}

async function previousDonationRequest(req, res) {
    const userId = req.userId;

    const { id } = req.body;
    console.log(id);
    const result0 = await rsql(`SELECT "idKey" FROM users where id =$1`, [userId]);
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
                        status: result2.rows[0].status,
                    });
                }
            }
            res.json(requestDonation);
        }
    }
}

async function cancellingRequest(req, res) {
    const userId = req.userId;

    let bool = await rsql(` SELECT requestDelete($1) `, [req.body.idRequest]);
    if (bool)
        res.send({ success: true });

    else
        res.send("can not delete request");


}
async function donationRequest(req, res) {
    const { id } = req.body;
    const userId = req.userId;

    const donation = await rsql('SELECT * FROM "requestBuying" WHERE requestid = $1 AND imageurl IS NOT NULL', [id]);
    res.send(donation.rows)

}

async function showwallet(req, res) {
    const userId = req.userId;
    const userResult = await rsql(`SELECT "idKey" FROM users WHERE id = $1`, [userId]);
    const userIdKey = userResult.rows[0].idKey;
    const wallet = await rsql('SELECT amountwallet FROM wallets WHERE "idKey"=$1', [userIdKey]);
    res.send(wallet.rows)

}
router.route('/requests').post(requests)
router.route('/requestDetails').post(requestDetails)
router.route('/addRequest').post(addRequest)
router.route('/previousRequest').get(previousRequest)
router.route('/donationForRequest').post(donationForRequest)
router.route('/previousDonationRequest').get(previousDonationRequest)
router.route('/cancellingRequest').post(cancellingRequest)
router.route('/donationRequest').post(donationRequest)
router.route('/showwallet').get(showwallet)



module.exports = router;
