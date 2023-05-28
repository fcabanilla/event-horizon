const mongoose = require('mongoose');

const request = require('supertest');
const app = require('../index'); // importa tu app de Express aquí

describe('Users API', () => {
    // it('should get all users', async () => {
    //     const response = await request(app).get('/api/v1/users');
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toBeInstanceOf(Array);
    // });

    it('should create a new user', async () => {
        const newUser = {
            name: 'test user',
            email: 'testuser@gmail.com',
            password: 'testpassword'
        };
        const response = await request(app).post('/api/v1/users').send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);
    });

    // it('should get a user by id', async () => {
    //     const userId = 'some-valid-user-id'; // reemplazar con un id de usuario válido
    //     const response = await request(app).get(`/api/v1/users/${userId}`);
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toHaveProperty('id');
    // });

    // it('should update a user', async () => {
    //     const userId = 'some-valid-user-id'; // reemplazar con un id de usuario válido
    //     const updatedUser = {
    //         name: 'updated name',
    //         email: 'updatedemail@gmail.com',
    //         password: 'updatedpassword'
    //     };
    //     const response = await request(app).put(`/api/v1/users/${userId}`).send(updatedUser);
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.name).toBe(updatedUser.name);
    //     expect(response.body.email).toBe(updatedUser.email);
    // });

    // it('should delete a user', async () => {
    //     const userId = 'some-valid-user-id'; // reemplazar con un id de usuario válido
    //     const response = await request(app).delete(`/api/v1/users/${userId}`);
    //     expect(response.statusCode).toBe(204);
    // });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
