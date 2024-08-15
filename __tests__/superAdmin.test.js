const supertest= require ("supertest")
const { app } = require ("../app")
const fs = require ("fs")

module.exports= () => { 
    
    describe('supperAdmin',()=>{
    var token ;
    describe('supperAdmin login ',()=>{
        describe('email not exist',()=>{
            it('should retutns a 404',async ()=>{
                const adminEmail = 'omaradmin@gmail.com'
                await supertest(app).post("/admin/login").send({
                    email:adminEmail,
                    password:"1234567890"
                }).expect(404);
            })
        })
        describe('password Invalid',()=>{
            it('should retutns a 401',async ()=>{
                await supertest(app).post("/admin/login").send({
                    email:'admin@mail.com',
                    password:"123456789011"
                }).expect(401);
            })
        })
        describe('true login',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/admin/login").send({
                    email:'admin@mail.com',
                    password:"1234567890"
                }).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {                          
                    expect(res.body.token).not.toBeNull();
                    token="bearer " +res.body.token;
                  })
                
 
            })
        })
        describe('check permission  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).get("/admin/getAdminPermissions")
                .send({ }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                    expect(res.body[0].permissionId).toEqual(8);
                    
                  })
                
 
            })
        })
    }) ,
    describe('Campaigns',()=>{

        describe('addCampaigns',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addCampaigns")
                .field(    { 
                    
                    budget:100000,
                    TargetGroup: "string",
                    reason: "string",
                    descr: "string",
                    minimumDonation:500 ,
                    title: "string"

                    })
                .attach('image','/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png'

                )
                .set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                    //expect(res.body).toEqual("Done");
                  })
                
 
            })
        })

       
            let Campaigns;
            describe('showCampaigns',()=>{
                it('should retutns a 200',async ()=>{
                    await supertest(app).get("/superAdmin/showCampaigns")
                    .send({ }).set('authorization', token).set('Accept','application/json')
                    .set('Contant-Type','application/json').expect(200).then((res) => {   
                        expect(res.body[res.body.length -1].title).toEqual("string");
                        Campaigns=res.body

                      })
                    
     
                })
                
            })
            describe('showCampaignDetails',()=>{
                it('should retutns a 200',async ()=>{
                    await supertest(app).post("/superAdmin/campaignsDetails")
                    .send({ id : Campaigns[Campaigns.length -1].id }).set('authorization', token).set('Accept','application/json')
                    .set('Contant-Type','application/json').expect(200).then((res) => {   
                        expect(res.body[res.body.length -1].budget).toEqual(100000);
                        expect(res.body[res.body.length -1].targetGroup).toEqual("string");
                        expect(res.body[res.body.length -1].reason).toEqual("string");
                        expect(res.body[res.body.length -1].description).toEqual("string");
                       // expect(res.body[res.body.length -1].minimumDonation).toEqual(500);
                      })
                    
     
                })
            })

            describe('deleteCampaigns',()=>{
                it('should retutns a 200',async ()=>{
                    await supertest(app).post("/superAdmin/deleteCampaigns")
                    .send({ id : Campaigns.length -1
                        }).set('authorization', token).set('Accept','application/json')
                    .set('Contant-Type','application/json').expect(200).then((res) => {      
    
                    })
                    
     
                })
            })

    }),
    describe('fund',()=>{
        describe('fund log',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/fundLog")
                .send({ 
                    start :1,
                    count:10    
                }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                    
                })
                
 
            })
        })

        describe('fund log ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/campaignDonationLog")
                .send({ start :1,
                    count:10
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })
        })
        describe('requestDonationLog ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/requestDonationLog")
                .send({ start :1,
                    count:10
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })
        })
        describe('decreaseFund  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/decreaseFund")
                .send({ count:2000,
                    reason:"the reason"
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })
        })
        describe('showComplaint  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/showComplaint")
                .send({ start :1,
                    count:10
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })
        })
        describe('profileInfo  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/profileInfo")
                .send({ id:"09010"
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })
        })
    }),
    describe('role and Permissions',()=>{
        roleId = {
            mediaTeam : 0,
            receptionist : 0,
            reliefManager : 0,
            store : 0,
            visitedTeam : 0,
            full:0
        }
        describe('createRoles  ',()=>{
            

            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createRole")
                .send({ title:"full"
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createRole")
                .send({ title:"mediaTeam"
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createRole")
                .send({ title:"receptionist"
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createRole")
                .send({ title:"reliefManager"
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createRole")
                .send({ title:"store"
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createRole")
                .send({ title:"visitedTeam"
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })

        })
        describe('showRole  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).get("/superAdmin/showRole")
                .send({ 
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                    roleId.visitedTeam  =res.body[res.body.length -1].id
                    roleId.store  = res.body[res.body.length -2].id
                    roleId.reliefManager=res.body[res.body.length -3].id
                    roleId.receptionist =res.body[res.body.length -4].id
                    roleId.mediaTeam = res.body[res.body.length -5].id
                    roleId.full = res.body[res.body.length -6].id

                })
                
 
            })


        })
        describe('showPermissions  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).get("/superAdmin/showPermissions")
                .send({ 
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      

                })
                
 
            })


        })
        describe('addPermissionToRole  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.mediaTeam ,
                    permissionId : 6
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.mediaTeam ,
                    permissionId : 7
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })

            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.store ,
                    permissionId :1
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.store ,
                    permissionId :2
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.store ,
                    permissionId :3
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })


            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.visitedTeam ,
                    permissionId :4
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.visitedTeam ,
                    permissionId :5
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.reliefManager ,
                    permissionId :11
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.reliefManager ,
                    permissionId :12
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.reliefManager ,
                    permissionId :13
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.reliefManager ,
                    permissionId :14
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.receptionist ,
                    permissionId :15
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.receptionist ,
                    permissionId :16
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.receptionist ,
                    permissionId :17
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.receptionist ,
                    permissionId :18
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.receptionist ,
                    permissionId :19
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.full ,
                    permissionId :20
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/addPermissionToRole")
                .send({ roleId: roleId.full ,
                    permissionId :21
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            
            

        })
        
        let permissionIdTodelete;
        
        describe('showRolePermisions  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/showRolePermisions")
                .send({ id: roleId.full ,
                     
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => { 
                    expect(res.body[res.body.length -1].permissionid).toEqual(21);

                    permissionIdTodelete = res.body[res.body.length -1].permissionid      
                })
                
            })
        })

        describe('deletePermissionFromRole  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/deletePermissionFromRole")
                .send({ id: permissionIdTodelete ,
                 
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
        })
    })
    describe('Employee  ',()=>{

        describe('createEmployee  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createEmployee")
                .send({ email:`mediaTeam@mail.com`,
                    password:"1234567890",
                    roleId:roleId.mediaTeam,
                    name:"mediaTeam",
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createEmployee")
                .send({ email:`receptionist@mail.com`,
                    password:"1234567890",
                    roleId:roleId.receptionist,
                    name:"receptionist",
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createEmployee")
                .send({ email:`reliefManager@mail.com`,
                    password:"1234567890",
                    roleId:roleId.reliefManager,
                    name:"reliefManager",
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createEmployee")
                .send({ email:`store@mail.com`,
                    password:"1234567890",
                    roleId:roleId.store,
                    name:"store",
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createEmployee")
                .send({ email:`full@mail.com`,
                    password:"1234567890",
                    roleId:roleId.full,
                    name:"full",
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/createEmployee")
                .send({ email:`fullDeleted@mail.com`,
                    password:"1234567890",
                    roleId:roleId.full,
                    name:"fullDeleted",
                    }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {      
                })
                
            })
        })
        let deletedAdminId
        describe('showEmployee  ',()=>{
            it('should retutns a 200',async ()=>{
                await supertest(app).get("/superAdmin/showEmployee")
                .send({  }).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {
                    expect(res.body[res.body.length -1].name).toEqual("fullDeleted")
                    

                    deletedAdminId = res.body[res.body.length -1].id;
                })
                
            })


        })
        describe('deleteEmployee  ',()=>{

            it('should retutns a 200',async ()=>{
                await supertest(app).post("/superAdmin/deleteEmployee")
                .send({  id :deletedAdminId}).set('authorization', token).set('Accept','application/json')
                .set('Contant-Type','application/json').expect(200).then((res) => {
                    
                })
                
            })

        })

    })



})
}