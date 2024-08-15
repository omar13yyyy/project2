const showStore = require('./admin/store/showStore');
const editStore = require('./admin/store/editStore');
const storeLog = require('./admin/store/storeLog');

const visitedTeamShow = require('./admin/visitedTeam/show');
const visitedTeamEnter = require('./admin/visitedTeam/enter');

const mediaTeamView = require('./admin/mediaTeam/view');
const mediaTeamEdit = require('./admin/mediaTeam/edit');

const superAdminView = require('./admin/superAdmin/view');
const superAdminOthers = require('./admin/superAdmin/others');
const superAdminFunds = require('./admin/superAdmin/funds');

const superAdminEmployee = require('./admin/superAdmin/employee');

const reliefManagerTeamsManagement = require('./admin/reliefManager/teamsManagement');
const reliefManagerRequestsManagement = require('./admin/reliefManager/requestsManagement');
const reliefManagerCampaignsManagment = require('./admin/reliefManager/campaignsManagment');
const reliefManagerComplaint =require('./admin/reliefManager/complaint');


const adminLogin = require('./admin/auth/login')
const getAdminPermissions = require('./admin/auth/getAdminPermissions')

//-------------------------------------------------------
const receptionistaddComplaint = require('./admin/receptionist/addComplaint')
const receptionistCampaigns = require('./admin/receptionist/Campaigns')
const receptionistprofile = require('./admin/receptionist/profile')
const receptionistrequest = require('./admin/receptionist/request')
const receptionistcreateAccount = require('./admin/receptionist/createAccount')


//--------------------------------------------------------
const visitorcreateAccount = require('./visitor/createAccount')
const visitorlogin = require('./visitor/login')
const visitorconfirmation = require('./visitor/confirmation')
const visitorresetPassword = require('./visitor/resetPassword')
const visitorresetconfirmation = require('./visitor/resetconfirmation')
const visitorCampaigns = require('./visitor/Campaigns')
const visitoraboutUs = require('./visitor/aboutUs')
const visitorads = require('./visitor/ads')
const visitorrequest = require('./visitor/request')

//------------------------------------------------------
const userMiddleware = require('./../validators/userauth')

const userCampaigns = require('./user/Campaigns')
const userads = require('./user/ads')
const useraboutUs = require('./user/aboutUs')
const userrequest = require('./user/request')
const useraddComplaint = require('./user/addComplaint')
const userprofileInfor = require('./user/profile')


const express = require('express')
var bodyParser = require('body-parser');


const { adminMiddleware,
  showStorePermission,
   editStorePermission,
   storeLogPermission,
   visitedTeamShowPermission,
   visitedTeamEnterPermission,
   mediaTeamViewPermission,
   mediaTeamEditPermission,
   superAdminViewPermission,
   superAdminOthersPermission,
   superAdminEmployeePermission,
   reliefManagerTeamsManagementPermission,
   reliefManagerRequestsManagementPermission,
   reliefManagerCampaignsManagmentPermission,
   reliefManagerComplaintPermission,
   receptionistaddComplaintPermission,
   receptionistCampaignsPermission,
   receptionistprofilePermission,
   receptionistrequestPermission,
   receptionistcreateAccountPermission,
   superAdminFundsPermission
  } =require("../middlewares/adminauth")


const Routes = (app) => {

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 


  app.use(express.static('public'));
  app.use('/images/b',express.static('images/b'));
  app.use('/images/a',express.static('images/a'));
  
  app.use('/store', showStorePermission,adminMiddleware,showStore ); 
  app.use('/store', editStorePermission,adminMiddleware,editStore ); 
  app.use('/store', storeLogPermission,adminMiddleware,storeLog ); 


  app.use('/visitedTeam', visitedTeamShowPermission,adminMiddleware,visitedTeamShow ); 
  app.use('/visitedTeam', visitedTeamEnterPermission,adminMiddleware,visitedTeamEnter ); 

  app.use('/mediaTeam', mediaTeamViewPermission,adminMiddleware,mediaTeamView ); 
  app.use('/mediaTeam', mediaTeamEditPermission,adminMiddleware,mediaTeamEdit ); 



  app.use('/superAdmin', superAdminViewPermission,adminMiddleware,superAdminView ); 
  app.use('/superAdmin', superAdminOthersPermission,adminMiddleware,superAdminOthers ); 
  app.use('/superAdmin', superAdminEmployeePermission,adminMiddleware,superAdminEmployee ); 
  app.use('/superAdmin', superAdminFundsPermission,adminMiddleware,superAdminFunds ); 

  app.use('/reliefManager', reliefManagerTeamsManagementPermission,adminMiddleware,reliefManagerTeamsManagement ); 
  app.use('/reliefManager', reliefManagerRequestsManagementPermission,adminMiddleware,reliefManagerRequestsManagement ); 
  app.use('/reliefManager', reliefManagerCampaignsManagmentPermission,adminMiddleware,reliefManagerCampaignsManagment ); 
  app.use('/reliefManager', reliefManagerComplaintPermission,adminMiddleware,reliefManagerComplaint ); 



  app.use('/admin', adminLogin);
  app.use('/admin', getAdminPermissions);

    //-------------------------------------------------------------
    app.use('/receptionist', receptionistaddComplaintPermission,adminMiddleware,receptionistaddComplaint ); 
    app.use('/receptionist', receptionistCampaignsPermission,adminMiddleware,receptionistCampaigns ); 
    app.use('/receptionist', receptionistprofilePermission,adminMiddleware,receptionistprofile ); 
    app.use('/receptionist', receptionistrequestPermission,adminMiddleware,receptionistrequest ); 
    app.use('/receptionist', receptionistcreateAccountPermission,adminMiddleware,receptionistcreateAccount ); 
  
  
  //-------------------------------------------------------------
    app.use('/visitor', visitorcreateAccount);
    app.use('/visitor', visitorlogin);
    app.use('/visitor', visitorconfirmation);
    app.use('/visitor', visitorresetconfirmation);
    app.use('/visitor', visitorresetPassword);
    app.use('/visitor', visitorCampaigns);
    app.use('/visitor', visitoraboutUs);
    app.use('/visitor', visitorads);
    app.use('/visitor', visitorrequest);
  
    //---------------------------------------------------------------
    app.use('/user',userMiddleware, userCampaigns);
    app.use('/user',userMiddleware, useraboutUs);
    app.use('/user',userMiddleware, userads);
    app.use('/user',userMiddleware, userrequest);
    app.use('/user',userMiddleware, useraddComplaint);
    app.use('/user',userMiddleware, userprofileInfor);
  
  //--------------------------------------------------------------
  
};
module.exports = Routes;