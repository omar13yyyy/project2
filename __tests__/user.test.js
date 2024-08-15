const supertest = require("supertest")
const { app } = require("../app")
const fs = require("fs")

module.exports = () => {
    describe('user', () => {

        var token;
        describe('true login', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/visitor/login").send({
                    email: 'user1@mail.com',
                    password: "1234567890"
                }).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        token =  res.text;
                    })


            })
        })

        let campaigns;
        describe('campaigns', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/campaigns")
                    .send({
                        start: 1,
                        count: 1000
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        campaigns = res.body[0]

                    })
            })
        })
        describe('campaignsDetails', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/campaignsDetails")
                    .send({
                        id: campaigns.id
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].budget).toEqual(100000);

                    })
            })
        })
        let requestId;
        describe('requests', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/user/requests")
                    .send({
                        start: 1,
                        count: 1000,
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        res.body.forEach(element => {
                            if(element.title =="show-Receptionist"){
                                requestId = element.id

                                isExist=true
                            }
                        });
                        expect(isExist).toEqual(true);


                    })
            })
        })
        describe('requestDetails', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/requestDetails")
                    .send({
                        id: requestId
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.length).not.toEqual(0);

                    })
            })
        })
        describe('profileInfo', () => {
            it('should retutns a 200', async () => {
                await supertest(app).get("/user/profileInfo")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].idKey).toEqual("09010");


                    })
            })
        })
        describe('editProfileInfo', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/editProfileInfo")
                    .send({
                        name: "string",
                        fullNumber: "string",
                        Date: "2020/4/4",
                        addr: "string",
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {


                    })
            })
        })
        describe('profileInfo', () => {
            it('should retutns a 200', async () => {
                await supertest(app).get("/user/profileInfo")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].name).toEqual("string");


                    })
            })
        })


        describe('addRequest', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/addRequest")
                    .send({
                        title: "string",
                        work: "string",
                        reason: "string",
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);

                    })
            })
        })
        describe('requests-afterADD', () => {
            it('should retutns a 200', async () => {
                let isExist =false
                await supertest(app).get("/user/previousRequest")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        res.body.forEach(element => {
                            if(element.title == "string"){
                            isExist =true
                        }
                        });
                        expect(isExist).toEqual(true);

                    })
            })
        })
        describe('previousRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false;
                await supertest(app).get("/user/previousRequest")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        res.body.forEach(element => {
                            if (element.title == "string")
                                isExist = true
                        });
                        expect(isExist).toEqual(true);

                    })
            })
        })

        describe('donationForCamoaugns', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/donationForCamoaugns")
                    .send({
                        id: campaigns.id
                        , amount: 10000
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                    })
            })
        })
        describe('previousDonationCampaigns', () => {
            it('should retutns a 200', async () => {
                await supertest(app).get("/user/previousDonationCampaigns")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        
                        expect(res.body[res.body.length - 1].title).toEqual("title1");
                        

                    })
            })
        })
        describe('donationForFund', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/donationForFund")
                    .send({
                        amount: 5000
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);


                    })
            })
        })

        describe('donationForRequest', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/donationForRequest")
                    .send({
                        id: 12
                        , amount: 10000
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);

                    })
            })
        })
        describe('previousDonationRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).get("/user/previousDonationRequest")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        res.body.forEach(element => {
                            if (element.id == requestId)
                                isExist = true
                        });
                        expect(isExist).toEqual(true);

                    })
            })
        })

        describe('donationCampaigns', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/user/donationCampaigns")
                    .send({
                        id: campaigns.id,

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {


                    })
            })
        })
        describe('donationRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/user/donationRequest")
                    .send({
                        id:requestId ,

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {


                    })
            })
        })

        describe('showwallet', () => {
            it('should retutns a 200', async () => {
                await supertest(app).get("/user/showwallet")
                    .send({
                       // id:requestId ,

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[0].amountwallet).toEqual(1950000);


                    })
            })
        })
        describe('previousRequest-for-showappointment', () => {
            it('should retutns a 200', async () => {
                let isExist =false
                await supertest(app).get("/user/previousRequest")
                    .send({
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        res.body.forEach(element => {
                            if(element.title == "will-visted"){
                                requestId =element.id
                                 isExist =true
                        }
                        });
                        expect(isExist).toEqual(true);

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

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);


                    })
                    
            })
        })
        describe('cancellingRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/user/cancellingRequest")
                    .send({
                        idRequest: requestId,

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {

                        expect(res.body.success).toEqual(true);

                    })
            })
        })
        describe('cancellingRequest-not', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/user/cancellingRequest")
                    .send({
                        idRequest: 13,
    
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {

                        expect(res.body.success).toEqual(false);

                    })
            })
        })
    })
}