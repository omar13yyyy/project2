const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");
const { canSendTeam, canOfferToDonate, canRequestBuying, canRequestAllotmentStore, canRequestAllotmentFund, canSetPriorityRequest } = require('../../requestStatus')

const router = express.Router();

const storageEngine = multer.diskStorage({
  destination: "./images/b",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const upload = multer({
  storage: storageEngine,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});


const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (/*mimeType &&*/ extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};


async function showRequests(req, res, next) {
  try {

    //isTeamDate(0),isVisited(1),isShow(2),isAllotment(3),isReceptionist(4),isDelivered(5),isRejected(6),isCanceled(7)'
    const status = [parseInt("00000000", 2), parseInt("00010000", 2)];

    let result = await commitsql(`SELECT id,title from request WHERE status = ANY($1::int[]) `, [status]);
    res.send(result.rows);
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}

async function showRequestDetails(req, res, next) {
  try {

    let result = await commitsql(`SELECT request.title ,request.work,request.status,request.description1 as description,users.name,users."number" as phoneNumber,users.address,users.date from request JOIN users ON users.id = request.userId WHERE request.id = $1 `, [req.body.id]);
    res.send(result.rows[0]);
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}
async function teamfreeDate(req, res, next) {

  try {

    let dateArray = [8, 10, 12, 14, 16]
    let result = await commitsql(`SELECT "dateInteger" FROM "sendTeam" WHERE "teamId" = $1 AND "dayDate" >= $2 AND  "dayDate" < ($2 + INTERVAL  '1 day' )::date  `, [req.body.id, req.body.day]);

    for (let i = 0; i < result.rowCount; i++) {
      let index = dateArray.indexOf(result.rows[i].dateInteger);
      if (index != -1) {
        dateArray.splice(index, 1);
      }
    }

    res.json({
      dates: dateArray,

    })
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}
async function sendTeam(req, res, next) {
  try {
    if (await canSendTeam(req.body.requestId)) {

      let dateArray = [8, 10, 12, 14, 16]
      let result2 = await commitsql(`SELECT "dateInteger" FROM "sendTeam" WHERE "teamId" = $1 AND "dayDate" >= $2 AND  "dayDate" < ($2 + INTERVAL  '1 day' )::date  `, [req.body.id, req.body.day]);
      for (let i = 0; i < result2.rowCount; i++) {
        let index = dateArray.indexOf(result2.rows[i].dateInteger);
        if (index != -1) {
          dateArray.splice(index, 1);
        }
      }
      if(dateArray.includes(req.body.dateInteger)&& await canSendTeam(req.body.requestId)){
      let result = await commitsql(`Select status from request where id = $1`, [req.body.requestId]);
      let status = result.rows[0].status
      if (result.rows[0].status % 2 == 0)
        await commitsql(`UPDATE request  SET status = status +1 WHERE id = $1   `, [req.body.requestId]);
      if ((status % 2) == 1) {
        status -= 1;
        //تم تحديد وقت زيارة
      }
      if (((status / 2) % 2) == 1) {
        status -= 2;
        //تمت الزيارة
      }
      if (((status / 4) % 2) == 1) {
        status -= 4;
        //تم عرض الطلب للتبرع
      }
      if (((status / 8) % 2) == 1) {
        status -= 8;
        //تم التخصيص

      }
      if (((status / 16) % 2) == 1) {
        status -= 16;
        //تم التقديم عن طريق الاستقبال
        await commitsql(`INSERT INTO "sendTeam" ("teamId",requestid,done,"dayDate","dateInteger",appointmentaccepted) VALUES($1,$2,$3,$4,$5,$6)`, ([req.body.teamId, req.body.requestId, false, req.body.date, req.body.dateInteger, true]))

      }
      else
        await commitsql(`INSERT INTO "sendTeam" ("teamId",requestid,done,"dayDate","dateInteger") VALUES($1,$2,$3,$4,$5)`, ([req.body.teamId, req.body.requestId, false, req.body.date, req.body.dateInteger]))

      res.send("Done");
    }
    else
      res.status(400).send('condition error');

  }
  else 
  res.status(400).send('condition error');

} catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}

async function showFund(req, res, next) {
  try {

    //TODO : 
    let result = await commitsql(`SELECT count FROM fund`);
    res.send(result.rows[0]);
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}


async function showFundRequest(req, res, next) {
  try {

    //TODO : 
    let result = await commitsql(`SELECT SUM(count) FROM "requestDonation" where "requestId"=$1`, [req.body.id]);
    res.send(result.rows[0]);
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}



async function showVisitedRequests(req, res, next) {
  try {

    //isTeamDate(0),isVisited(1),isShow(2),isAllotment(3),isReceptionist(4),isDelivered(5),isRejected(6),isCanceled(7)'
    const status = [parseInt("00000011", 2), parseInt("00001011", 2), parseInt("00000111", 2), parseInt("00001111", 2),
    parseInt("00010011", 2), parseInt("00011011", 2), parseInt("00010111", 2), parseInt("00011111", 2)];
    let result = await commitsql(`SELECT id,title from request WHERE status = ANY($1::int[]) `, [status]);
    res.send(result.rows);
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}


async function showVisitedRequestDetails(req, res, next) {
  try {

    let result = await commitsql(`SELECT request.title ,request.work,request.status,request.priority,request.description1 as description,users.name,users."number" as phoneNumber,users.address,users.date from request JOIN users ON users.id = request.userId WHERE request.id = $1 `, [req.body.id]);
    res.send(result.rows[0]);
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}

async function setPriority(req, res, next) {

  try {
    if (await canSetPriorityRequest(req.body.id)) {
      let result = await commitsql(`UPDATE request  SET priority = $2 WHERE id = $1   `, [req.body.id, req.body.priority]);
      res.send("Done");
    }
    else
      res.status(400).send('condition error');

  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}


async function editPriority(req, res, next) {

  try {

    let result = await commitsql(`UPDATE request  SET priority = $2 WHERE id = $1   `, [req.body.id, req.body.priority]);
    res.send("Done");
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}

async function showEnteredForm(req, res, next) {
  try {


    let result = await commitsql(`SELECT form.title ,"enteredForm".answer  FROM "enteredForm" JOIN form ON "enteredForm"."formItemId" = form.id WHERE "enteredForm"."requestId" = $1 `, [req.body.id]);
    res.send(result.rows);
  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}


async function requestAllotmentFund(req, res, next) {
  try {
    if (await canRequestAllotmentFund(req.body.id)) {
      //TODO : handle count less than fund
      await commitsql(` SELECT requestAllotmentFund($1,$2,$3) `, [req.body.id, req.body.amount, new Date().toISOString()]);
      res.send("Done");
    } else
      res.status(400).send('condition error');

  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}

async function requestAllotmentStore(req, res, next) {
  try {
    if (await canRequestAllotmentStore(req.body.idRequest)) {
      //TODO : handle count less than fund
      await commitsql(` SELECT requestAllotmentStore($1,$2,$3,$4) `, [req.body.idRequest, req.body.idItem, req.body.count, new Date().toISOString()]);
      res.send("Done");
    }
    else
      res.status(400).send('condition error');

  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}

async function requestBuying(req, res, next) {
  try {
    if (await canRequestBuying(req.body.idRequest)) {
      //TODO : handle files.length != count.length
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          let result = await commitsql(`INSERT INTO "requestBuying" (requestId,imageUrl,cost,"createDate") VALUES ($1,$2,$3,$4)`, [req.body.idRequest, req.files[i].path, req.body.count[i], new Date().toISOString()]);

        }

        res.send("Done");
      }
      else
        res.status(400).send("please send image...");
    } else
      res.status(400).send('condition error');

  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}

async function offerToDonate(req, res, next) {
  try {

    if (await canOfferToDonate(req.body.idRequest)) {

      let result = await commitsql(`UPDATE request  SET status = status + 4 , description2 = $2 WHERE id = $1   `, [req.body.idRequest, req.body.reason]);
      res.send("Done");
    }
    else
      res.status(400).send('condition error');

  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }

}

async function showVisitDocument(req, res, next) {
  try {

    //TODO : if  show

    let result = await commitsql(`SELECT "imageUrl" as title , id From "documentImage"  WHERE "requestId"=$1   `, [req.body.id]);
    res.send(result.rows);

  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}
async function rejectRequest(req, res, next) {
  try {

    //TODO : if  show

    await commitsql(`SELECT rejectRequest($1)`, [req.body.id]);
    res.send("Done");

  } catch {
    console.log("catch")
    res.status(400).send('catch');

  }
}


router.route('/showRequests').get(showRequests);
router.route('/showRequestDetails').post(showRequestDetails);
router.route('/teamfreeDate').post(teamfreeDate);

router.route('/sendTeam').post(sendTeam);

router.route('/rejectRequest').post(rejectRequest);


router.route('/showFund').get(showFund);
router.route('/showFundRequest').post(showFundRequest);


router.route('/showVisitedRequests').get(showVisitedRequests);
router.route('/showVisitedRequestDetails').post(showVisitedRequestDetails);
router.route('/showVisitDocument').post(showVisitDocument);

router.route('/setPriority').post(setPriority);
router.route('/editPriority').post(editPriority);

router.route('/showEnteredForm').post(showEnteredForm);



router.route('/requestAllotmentFund').post(requestAllotmentFund);
router.route('/requestAllotmentStore').post(requestAllotmentStore);


router.route('/requestBuying').post(upload.array("images"), requestBuying);
router.route('/offerToDonate').post(offerToDonate);

module.exports = router;








