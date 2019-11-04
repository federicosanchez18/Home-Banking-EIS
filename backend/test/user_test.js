process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const User = require('../src/models/user');

const app = require('../src/app_backend');
const conn = require('../src/db_index');

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

describe('POST /user/register', () => {

    it('Ok, creating a new user', (done) => {
        request(app).post('/user/register')
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

    it('Fail, user requires dni', (done) => {
        request(app).post('/user/register')
            .send({ name: "Test", password: "asd1234", email: "test@email.com" })
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('User validation failed: dni: The DNI is required');
                return done();
            }).catch((err) => done(err));
    });
});

describe('POST /user/login', () => {

    beforeEach(async function() {
        const userLogin = new User({dni: 32323232, name: 'Login', password: 'login1234', email: 'login@email.com'});
        await userLogin.save();
    });

    it('Ok, login a user', (done) => {
        request(app).post('/user/login')
            .send({ email: 'login@email.com', password: 'login1234'})
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal(`The user Login is login correctly`);
                return done();
            }).catch((err) => done(err));
    });

    it('Fail, the user password does not correctly', (done) => {
        request(app).post('/user/login')
            .send({ email: "login@email.com", password: "asd1234" })
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('This password is invalid');
                return done();
            }).catch((err) => done(err));
    });
});