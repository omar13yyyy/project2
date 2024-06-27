const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");

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
              checkFileType(file, cb);}
          });
  
  
          const checkFileType = function (file, cb) {
          //Allowed file extensions
          const fileTypes = /jpeg|jpg|png|gif|svg/;
          
          const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
          
          const mimeType = fileTypes.test(file.mimetype);
          
          if (mimeType && extName) {
          return cb(null, true);
          } else {
          cb("Error: You can Only Upload Images!!");
          }
          };
    
  
async function showRequests(req,res,next){
    
    //isTeamDate(0),isVisited(1),isShow(2),isAllotment(3),isReceptionist(4),isDelivered(5),isRejected(6),isCanceled(7)'
    const status = [parseInt("00000000", 2),parseInt("00010000", 2)];

    let result = await commitsql(`SELECT id,title from request WHERE status = ANY($1::int[]) `,[status]);
    res.send(result.rows);

}

async function showRequestDetails(req,res,next){

    let result = await commitsql(`SELECT request.title ,request.work,request.status,request.description1 as description,users.name,users."number" as phoneNumber,users.address,users.date from request JOIN users ON users.id = request.userId WHERE request.id = $1 `,[req.body.id]);
    res.send(result.rows);

}
async function sendTeam(req,res,next){
    //TODO : 
   // let result = await commitsql(`SELECT request.title ,request.work,request.status,request.description1 as description,users.name,users."number" as phoneNumber,users.address,users.date from request JOIN users ON users.id = request.userId WHERE request.id = $1 `,[req.body.id]);
    res.send(result.rows);

}

async function showFund(req,res,next){
    //TODO : 
    let result = await commitsql(`SELECT count FROM fund`);
    res.send(result.rows);

}


async function showFundRequest(req,res,next){
    //TODO : 
    let result = await commitsql(`SELECT SUM(count) FROM "requestDonation" where "requestId"=$1`,[req.body.id]);
    res.send(result.rows);

}



async function showVisitedRequests(req,res,next){
    
    //isTeamDate(0),isVisited(1),isShow(2),isAllotment(3),isReceptionist(4),isDelivered(5),isRejected(6),isCanceled(7)'
    const status = [parseInt("11000000", 2),parseInt("11010000", 2)];

    let result = await commitsql(`SELECT id,title from request WHERE status = ANY($1::int[]) `,[status]);
    res.send(result.rows);

}


async function showVisitedRequestDetails(req,res,next){

    let result = await commitsql(`SELECT request.title ,request.work,request.status,request.description1 as description,users.name,users."number" as phoneNumber,users.address,users.date from request JOIN users ON users.id = request.userId WHERE request.id = $1 `,[req.body.id]);
    res.send(result.rows);

}

async function setPriority(req,res,next){


    let result = await commitsql(`UPDATE request  SET priority = $2 WHERE id = $1   `,[req.body.id,req.body.priority]);
    res.send("Done");

}


async function requestAllotmentFund(req,res,next){
    
    //TODO : handle count less than fund
     await commitsql(` SELECT requestAllotmentFund($1,$2,$3) `,[req.body.id,req.body.amount,new Date().toISOString()]);
    res.send("Done");

}

async function requestAllotmentStore(req,res,next){
    
    //TODO : handle count less than fund
     await commitsql(` SELECT requestAllotmentStore($1,$2,$3,$4) `,[req.body.idRequest,req.body.idItem,req.body.count,new Date().toISOString()]);
    res.send("Done");

}

async function requestBuying(req,res,next){
    //TODO : handle files.length != count.length
    if (req.files) {
        for(let i =0 ; i<req.files.length;i++){
            let result = await commitsql(`INSERT INTO "requestBuying" (requestId,imageUrl,cost,"createDate") VALUES ($1,$2,$3,$4)`,[req.body.idRequest,req.files[i].path,req.body.count[i],new Date().toISOString()]);

}

    res.send("Done");
    }

}

async function offerToDonate(req,res,next){
    //TODO : if  show

    let result = await commitsql(`UPDATE request  SET status = status + 4 , description2 = $2 WHERE id = $1   `,[req.body.idRequest,req.body.reason]);
    res.send("Done");


}



router.route('/showRequests').get(showRequests);
router.route('/showRequestDetails').post(showRequestDetails);
router.route('/sendTeam').post(sendTeam);



router.route('/showFund').get(showFund);
router.route('/showFundRequest').post(showFundRequest);


router.route('/showVisitedRequests').get(showVisitedRequests);
router.route('/showVisitedRequestDetails').post(showVisitedRequestDetails);

router.route('/setPriority').post(setPriority);
router.route('/requestAllotmentFund').post(requestAllotmentFund);
router.route('/requestAllotmentStore').post(requestAllotmentStore);


router.route('/requestBuying').post(upload.array("images"),requestBuying);
router.route('/offerToDonate').post(offerToDonate);

module.exports =router;








