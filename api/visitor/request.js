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
router.route('/requests').post(requests)
router.route('/requestDetails').post(requestDetails)

module.exports = router;
