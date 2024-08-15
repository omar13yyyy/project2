const supertest = require("supertest")
const { app } = require("../app")
const fs = require("fs")

module.exports = () => {
    describe('visitedTeam', () => {

        var token;
        describe('true login', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/admin/login").send({
                    email: 'adminvisitedTeamteam@mail.com',
                    password: "1234567890"
                }).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.token).not.toBeNull();
                        token = "bearer " + res.body.token;
                    })


            })
        })
        let request;
        describe('show', () => {
            it('should retutns a 200', async () => {
                await supertest(app).get("/visitedTeam/show")
                    .send({}).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        res.body.forEach(element => {
                            if (element.title == "not visited--user2-2test")
                                request = element
                        });
                        expect(request.title).toEqual("not visited--user2-2test");

                    })


            })

        })
        describe('showDetails', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/visitedTeam/showDetails")
                    .send({ id: request.id }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.length).not.toEqual(0)
                        expect(res.body[0].title).toEqual("not visited--user2-2test")

                    });

            })


        })
        let idFormItem ;
        describe('showForm', () => {
            it('should retutns a 200', async () => {
                await supertest(app).get("/visitedTeam/showForm")
                    .send({ id: request.id }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        expect(res.body.length).not.toEqual(0)
                        idFormItem =res.body[0].id
                    });

            })

        })
        describe('enterForm', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/visitedTeam/enterForm")
                    .send({answers : [{idRequest: request.id,
                        idFormItem: idFormItem,
                        answer: "answer from team test"}]

                    }).set('authorization', token).set('Accept', 'application/json')
                    .set('Contant-Type', 'application/json').expect(200).then((res) => {
                        //expect(res.body.length).not.toEqual(0)

                    });

            })


        })


        describe('uploadImages', () => {
            it('should retutns a 200', async () => {
                await supertest(app).post("/visitedTeam/uploadImages")
                    .field({

                        idRequest: request.id,
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






}