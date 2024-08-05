const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();

async function addType(req,res,next){
    try{

    let result = await commitsql(`INSERT INTO "teamType"  (title,"createDate") VALUES ($1,$2)`,[req.body.title,new Date().toISOString()]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}
async function DeleteType(req,res,next){
    try{

    let result = await commitsql(`UPDATE "teamType"  SET isDisable = true WHERE id = $1 `,[req.body.id]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}}
async function showTeamsTypes(req,res,next){
    try{

    let result = await commitsql(`SELECT * FROM "teamType" WHERE isDisable = false `);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}}
async function editTeamsType(req,res,next){
    try{

    let result = await commitsql(`UPDATE "teamType"  SET title = $1 WHERE id = $2 `,[req.body.newTitle,req.body.id]);
    
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}

async function addDocument(req,res,next){
    try{

    let result = await commitsql(`INSERT INTO document  ("typeId",item,"createDate") VALUES ($1,$2,$3) `,[req.body.typeId,req.body.item,new Date().toISOString()]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}
async function showDocuments(req,res,next){
    try{

    let result = await commitsql(`SELECT * FROM document WHERE "typeId" = $1 AND "isDisable" = false `,[req.body.typeId]);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}}

async function DeleteDocument(req,res,next){
    try{

    let result = await commitsql(`UPDATE document  SET "isDisable" = $1 WHERE id = $2`,[true,req.body.id]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}
async function showTeams(req,res,next){
    try{

    let result = await commitsql(`SELECT * FROM team where "typeId" = $1 AND "isDisable" = false`,[req.body.id]);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}}

async function addTeam(req,res,next){
    try{

    //TODO : create Function  
   // let result = await commitsql(`INSERT INTO document  ("typeId",item,"createDate") VALUES ($1,$2,$3) `,[req.body.typeId,req.body.item,new Date().toISOString()]);
      console.log(req.body)

    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}}
async function deleteTeam(req,res,next){
    try{

    //TODO : create Function  
    let result = await commitsql(`UPDATE team  SET "isDisable" = $1 WHERE id = $2`,[true,req.body.id]);
   console.log(req.body)
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}}
async function editTeamName(req,res,next){
    try{

    let result = await commitsql(`UPDATE team  SET title = $1 WHERE id = $2`,[req.body.newTeamName,req.body.id]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}



async function showTeamDetails(req,res,next){
    try{

    //TODO : create Function
    let typeId = await commitsql(`SELECT "typeId" FROM team WHERE  id =$1 `,[req.body.id]);
    if(typeId.rowCount ==1){
    let result1 = await commitsql(`SELECT id,name FROM "teamMember" WHERE  "teamId" = $1 AND "isDisable" = false`,[req.body.id]);
    let result2 = await commitsql(`SELECT id,item FROM document WHERE "typeId" = $1 AND "isDisable" =false `,[  typeId.rows[0].typeId  ]);

    res.json({
        names: result1.rows,
        documents : result2.rows
    })
}
else 
res.status(400).json({
    
})
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}


async function addToTeam(req,res,next){
    try{

    commitsql(`INSERT INTO "teamMember" ("teamId",name,"createDate") VALUES($1,$2,$3)`, ([req.body.teamId,req.body.name,new Date().toISOString()]))
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}
async function deleteFromTeam(req,res,next){
    try{

    let result = await commitsql(`UPDATE "teamMember"  SET  "isDisable"  =true WHERE id = $1`,[req.body.memberId]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}
async function showForm(req,res,next){
    try{

    let result = await commitsql(`SELECT id,title FROM form WHERE "typeId" = $1 AND "isDisable" =false `,[req.body.typeId]);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}
async function addToForm(req,res,next){
    try{

    let result = await commitsql(`INSERT INTO form  ("typeId",title,"createDate") VALUES ($1,$2,$3) `,[req.body.typeId,req.body.title,new Date().toISOString()]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
}
async function deleteFromForm(req,res,next){
    try{

    let result = await commitsql(`UPDATE form  SET "isDisable" =true WHERE id = $1`,[req.body.id]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
  
}
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

/*
if (statusVar % 2 =1) then
	statusVar=statusVar - 1;
end if;
if ((statusVar / 2) % 2) = 1 then
	statusVar=statusVar - 2;
end if;
if ((statusVar / 4) % 2) = 1 then
	statusVar=statusVar - 4;
end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 8;
else */
//the order is : isTeamDate(0),isVisited(1),isShow(2),isAllotment(3),isReceptionist(4),isDelivered(5),isRejected(6),isCanceled(7)

/*
//لازم كل الشروط تتنفذ مع بعض لتعطي نتيجة صح
if((status %2)==1 ){
    status -=1;
//تم تحديد وقت زيارة
}
if(((status /2)%2)==1 ){
    status -=2;
//تمت الزيارة
}
if(((status /4)%2)==1 ){
    status -=4;
//تم عرض الطلب للتبرع
}
if(((status /8)%2)==1 ){
    status -=8;
//تم التخصيص

}
if(((status /16)%2)==1 ){
    status -=16;
//تم التقديم عن طريق الاستقبال
}
if(((status /32)%2)==1 ){
    status -=32;
//تم تسليم (ما في عدنا تسليم)
}
if(((status /64)%2)==1 ){
    status -=64;
// تم رفض الطلب من قبل الادارة
}
if(((status /128)%2)==1 ){
    status -=128;
// تم الغاء الطلب من قبل المستخدم

}*/