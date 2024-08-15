


const supertest = require("supertest")
const { app } = require("../app")

module.exports = (requestNotShow, requestShow, requestAllotment) => {
    describe('Donations' + requestNotShow + ' ' + requestShow + ' ' + requestAllotment, () => {

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

        describe('requestNotShow', () => {
            var requestId;

            describe('requests-NotShow', () => {
                it('should retutns a 200', async () => {
                    let isExist = false
                    await supertest(app).get("/user/previousRequest")
                        .send({
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            res.body.forEach(element => {
                                if (element.title == requestNotShow) {
                                    requestId = element.id
                                    isExist = true
                                }
                            });
                            expect(isExist).toEqual(true);

                        })
                })
            })

            describe('donationForRequest', () => {
                it('should retutns a 400', async () => {
                    await supertest(app).post("/user/donationForRequest")
                        .send({
                            id: requestId
                            , amount: 10000
                        }).set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(400).then((res) => {

                        })
                })
            })
        })
            describe('requestShow', () => {
                var requestId;

                describe('requests-Show', () => {
                    it('should retutns a 200', async () => {
                        let isExist = false
                        await supertest(app).get("/user/previousRequest")
                            .send({
                            }).set('authorization', token).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                res.body.forEach(element => {
                                    if (element.title == requestShow) {
                                        requestId = element.id

                                        isExist = true
                                    }
                                });
                                expect(isExist).toEqual(true);

                            })
                    })
                })
                describe('donationForRequest', () => {
                    it('should retutns a 200', async () => {
                        await supertest(app).post("/user/donationForRequest")
                            .send({
                                id: requestId
                                , amount: 10000
                            }).set('authorization', token).set('Accept', 'application/json')
                            .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                expect(res.body.success).toEqual(true);

                            })
                    })
                })
            })
                describe('requestAllotment', () => {
                    var requestId;

                    describe('requests-requestAllotmened', () => {
                        it('should retutns a 200', async () => {
                            let isExist = false
                            await supertest(app).get("/user/previousRequest")
                                .send({
                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(200).then((res) => {
                                    res.body.forEach(element => {
                                        if (element.title == requestAllotment) {
                                            requestId = element.id

                                            isExist = true
                                        }
                                    });
                                    expect(isExist).toEqual(true);

                                })
                        })
                    })
                    describe('donationForRequest', () => {
                        it('should retutns a 400', async () => {
                            await supertest(app).post("/user/donationForRequest")
                                .send({
                                    id: requestId
                                    , amount: 10000
                                }).set('authorization', token).set('Accept', 'application/json')
                                .set('Contant-Type', 'application/json').expect(400).then((res) => {

                                })
                        })
                    })
                })
            })
        }