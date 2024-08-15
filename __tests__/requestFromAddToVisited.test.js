const supertest = require("supertest")
const { app } = require("../app")
const fs = require("fs")

module.exports = ( requestTitle) => {
    let token = {
        reliefManager: null,
        user: null, visitedTeam: null
    };
    describe('requestFromAddToVisited '+ requestTitle, () => {

        describe('logins', () => {

            describe('reliefManager login', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/admin/login").send({
                        email: 'reliefManager@mail.com',
                        password: "1234567890"
                    }).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.token).not.toBeNull();
                            token.reliefManager = "bearer " + res.body.token;
                        })


                })
            })
            describe('user login', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/visitor/login").send({
                        email: 'user1@mail.com',
                        password: "1234567890"
                    }).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            token.user =  res.text;
                        })


                })
            })
            describe('visitedTeam login', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/admin/login").send({
                        email: 'adminvisitedTeamteam@mail.com',
                        password: "1234567890"
                    }).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.token).not.toBeNull();
                            token.visitedTeam = "bearer " + res.body.token;
                        })


                })
            })

        })
        describe('process', () => {

        describe('addRequest user', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/addRequest")
                    .send({
                        title: requestTitle,
                        work: requestTitle,
                        reason: requestTitle,
                    }).set('authorization', token.user).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);

                    })
            })
        })
            let requestId ;
            describe('showRequests', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showRequests")
                        .send({

                        }).set('authorization', token.reliefManager).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if(element.title==requestTitle){
                                    requestId=  element.id
                                }
                            });

                        })
                        expect(requestId).not.toEqual(undefined);

                })
            })


        describe('showRequestDetails-notVisited', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/reliefManager/showRequestDetails")
                    .send({
                        id: requestId
                    }).set('authorization', token.reliefManager).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.title).toEqual(requestTitle)
                    })
            })
        })



        let  visitedTeamteam1ID =1;
        let date;
            describe('teamfreeDate', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/reliefManager/teamfreeDate")
                        .send({
                            id: visitedTeamteam1ID, day: "2024-10-10"
                        }).set('authorization', token.reliefManager).set('Accept', 'application/json')
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
                            teamId: visitedTeamteam1ID, date: "2024-10-10"
                        }).set('authorization', token.reliefManager).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {

                        })
                })
            })
            describe('showRequests', () => {
                let isExist = false;

                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showRequests")
                        .send({
                        }).set('authorization', token.reliefManager).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if(element.title==requestTitle){
                                    isExist = true
                                }
                            });

                        })
                        expect(isExist).toEqual(false);

                })
            })

            
            describe('showRequestVisitedTeamBeforeAccept', () => {
                it('should retutns a 200', async () => {
                    isExist = false
                    await supertest(app).get("/visitedTeam/show")
                        .send({}).set('authorization', token.visitedTeam).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if (element.title == requestTitle)
                                    isExist = true
                            });

                            expect(isExist).toEqual(false);
    
                        })
    
    
                })
    
            })
            describe('showappointment', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/user/showappointment")
                        .send({
                            reqid:requestId ,
    
                        }).set('authorization', token.user).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.length).toEqual(1);
    
    
                        })
    
                })
            })

            describe('visitacceptance', () => {
                it('should retutns a 200', async () => {
                    let isExist = false
                    await supertest(app).post("/user/visitacceptance")
                        .send({
                            reqid:requestId ,
                            acceptance:2
    
                        }).set('authorization', token.user).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.success).toEqual(true);
    
    
                        })
                        
                })
            })




            let request;
            describe('showRequestVisitedTeam', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/visitedTeam/show")
                        .send({}).set('authorization', token.visitedTeam).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if (element.title == requestTitle)
                                    request = element
                            });
                            expect(request.title).toEqual(requestTitle);
    
                        })
    
    
                })
    
            })
            describe('showRequestDetailsVisitedTeam', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/visitedTeam/showDetails")
                        .send({ id: request.id }).set('authorization', token.visitedTeam).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.length).not.toEqual(0)
                            expect(res.body[0].title).toEqual(requestTitle)
    
                        });
    
                })
    
    
            })
            let FormItem =[] ;
            describe('showForm', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/visitedTeam/showForm")
                        .send({ id: request.id }).set('authorization', token.visitedTeam).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            expect(res.body.length).not.toEqual(0)
                            FormItem =res.body
                        });
    
                })
    
            })
            describe('enterForms', () => {
                
                FormItem.forEach(element => {
                    it('should retutns a 200', async () => {
                        await supertest(app).post("/visitedTeam/enterForm")
                            .send({ idRequest: request.id,
                                idFormItem: element.id,
                                answer: "answer from team test"
        
                            }).set('authorization', token.visitedTeam).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                expect(res.body.length).not.toEqual(0)
        
                            });
        
                    })
                });

    
    
            })
    
    
            describe('uploadImages', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/visitedTeam/uploadImages")
                        .field({
    
                            idRequest: request.id,
                        })
                        .attach('images', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png',
                           
    
                        )
                        .set('authorization', token.visitedTeam).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })
    
                })
            })
    








            describe('showVisitedRequests-afterVisited', () => {
                it('should retutns a 200', async () => {
                    isExist = false

                    await supertest(app).get("/reliefManager/showVisitedRequests")
                        .send({

                        }).set('authorization', token.reliefManager).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if(element.title==requestTitle){
                                    isExist = true
                                }
                            });
                            expect(isExist).toEqual(true);

                        })
                })
            })

        })

    })
}