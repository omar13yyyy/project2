const express = require('express');
const rsql = require("../../database/commitsql")
const router = express.Router()

async function ads(req, res) {
    try {
    const { start, count } = req.body;
    if (start == 0) {
        res.status(401).send('start can not be 0 ');
        return;
    }

    const offset = (start - 1) * count;

    const result = await rsql(`SELECT id, title, description,"imageUrl" FROM ads ORDER BY id LIMIT $1 OFFSET $2`, [count, offset])
    res.send(result.rows)
} catch (error) {
    console.error('Error in aboutUs API:', error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
}

router.route('/ads').post(ads)


module.exports=router