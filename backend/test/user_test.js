process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../src/app_backend');
const conn = require('../src/db_index');

describe('POST /user/', () => {

    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('Ok, creating a new user', (done) => {
        request(app).post('/user/')
            .send({ dni: 35242425, name: 'Test', password: 'asd1234', email: 'test@email.com'})
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('id');
                expect(body).to.contain.property('dni');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('password');
                expect(body).to.contain.property('email');
                expect(body).to.contain.property('date');
                return done();
            }).catch((err) => done(err));
    });
})