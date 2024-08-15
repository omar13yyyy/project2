const supertest = require("supertest")
const { app } = require("../app")

module.exports = (requestTitle) => {

    describe('showReq ' +requestTitle, () => {
    
        var token;
        var requestId;
            var token;
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
            describe('showVisitedRequests', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).get("/reliefManager/showVisitedRequests")
                        .send({
    
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if(element.title==requestTitle){
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
    
            
    })
    }