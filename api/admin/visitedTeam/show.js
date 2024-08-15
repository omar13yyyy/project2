const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();




async function show(req,res,next){
    //try{
   
    //TODO: get teamId from token.
    let result3 =await commitsql(`SELECT id  from team where adminId = $1`,[req.userId])
    let result2 ;
    if(result3.rowCount >=1){

     
   result2 = await commitsql(`SELECT  request.id,request.title,"sendTeam".requestid,"sendTeam"."dayDate","sendTeam"."dateInteger" FROM "sendTeam" JOIN request ON "sendTeam".requestId = request.id where appointmentaccepted = true AND "teamId"=$1 AND done =false `,[result3.rows[0].id]);
    }
    else{
        result2 = await commitsql(`SELECT  request.id,request.title,"sendTeam".requestid,"sendTeam"."dayDate","sendTeam"."dateInteger" FROM "sendTeam" JOIN request ON "sendTeam".requestId = request.id where appointmentaccepted = true AND done =false `,);

    }  
  res.send(result2.rows);
/*}catch{
    console.log("catch")
    res.status(400).send('catch');
}  */
}

async function showDetails(req,res,next){

    try{
    let result = await commitsql(`SELECT request.title,request.description1  ,users."idKey" ,users.name,users.number,users.address FROM request JOIN users ON request.userId = users.id where request.id = $1 `,[req.body.id]);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}


async function showForm(req,res,next){
    try{
     let result2 =await commitsql(`SELECT "typeId" from team where adminId = $1`,[req.userId])
     let result;
     if(result2.rowCount >=1){

        result= await commitsql(`SELECT id,title FROM form WHERE "typeId" = $1 AND "isDisable" =false `,[result2.rows[0].typeId]);
     }
     else{
        res.status(400).send("you are not team member");
        return 0 ;
     }
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}



router.route('/show').get(show);
router.route('/showDetails').post(showDetails);
router.route('/showForm').get(showForm);

module.exports =router;