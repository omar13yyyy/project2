const express = require('express');
const rsql = require("../../database/commitsql")
const router = express.Router()

async function requests(req, res) {
    try {
    const { start, count } = req.body;
    if (start == 0) {
        res.status(401).send('start can not be 0 ');
        return;
    }

    const offset = (start - 1) * count;
    const status = [parseInt("00001111", 2),parseInt("00000111", 2)];

    const result = await rsql(`SELECT id, title  FROM request WHERE status = ANY($1::int[]) ORDER BY id LIMIT $2 OFFSET $3`, [status,count, offset])
    res.send(result.rows)
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
router.route('/requests').post(requests)
router.route('/requestDetails').post(requestDetails)

module.exports = router;
