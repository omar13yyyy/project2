const jwt = require('jsonwebtoken');
  const commitsql = require('../database/commitsql')

const adminMiddleware = async (req, res, next) => {

  let permissionCode = req.permissionCode;
  if(req.headers.authorization != undefined){
  const bearer =req.headers.authorization.split(' ')
  const authHeader = bearer[1];
  
  if (!authHeader) {
    return res.status(401).send({ message: 'Unauthorized' });
  } console.log(authHeader)


  jwt.verify(authHeader, process.env.TOKEN_SECRET_ADMIN, async (error, decoded) => {
    try{
    let userRole = decoded.roleId;
    let userId = decoded.id;

    
    var result = await commitsql(`SELECT "permissionId" from "rolePermission" WHERE "roleId" =$1 `, [userRole])
    let hasAccess = false;

    
      for (let i = 0; i < result.rowCount; i++) {
        
        if (permissionCode == result.rows[i].permissionId||result.rows[i].permissionId==20) {
          hasAccess = true
          break

        }
      }
    if (hasAccess) {
      req.userId = userId;
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }catch{
    console.log(error)
    res.status(403).send('Forbidden');

  }
});
  
}else
res.status(403).send('please send token as Bearer youtoken if use header or just token if you use postman folder parent bearer token');

};
const showStorePermission = async (req, res, next) => {

  req.permissionCode = 1;
  next();
};
const editStorePermission = async (req, res, next) => {

  req.permissionCode = 2;
  next();
};
const storeLogPermission = async (req, res, next) => {

  req.permissionCode = 3;
  next();
};
const visitedTeamShowPermission = async (req, res, next) => {

  req.permissionCode = 4;
  next();
};
const visitedTeamEnterPermission = async (req, res, next) => {

  req.permissionCode = 5;
  next();
};
const mediaTeamViewPermission = async (req, res, next) => {

  req.permissionCode = 6;
  next();
};
const mediaTeamEditPermission = async (req, res, next) => {

  req.permissionCode = 7;
  next();
};
const superAdminViewPermission = async (req, res, next) => {

  req.permissionCode = 8;
  next();
};
const superAdminOthersPermission = async (req, res, next) => {

  req.permissionCode = 21;
  next();
};
const superAdminEmployeePermission = async (req, res, next) => {

  req.permissionCode = 10;
  next();
};
const reliefManagerTeamsManagementPermission = async (req, res, next) => {

  req.permissionCode = 11;
  next();
};
const reliefManagerRequestsManagementPermission = async (req, res, next) => {

  req.permissionCode = 12;
  next();
};
const reliefManagerCampaignsManagmentPermission = async (req, res, next) => {

  req.permissionCode = 13;
  next();
};
const reliefManagerComplaintPermission = async (req, res, next) => {

  req.permissionCode = 14;
  next();
};

const receptionistaddComplaintPermission = async (req, res, next) => {

  req.permissionCode = 15;
  next();
};
const receptionistCampaignsPermission = async (req, res, next) => {

  req.permissionCode = 16;
  next();
};
const receptionistprofilePermission = async (req, res, next) => {

  req.permissionCode = 17;
  next();
};
const receptionistrequestPermission = async (req, res, next) => {

  req.permissionCode = 18;
  next();
};
const receptionistcreateAccountPermission = async (req, res, next) => {

  req.permissionCode = 19;
  next();
};
const superAdminFundsPermission = async (req, res, next) => {

  req.permissionCode = 9;
  next();
};


exports.adminMiddleware = adminMiddleware;

exports.showStorePermission = showStorePermission;
exports.editStorePermission = editStorePermission;
exports.storeLogPermission = storeLogPermission;
exports.visitedTeamShowPermission = visitedTeamShowPermission;
exports.visitedTeamEnterPermission = visitedTeamEnterPermission;
exports.mediaTeamViewPermission = mediaTeamViewPermission;
exports.mediaTeamEditPermission = mediaTeamEditPermission;
exports.superAdminViewPermission = superAdminViewPermission;
exports.superAdminOthersPermission = superAdminOthersPermission;
exports.superAdminEmployeePermission = superAdminEmployeePermission;
exports.reliefManagerTeamsManagementPermission = reliefManagerTeamsManagementPermission;
exports.reliefManagerRequestsManagementPermission = reliefManagerRequestsManagementPermission;
exports.reliefManagerCampaignsManagmentPermission = reliefManagerCampaignsManagmentPermission;
exports.reliefManagerComplaintPermission = reliefManagerComplaintPermission;
exports.receptionistaddComplaintPermission = receptionistaddComplaintPermission;
exports.receptionistCampaignsPermission = receptionistCampaignsPermission;
exports.receptionistprofilePermission = receptionistprofilePermission;
exports.receptionistrequestPermission = receptionistrequestPermission;
exports.receptionistcreateAccountPermission = receptionistcreateAccountPermission;
exports.superAdminFundsPermission=superAdminFundsPermission



