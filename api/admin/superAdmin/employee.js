const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const router = express.Router();
const bcrypt = require("bcrypt");


async function showRole(req,res,next){
    try{



    let result = await commitsql(`SELECT * FROM role`);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}

async function createRole(req,res,next){


    

    let result = await commitsql(`INSERT INTO role (title,"createDate") VALUES ($1,$2)`,[req.body.title,new Date().toISOString()]);
    res.send("Done");

    try{}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}
async function showPermissions(req,res,next){

    try{


    let result = await commitsql(`SELECT * FROM permisions`);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}
async function showRolePermisions(req,res,next){

    try{


    let result = await commitsql(`SELECT permisions.id  as permissionId  ,
    permisions.title as permisionTitle
    FROM "rolePermission"
    JOIN permisions
      ON  permisions.id ="rolePermission"."permissionId"
   WHERE "rolePermission"."roleId" = $1
   `,[req.body.id]);
    res.send(result.rows);
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}

async function addPermissionToRole(req,res,next){


 try{

    let result = await commitsql(`INSERT INTO "rolePermission"  ("roleId","permissionId","createDate") VALUES ($1,$2,$3)`,[req.body.roleId,req.body.permissionId,new Date().toISOString()]);
    res.send("Done");
}catch{
    console.log("catch")
    res.status(400).send('catch');
}  
}

async function deletePermissionFromRole(req,res,next){
    try{

     await commitsql(`DELETE FROM "rolePermission"
    WHERE "roleId" =$1 AND "permissionId" =$2`,[req.body.roleId,req.body.permissionId]);

       res.send("Done");
    }catch{
        console.log("catch")
        res.status(400).send('catch');
    }  


   }
   async function createEmployee(req,res,next){
    try{

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let result2=await commitsql(`Select email from admin where email =$1`,[req.body.email]);
        if(result2.rowCount ==0){
         await commitsql(`INSERT INTO admin (email,"roleId",name,password,"createDate") VALUES ($1,$2,$3,$4,$5)`,[req.body.email,req.body.roleId,req.body.name,hashedPassword,new Date().toISOString()]);
 
        res.send("Done");
    
    }else
    res.status(400).send("email is exist");

    }catch{
        console.log("catch")
        res.status(400).send('catch');
    }  
 
 
    }
    async function deleteEmployee(req,res,next){
        try{

        await commitsql(`DELETE FROM admin
        WHERE id =$1 `,[req.body.id]);     
            res.send("Done");
        }catch{
            console.log("catch")
            res.status(400).send('catch');
        }  
     
        }

        async function showEmployee(req,res,next){

            try{


            let result = await commitsql(`SELECT admin.id ,admin.email ,admin.name,role.title FROM admin JOIN role ON admin."roleId" = role.id`);
            res.send(result.rows);
        }catch{
            console.log("catch")
            res.status(400).send('catch');
        }  
        }

router.route('/showRole').get(showRole);
router.route('/createRole').post(createRole);
router.route('/showPermissions').get(showPermissions);
router.route('/showRolePermisions').post(showRolePermisions);
router.route('/addPermissionToRole').post(addPermissionToRole);
router.route('/deletePermissionFromRole').post(deletePermissionFromRole);
router.route('/deleteEmployee').post(deleteEmployee);

router.route('/createEmployee').post(createEmployee);
router.route('/showEmployee').get(showEmployee);

module.exports =router;