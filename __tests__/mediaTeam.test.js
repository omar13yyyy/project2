const supertest = require("supertest")
const { app } = require("../app")
const fs = require("fs")

module.exports = () => {
    describe('mediaTeam', () => {
        let userId = 1;
        var token;
        describe('true login', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/admin/login").send({
                    email: 'mediaTeam@mail.com',
                    password: "1234567890"
                }).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.token).not.toBeNull();
                        token = "bearer " + res.body.token;
                    })


            })
        })
        describe('Campaigns', () => {

            describe('addCampaigns', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/mediaTeam/addAds")
                        .field({

                            title: "string",
                            descr: "string",

                        })
                        .attach('image', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png'

                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })


                })
            })
            describe('addAds', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/mediaTeam/addAds")
                        .field({

                            title: "title1",
                            descr: "descr1",

                        })
                        .attach('image', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png'

                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })


                })
                it('should retutns a 200', async () => {
                    await supertest(app).post("/mediaTeam/addAds")
                        .field({

                            title: "title2",
                            descr: "descr2",

                        })
                        .attach('image', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png'

                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })


                })
                it('should retutns a 200', async () => {
                    await supertest(app).post("/mediaTeam/addAds")
                        .field({

                            title: "title3",
                            descr: "descr3",

                        })
                        .attach('image', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png'

                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })


                })
            })

            describe('editAboutUsImage', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/mediaTeam/editAboutUsImage")
                        .field({

                        })
                        .attach('image', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png'

                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })


                })
            })

            describe('addPreviousCampaigns', () => {
                it('should retutns a 200', async () => {
                    await supertest(app).post("/mediaTeam/addPreviousCampaigns")
                        .field({
                            title:"title1",
                            descr:"descr1",
                        })
                        .attach('image', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png'

                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })


                })
                it('should retutns a 200', async () => {
                    await supertest(app).post("/mediaTeam/addPreviousCampaigns")
                        .field({
                            title:"title2",
                            descr:"descr2",
                        })
                        .attach('image', '/home/omar/project2/__tests__/images/Screenshot from 2024-08-11 22-42-18.png'

                        )
                        .set('authorization', token).set('Accept', 'application/json')
                        .set('Contant-Type', 'application/json').expect(200).then((res) => {
                            //expect(res.body).toEqual("Done");
                        })


                })
            })
        })
    })
} 