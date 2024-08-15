const express = require('express');
const rsql = require("../../../database/commitsql")
const router = express.Router()
const fs = require('fs');
const multer = require("multer");
const {canDonationRequest,canCancelRequest} = require('../../requestStatus')

async function requests(req, res) {
    try {
    const { start, count } = req.body;
    if (start == 0) {
        res.status(401).send('start can not be 0 ');
        return;
    }
    const status = [parseInt("00010111", 2),parseInt("00000111", 2)];
    const offset = (start - 1) * count;
    const pages = await rsql(`SELECT COUNT(id) as count  FROM request WHERE status = ANY($1::int[])`,[status])

    

    const result = await rsql(`SELECT id, title  FROM request WHERE status = ANY($1::int[]) ORDER BY id LIMIT $2 OFFSET $3`, [status,count, offset]) 
       res.json({
        pages : Math.ceil(pages.rows[0].count/req.body.count),
        result : result.rows
      })
    } catch (error) {
        console.error('Error in aboutUs API:', error);
        res.status(500).send({ error: 'An error occurred while processing the request.' });
      }   
}
//--------------------------
async function requestDetails(req, res) {
    try {
    const { id } = req.body;
    console.log(id)

    const result = await rsql(`SELECT description2,priority FROM request where id =$1`, [id])
    res.send(result.rows)
} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}
//-------------------------
async function addRequest(req, res) {
    try {
    const { title, work, reason } = req.body;

    //console.log(userId)

    const result = await rsql(`insert into request (title,description1,work,userId) VALUES ($1,$2,$3,$4) `, [title, work, reason, req.body.idUser]);
    res.send({ success: true });
} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}
//-------------------------------
async function previousRequest(req, res) {
    try {
    //console.log(userId)

    const result = await rsql(`SELECT id,title,description1,status FROM request where userId =$1`, [req.body.idUser])

    res.send(result.rows)
} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}
//-------------------------------

async function donationForRequest(req, res) {
    try {
    const { id, amount } = req.body;
    if(await canDonationRequest(req.body.id)){
    const userResult = await rsql(`SELECT "idKey" FROM users WHERE id = $1`, [req.body.idUser]);
  const userIdKey = userResult.rows[0].idKey;
  console.log(userIdKey);
  var wallet = await rsql(`select * from wallets where "idKey"=$1`,[userIdKey])

  if(wallet.rows.length === 0||wallet.rows[0].amountwallet<amount){
    res.status(400).send({ error: `The donation amount must be greater than amount of wallet` });
return;
  }
  console.log(wallet.rows[0].amountwallet)
 var total= wallet.rows[0].amountwallet-amount
 console.log(total)
 const wallet1 = await rsql('update  wallets SET amountwallet=$1 WHERE "idKey"=$2',[total,userIdKey]);
 
  
    const donationResult = await rsql(`INSERT INTO "requestDonation" ("requestId", count, userIdKey, "createDate") VALUES ($1, $2, $3, NOW())`, [id, amount, userIdKey]);
    res.send({ success: true });
  }
  else
  res.status(400).send('condition error');

} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  } 
}

async function previousDonationRequest(req, res) {
    try {
 
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
} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}

async function cancellingRequest(req, res) {
  try {
    if(await canCancelRequest(req.body.idRequest)){
    let bool =  await rsql(` SELECT requestDelete($1,$2) `,[req.body.idRequest,req.body.idUser]);
    
    res.send({ success: bool.rows[0].requestdelete });

  }else
  res.status(400).send('condition error');

     } catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
 
}
async function donationRequest(req, res) {
    try {
    const { id, idUser } = req.body;

    const donation = await rsql('SELECT * FROM "requestBuying" WHERE requestId = $1 AND imageurl IS NOT NULL', [id]);
    res.send(donation.rows )
} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}
async function charge(req, res) {
    try {
    const {idkey, amount } = req.body;

    const userResult = await rsql(`SELECT * FROM users WHERE "idKey" = $1`, [idkey]);
    if (userResult.rows.length === 0 ) {
        res.status(400).send({ error: `idkey is wrong` });
        return;
    }   
     const result = await rsql(`INSERT INTO wallets ("idKey", amountwallet,createtDate) VALUES ($1, $2,now()) ON CONFLICT ("idKey") DO UPDATE SET amountwallet = wallets.amountwallet + $2;`, [ req.body.idkey,amount]);
    res.send({ success: true });
} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
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
router.route('/charge').post(charge)



module.exports = router;
