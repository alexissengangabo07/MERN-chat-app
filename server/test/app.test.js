import request from 'supertest'
import app from './app.js'


describe("POST /users", () => {
    describe("given a username and password", () => {

        test("register user account", async () => {
            const response = await request(app).post("/users").send({
                email: "email",
                username: "username",
                password: "password",
            })
            expect(response.statusCode).toBe(201)
        })
        test("get user in db", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
});