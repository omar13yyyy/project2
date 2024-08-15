
const supertest = require("supertest")
const { app } = require("../app")
const fs = require("fs")

module.exports = () => {
    describe('receptionist', () => {
        let userId = 1;
        var token;
        describe('true login', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/admin/login").send({
                    email: 'receptionist@mail.com',
                    password: "1234567890"
                }).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.token).not.toBeNull();
                        token = "bearer " + res.body.token;
                    })


            })
        })

        let request;
        describe('addComplaint', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/addComplaint")
                    .send({}).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);

                    })
            })
        })

        let campaigns;
        describe('campaigns', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/campaigns")
                    .send({
                        start: 1,
                        count: 1000
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.result[0].title).toEqual("string");
                        campaigns = res.body.result[0]

                    })
            })
        })
        describe('campaignsDetails', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/campaignsDetails")
                    .send({
                        id: campaigns.id
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].budget).toEqual(100000);

                    })
            })
        })

        describe('donationForCamoaugns', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/donationForCamoaugns")
                    .send({
                        id: campaigns.id
                        , amount: 10000
                        , idUser: userId
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                    })
            })
        })
        describe('previousDonationCampaigns', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/previousDonationCampaigns")
                    .send({
                        idUser: userId
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].title).toEqual("string");


                    })
            })
        })
        describe('donationForFund', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/donationForFund")
                    .send({
                        idUser: userId,
                        amount: 5000
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);


                    })
            })
        })
        describe('profileInfo', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/profileInfo")
                    .send({
                        idUser: userId,
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].idKey).toEqual("09010");


                    })
            })
        })
        describe('editProfileInfo', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/editProfileInfo")
                    .send({
                        idUser: userId,
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
                await supertest(app).post("/receptionist/profileInfo")
                    .send({
                        idUser: userId,
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].name).toEqual("string");


                    })
            })
        })
        describe('getUserId', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/getUserId")
                    .send({
                        key: "09010",
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body[res.body.length - 1].id).toEqual(1);


                    })
            })
        })
        let requestId;
        describe('requests', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/requests")
                    .send({
                        start: 1,
                        count: 1000,
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        res.body.result.forEach(element => {
                            if (element.title == "show-Receptionist")
                                requestId = element.id

                        });



                    })
            })
        })
        describe('requestDetails', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/requestDetails")
                    .send({
                        id: requestId
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.length).not.toEqual(0);

                    })
            })
        })
        describe('addRequest', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/addRequest")
                    .send({
                        title: "string",
                        work: "string",
                        reason: "string",
                        idUser: userId,
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);

                    })
            })
        })
        describe('requests', () => {
            it('should retutns a 200', async () => {
                let isExist = false;
                await supertest(app).post("/receptionist/requests")
                    .send({
                        start: 1,
                        count: 1000,
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        res.body.result.forEach(element => {
                            if (element.title == "show-Receptionist")
                                isExist = true
                        });
                        expect(isExist).toEqual(true);

                    })
            })
        })

        describe('previousRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false;

                await supertest(app).post("/receptionist/previousRequest")
                    .send({
                        idUser: userId,
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
        describe('previousRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false;

                await supertest(app).post("/receptionist/previousRequest")
                    .send({
                        idUser: userId,
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


        describe('donationForRequest', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/receptionist/donationForRequest")
                    .send({
                        id: 11
                        , amount: 10000
                        , idUser: userId
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.success).toEqual(true);

                    })
            })
        })
        describe('previousDonationRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/receptionist/previousDonationRequest")
                    .send({
                        idUser: userId
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

        describe('createAccount', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/receptionist/createAccount")
                    .send({
                        id: "09000",
                        name: "string",
                        Email: "string@string.string",
                        password: "string",
                        fullNumber: "string",
                        Date: "2020/4/4",
                        addr: "string",
                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {

                        expect(res.body[0].id).not.toEqual(0);

                    })
            })
        })

        describe('donationCampaigns', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/receptionist/donationCampaigns")
                    .send({
                        id: campaigns.id,
                        idUser: userId,

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {


                    })
            })
        })
        describe('donationRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/receptionist/donationRequest")
                    .send({
                        id: requestId,
                        idUser: userId,

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {


                    })
            })
        })
        describe('requests-for-cancellingRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false;
                await supertest(app).post("/receptionist/previousRequest")
                .send({
                    idUser: userId,
                }).set('authorization', token).set('Accept', 'application/json')
                .set('Contant-Type', 'application/json').expect(200).then((res) => {
                    res.body.forEach(element => {
                        if (element.title == "will-visted-Receptionist")
                            requestId = element.id
                            isExist = true
                    });
                    expect(isExist).toEqual(true);
            })

    })
            
        })
        describe('cancellingRequest', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/receptionist/cancellingRequest")
                    .send({
                        idRequest: requestId,
                        idUser: userId,

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {

                        expect(res.body.success).toEqual(true);

                    })
            })
        })


        describe('cancellingRequest-not', () => {
            it('should retutns a 200', async () => {
                let isExist = false
                await supertest(app).post("/receptionist/cancellingRequest")
                    .send({
                        idRequest: 14,
                        idUser: userId,

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {

                        expect(res.body.success).toEqual(false);

                    })
            })
        })

    })

}