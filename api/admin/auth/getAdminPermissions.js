const jwt = require('jsonwebtoken');
  const commitsql = require('../../../database/commitsql')
  const express = require('express')

  const router= express.Router()

const getAdminPermissions = async (req, res, next) => {
  try{
  let permissionCode = req.permissionCode;
  if(req.headers.authorization != undefined){
  const bearer =req.headers.authorization.split(' ')
  const authHeader = bearer[1];
    if (!authHeader) {
    return res.status(401).send({ message: 'Unauthorized' });
  } 
  console.log(authHeader)


  jwt.verify(authHeader, process.env.TOKEN_SECRET_ADMIN, async (error, decoded) => {
    try{
    let id = decoded.id;

    var result = await commitsql(`SELECT "roleId" from admin WHERE "id" =$1 `, [id])
        if(result.rowCount ==1 )
    var result = await commitsql(`SELECT permisions.id, permisions.title, "permissionId" from "rolePermission" JOIN permisions ON permisions.id="rolePermission"."permissionId" WHERE "roleId" =$1 `, [result.rows[0].roleId])

        
    res.send(result.rows);

      

   
  }catch{
    console.log(error)
    res.status(403).send('Forbidden(you are not admin)');

  }
    
});
  
}else
res.status(403).send('please send token as Bearer youtoken if use header or just token if you use postman folder parent bearer token');
}catch{
  console.log("catch")
  res.status(400).send('catch');

}
};

router.route('/getAdminPermissions').get(getAdminPermissions)
module.exports=router

