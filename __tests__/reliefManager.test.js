const supertest = require("supertest")
const fs = require("fs")
const { app } = require("../app")
const { now } = require("moment")


module.exports = () => {
    describe('reliefManager', () => {
        var token;
        let visitedTeamteam1ID;

        describe('true login', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/admin/login").send({
                    email: 'reliefManager@mail.com',
                    password: "1234567890"
                }).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.token).not.toBeNull();
                        token = "bearer " + res.body.token;
                    })


            })
        })
        describe('addType', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/reliefManager/addType")
                    .send({
                        title: "testTeamType"
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {

                    })
            })
        })

        let testTeamTypeId;
        describe('showTeamsTypes', () => {
            it('should retutns a 200', async () => {
                await supertest(app).get("/reliefManager/showTeamsTypes")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].title).toEqual("testTeamType");
                        testTeamTypeId = res.body[res.body.length - 1].id;
                    })
            })
        })
        describe('editTeamsType', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/reliefManager/editTeamsType")
                    .send({
                        newTitle: "editTestTeamType",
                        id: testTeamTypeId
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {

                    })
            })
        })
        describe('showTeamsTypes', () => {
            it('should retutns a 200', async () => {
                await supertest(app).get("/reliefManager/showTeamsTypes")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].title).toEqual("editTestTeamType");

                    })
            })

            describe('Documents', () => {

                describe('addDocument', () => {
                    it('should retutns a 200', async () => {
                        await supertest(app).post("/reliefManager/addDocument")
                            .send({
                                item: "testDoc",
                                typeId: testTeamTypeId
                            }).set('authorization', token).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {

                            })
                    })
                    it('should retutns a 200', async () => {
                        await supertest(app).post("/reliefManager/addDocument")
                            .send({
                                item: "testDoc2",
                                typeId: testTeamTypeId
                            }).set('authorization', token).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {

                            })
                    })
                })
                let documentTestId;
                describe('showDocuments', () => {
                    it('should retutns a 200', async () => {
                        await supertest(app).post("/reliefManager/showDocuments")
                            .send({
                                typeId: testTeamTypeId
                            }).set('authorization', token).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                expect(documentTestId = res.body[res.body.length - 1].item).toEqual("testDoc2")
                                documentTestId = res.body[res.body.length - 1].id
                            })
                    })
                })
                let roleId = {

                };
                let tokenSuperAdmin;

                describe('DeleteDocument', () => {
                    describe('true login SuperAdmin', () => {
                        it('should retutns a 200', async () => {
                            await supertest(app).post("/admin/login").send({
                                email: 'admin@mail.com',
                                password: "1234567890"
                            }).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                    expect(res.body.token).not.toEqual(undefined);
                                    tokenSuperAdmin = "bearer " + res.body.token;
                                    console .log ('tokenSuperAdmin :'+tokenSuperAdmin)
                                })
            
            
                        })
                    })
                    
                    it('should retutns a 200', async () => {

                        await supertest(app).get("/superAdmin/showRole")
                            .send({
                            }).set('authorization', tokenSuperAdmin).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                res.body.forEach(element => {
                                    //visitedTeamteam in createDB
                                    if (element.title == "visitedTeamteam") {
                                        roleId.visitedTeam = element.id
                                    }

                                });
                                expect(roleId.visitedTeam).not.toEqual(undefined)


                            })


                    })



                })

                describe('DeleteDocument', () => {
                    it('should retutns a 200', async () => {
                        await supertest(app).post("/reliefManager/DeleteDocument")
                            .send({
                                id: documentTestId
                            }).set('authorization', token).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {

                            })
                    })
                })

                describe('teams', () => {
                    describe('addTeam', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/addTeam")
                                .send({
                                    typeId: testTeamTypeId,
                                    email: `visitedTeamteam1@mail.com`,
                                    password: "1234567890",
                                    roleId: roleId.visitedTeam,
                                    teamName: "visitedTeamteam1",
                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                })

                        })
                    })
                    describe('showTeams', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/showTeams")
                                .send({
                                    id: testTeamTypeId,

                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                    expect(res.body[res.body.length - 1].title).toEqual("visitedTeamteam1")
                                    visitedTeamteam1ID = res.body[res.body.length - 1].id
                                })

                        })
                    })


                    describe('addToTeam', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/addToTeam")
                                .send({
                                    teamId: visitedTeamteam1ID,
                                    name: "teamMember"

                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {

                                })

                        })
                    })
                    let nameId;
                    describe('showTeamDetails', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/showTeamDetails")
                                .send({
                                    id: visitedTeamteam1ID,

                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                    expect(res.body.names[res.body.names.length - 1].name).toEqual("teamMember")
                                    nameId = res.body.names[res.body.names.length - 1].id
                                })

                        })
                    })
                    describe('deleteFromTeam', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/deleteFromTeam")
                                .send({
                                    memberId: nameId,

                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {

                                })

                        })
                    })
                    describe('editTeamName', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/editTeamName")
                                .send({
                                    id: visitedTeamteam1ID,
                                    newTeamName: "newteamName"

                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {

                                })

                        })
                    })

                    describe('deleteTeam', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/deleteTeam")
                                .send({
                                    id: visitedTeamteam1ID,

                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {

                                })

                        })
                    })






                })
                describe('Form', () => {

                    describe('addToForm', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/addToForm")
                                .send({
                                    typeId: testTeamTypeId,
                                    title: "form1"
                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {

                                })

                        })
                    })
                    let formId;
                    describe('showForm', () => {

                        it('should retutns a 200', async () => {
                            await supertest(app).post("/reliefManager/showForm")
                                .send({
                                    typeId: testTeamTypeId,
                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                    expect(res.body[res.body.length - 1].title).toEqual("form1")
                                    formId = res.body[res.body.length - 1].id
                                })

                        })
                    })

                })
            })
            describe('DeleteType', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/DeleteType")
                        .send({
                            id: testTeamTypeId
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {

                        })
                })
            })
        })
        describe('Requests', () => {
            let requestId = 1;
            describe('showRequests', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showRequests")
                        .send({

                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if(element.title=="not visited"){
                                    requestId=  element.id
                                }
                            });

                        })
                })
            })

            describe('showRequestDetails-notVisited', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/showRequestDetails")
                        .send({
                            id: requestId
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.title).toEqual("not visited")
                        })
                })
            })
            let date;
            describe('teamfreeDate', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/teamfreeDate")
                        .send({
                            id: visitedTeamteam1ID, day: "2024-12-1"
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.dates.length).not.toEqual(0)
                            date = res.body.dates[0]
                        })
                })
            })

            describe('sendTeam', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/sendTeam")
                        .send({
                            requestId: requestId, dateInteger: date,
                            teamId: visitedTeamteam1ID, date: "2024-12-1"
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {

                        })
                })
            })
            requestId = 5

            describe('showVisitedRequests', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showVisitedRequests")
                        .send({

                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if(element.title=="visited"){
                                    requestId=  element.id
                                }
                            });
                        })
                })
            })
            describe('showVisitedRequestDetails', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/showVisitedRequestDetails")
                        .send({
                            id: requestId
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.title).toEqual("visited")
                        })
                })
            })

            describe('setPriority', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/setPriority")
                        .send({
                            id: requestId,
                            priority: 3

                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        })
                })
            })
            describe('showVisitedRequestDetails', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/showVisitedRequestDetails")
                        .send({
                            id: requestId
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.priority).toEqual(3)
                        })
                })
            })
            describe('editPriority', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/editPriority")
                        .send({
                            id: requestId,
                            priority: 2
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        })
                })
            })
            describe('showVisitedRequestDetails', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/showVisitedRequestDetails")
                        .send({
                            id: requestId
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.priority).toEqual(2)
                        })
                })
            })

            describe('requestAllotmentFund', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/requestAllotmentFund")
                        .send({
                            id: requestId,
                            amount: 2000
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        })
                })
            })

            describe('requestAllotmentStore', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/requestAllotmentStore")
                        .send({
                            idRequest: requestId,
                            idItem: 1,
                            count: 10
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        })
                })
            })

            describe('requestBuying', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/requestBuying")
                        .field({

                            idRequest: requestId,
                            count: 2000

                        })
                        .attach('images', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png',
                           

                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })

                })
            })

            describe('showVisitedRequests-for-offerToDonate', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showVisitedRequests")
                        .send({

                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if(element.title=="visited-Receptionist"){
                                    requestId=  element.id
                                }
                            });
                        })
                })
            })
            describe('offerToDonate', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/offerToDonate")
                        .send({
                            idRequest: requestId,
                            reason: "string",
                            budget: 20000,
                            minimumDonation: 1500,
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        })
                })
            })
            describe('showFund', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showFund")
                        .send({

                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //19998000 = 2000000000-requestAllotmentFund
                            expect(res.body.count).toEqual(19998000)
                        })
                })

            })
            /*describe('showVisitedRequests-for-showFundRequest', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showVisitedRequests")
                        .send({

                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if(element.title=="show"){
                                    requestId=  element.id
                                }
                            });
                        })
                })
            })*/
            describe('showFundRequest', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/showFundRequest")
                        .send({
                            id: requestId
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //19998000 = 2000000000-requestAllotmentFund
                            expect(res.body.sum).toEqual("20000")
                        })
                })

            })
            describe('showVisitDocument', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/showVisitDocument")
                        .send({
                            id: requestId
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //19998000 = 2000000000-requestAllotmentFund
                        })
                })

            })

            describe('rejectRequest', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/rejectRequest")
                        .send({
                            id: requestId
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //19998000 = 2000000000-requestAllotmentFund
                        })
                })

            })





        })
        describe('Campaigns', () => {
            let campaigntId
            describe('showCampaigns', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showCampaigns")
                        .send({
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body[res.body.length - 1].title).toEqual("title1")
                            expect(res.body[res.body.length - 1].sum).toEqual("2000")
                            campaigntId = res.body[res.body.length - 1].id
                        })
                })

            })
            describe('campaignBuying', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/campaignBuying")
                        .field({

                            idCampaign: campaigntId,
                            amount: 2000

                        })
                        .attach('images', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png',


                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })

                })


            })

        })


        describe('showComplaint', () => {

            describe('Campaigns', () => {
                let campaigntId
                describe('showComplaint', () => {
                    it('should retutns a 200', async () => {
                        await supertest(app).post("/reliefManager/showComplaint")
                            .send({
                                start: 1,
                                count: 3
                            }).set('authorization', token).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                expect(res.accepted.length).not.toEqual(0)
                            })
                    })

                })

            })
        })

    })
}