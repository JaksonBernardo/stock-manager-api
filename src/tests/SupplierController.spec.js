import request from 'supertest';
import app from '../app.js';
import db from '../db/Connection.js';

describe("Create a supplier", () => {

    let token;

    afterAll(async () => {
        await db.end();
    });

    it("Deve criar um fornecedor", async () => {

        const responseLogin = await request(app)
        .post('/admin/login')
        .send({
            "email": "jaksonbernardo@gmail.com",
            "password": "K#c7#@J|ewLP"
        })

        token = responseLogin.body.token;

        const responseSupplier = await request(app)
        .post('/suppliers/create')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "name": "FORNECEDOR TESTE",
            "cnpj": "012.345.678/0001-02",
            "email": "emailteste@email.com",
            "phone": "88993286358",
            "address": "Rua X do Y, 300, Centro",
            "city": "FORTALEZA",
            "state": "CE"
        })

        expect(responseSupplier.status).toBe(201);

    })

})

