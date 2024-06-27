const showStore = require('./admin/store/showStore');
const editStore = require('./admin/store/editStore');
const storeLog = require('./admin/store/storeLog');

const visitedTeamShow = require('./admin/visitedTeam/show');
const visitedTeamEnter = require('./admin/visitedTeam/enter');

const mediaTeamView = require('./admin/mediaTeam/view');
const mediaTeamEdit = require('./admin/mediaTeam/edit');

const superAdminView = require('./admin/superAdmin/view');
const superAdminOthers = require('./admin/superAdmin/others');
const superAdminEmployee = require('./admin/superAdmin/employee');

const reliefManagerTeamsManagement = require('./admin/reliefManager/teamsManagement');
const reliefManagerRequestsManagement = require('./admin/reliefManager/requestsManagement');
const reliefManagerCampaignsManagment = require('./admin/reliefManager/campaignsManagment');
const reliefManagerComplaint =require('./admin/reliefManager/complaint');

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
//-------------------------------------------------------
const receptionistaddComplaint = require('./admin/receptionist/addComplaint')
const receptionistCampaigns = require('./admin/receptionist/Campaigns')
const receptionistprofile = require('./admin/receptionist/profile')
const receptionistrequest = require('./admin/receptionist/request')
const receptionistcreateAccount = require('./admin/receptionist/createAccount')

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

const Routes = (app) => {

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 


  //app.use(express.static('public'));
  //app.use('/images/b',express.static('images/b'));
  //app.use('/images/a',express.static('images/a'));
  
  app.use('/store', showStore);
  app.use('/store', editStore);
  app.use('/store', storeLog);


  app.use('/visitedTeam', visitedTeamShow);
  app.use('/visitedTeam', visitedTeamEnter);

  app.use('/mediaTeam', mediaTeamView);
  app.use('/mediaTeam', mediaTeamEdit);



  app.use('/superAdmin', superAdminView);
  app.use('/superAdmin', superAdminOthers);
  app.use('/superAdmin', superAdminEmployee);

  app.use('/reliefManager', reliefManagerTeamsManagement);
  app.use('/reliefManager', reliefManagerRequestsManagement);
  app.use('/reliefManager', reliefManagerCampaignsManagment);
  app.use('/reliefManager', reliefManagerComplaint);

    //-------------------------------------------------------------
    app.use('/receptionist', receptionistaddComplaint);
    app.use('/receptionist', receptionistCampaigns);
    app.use('/receptionist', receptionistprofile);
    app.use('/receptionist', receptionistrequest);
    app.use('/receptionist', receptionistcreateAccount);
  
  
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
    app.use('/user',/*userMiddleware,*/ userCampaigns);
    app.use('/user', useraboutUs);
    app.use('/user', userads);
    app.use('/user', userrequest);
    app.use('/user', useraddComplaint);
    app.use('/user', userprofileInfor);
  
  //--------------------------------------------------------------
  
};
module.exports = Routes;