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


router.route('/previousCampaigns').post(previousCampaigns)
router.route('/previousCampaignsDetails').post(previousCampaignsDetails)
router.route('/campaigns').post(campaigns)
router.route('/campaignsDetails').post(campaignsDetails)


module.exports = router;
