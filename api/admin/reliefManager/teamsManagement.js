const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();

async function addType(req,res,next){

    let result = await commitsql(`INSERT INTO "teamType"  (title,"createDate") VALUES ($1,$2)`,[req.body.title,new Date().toISOString()]);
    res.send("Done");
}

async function DeleteType(req,res,next){

    let result = await commitsql(`UPDATE "teamType"  SET isDisable = true WHERE id = $1 `,[req.body.id]);
    res.send("Done");
}
async function showTeamsTypes(req,res,next){

    let result = await commitsql(`SELECT * FROM "teamType" `);
    res.send(result.rows);
}
async function editTeamsType(req,res,next){

    let result = await commitsql(`UPDATE "teamType"  SET title = $1 WHERE id = $2 `,[req.body.newTitle,req.body.id]);
    res.send("Done");
}


async function addDocument(req,res,next){

    let result = await commitsql(`INSERT INTO document  ("typeId",item,"createDate") VALUES ($1,$2,$3) `,[req.body.typeId,req.body.item,new Date().toISOString()]);
    res.send("Done");
}

async function showDocuments(req,res,next){

    let result = await commitsql(`SELECT * FROM document WHERE id = $1 AND "isDisable" = false `,[req.body.typeId]);
    res.send(result.rows);
}

async function DeleteDocument(req,res,next){

    let result = await commitsql(`UPDATE document  SET "isDisable" = $1 WHERE id = $2`,[true,req.body.id]);
    res.send("Done");
}

async function showTeams(req,res,next){

    let result = await commitsql(`SELECT * FROM team where "typeId" = $1 `,[req.body.id]);
    res.send(result.rows);
}

async function addTeam(req,res,next){

    //TODO : create Function  
   // let result = await commitsql(`INSERT INTO document  ("typeId",item,"createDate") VALUES ($1,$2,$3) `,[req.body.typeId,req.body.item,new Date().toISOString()]);
    res.send("Done");
}
async function deleteTeam(req,res,next){

    //TODO : create Function  
   // let result = await commitsql(`INSERT INTO document  ("typeId",item,"createDate") VALUES ($1,$2,$3) `,[req.body.typeId,req.body.item,new Date().toISOString()]);
    res.send("Done");
}
async function editTeamName(req,res,next){

    let result = await commitsql(`UPDATE team  SET title = $1 WHERE id = $2`,[req.body.newTeamName,req.body.id]);
    res.send("Done");
}




async function showTeamDetails(req,res,next){
    //TODO : create Function
    //let result = await commitsql(`UPDATE team  SET title = $1 WHERE id = $2`,[req.body.newTeamName,req.body.id]);
    res.send("Done");
}



async function addToTeam(req,res,next){

    let result = await commitsql(`INSERT INTO "teamMember"  ("teamId",name,"createDate") VALUES ($1,$2,$3) `,[req.body.teamId,req.body.name,new Date().toISOString()]);
    res.send("Done");
}

async function deleteFromTeam(req,res,next){

    let result = await commitsql(`UPDATE team  SET  "isDisable"  =true WHERE id = $1`,[req.body.memberId]);
    res.send("Done");
}

async function showForm(req,res,next){

    let result = await commitsql(`SELECT id,title FROM form WHERE "typeId" = $1 AND "isDisable" =false `,[req.body.typeId]);
    res.send(result.rows);
}

async function addToForm(req,res,next){

    let result = await commitsql(`INSERT INTO form  ("typeId",title,"createDate") VALUES ($1,$2,$3) `,[req.body.typeId,req.body.title,new Date().toISOString()]);
    res.send("Done");
}

async function deleteFromForm(req,res,next){

    let result = await commitsql(`UPDATE form  SET "isDisable" =true WHERE id = $1`,[req.body.id]);
    res.send("Done");
}



router.route('/addType').post(addType);
router.route('/DeleteType').post(DeleteType);


router.route('/showTeamsTypes').get(showTeamsTypes);
router.route('/editTeamsType').post(editTeamsType);

router.route('/addDocument').post(addDocument);
router.route('/DeleteDocument').post(DeleteDocument);
router.route('/showDocuments').post(showDocuments);

router.route('/showTeams').post(showTeams);
router.route('/addTeam').post(addTeam);
router.route('/editTeamName').post(editTeamName);
router.route('/deleteTeam').post(deleteTeam);
router.route('/showTeamDetails').post(showTeamDetails);

router.route('/addToTeam').post(addToTeam);
router.route('/deleteFromTeam').post(deleteFromTeam);

router.route('/showForm').post(showForm);
router.route('/addToForm').post(addToForm);
router.route('/deleteFromForm').post(deleteFromForm);


module.exports =router;