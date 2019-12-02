process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const User = require('../src/models/user');

const app = require('../src/app_backend');
const conn = require('../src/db_index');

describe('API Rest', () => {

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
                .send({ dni: 35242425, username: 'test', password: 'asd1234', email: 'test@email.com'})
                .then((res) => {
                    const body = res.body.registerUser;
                    expect(body).to.contain.property('id');
                    expect(body).to.contain.property('dni');
                    expect(body).to.contain.property('username');
                    expect(body).to.contain.property('password');
                    expect(body).to.contain.property('email');
                    expect(body).to.contain.property('date');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    
        it('Fail, user requires dni', (done) => {
            request(app).post('/user/register')
                .send({ username: "Test", password: "asd1234", email: "test@email.com" })
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('User validation failed: dni: El DNI es requerido');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });
    
    describe('PUT /user/deposit/1', () => {
       
        it('Ok, deposit $150 to the amount of the user', (done) => {
            request(app).put('/user/deposit/1')
                .send({ amount: 150 })
                .then((res) => {
                    const body = res.body;
                    expect(body).to.have.property('amount').to.be.equal(150);
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });

    describe('PUT /user/extraction/1', () => {
       
        it('Ok, extract $100 to the amount of the user', (done) => {
            request(app).put('/user/extraction/1')
                .send({ amount: 100 })
                .then((res) => {
                    const body = res.body;
                    expect(body).to.have.property('amount').to.be.equal(50);
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);

        it('Fail, extract $500 to the amount of the user, exceeded limit', (done) => {
            request(app).put('/user/extraction/1')
                .send({ amount: 500 })
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('Has superado el límite de extracción, vuelve a intentar con un monto menor');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });

    describe('PUT /user/limit/1', () => {
       
        it('Ok, new limit $150 to extraction', (done) => {
            request(app).put('/user/limit/1')
                .send({ limit: 150 })
                .then((res) => {
                    const body = res.body;
                    expect(body).to.have.property('limit').to.be.equal(150);
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });

    describe('POST /user/login', () => {
       
        beforeEach( async function() {
            const userLogin = new User({dni: 32323232, username: 'Login', password: 'login1234', email: 'login@email.com'});
            await userLogin.save();
        });
        
        it('Ok, login a user with email', (done) => {
            request(app).post('/user/login')
                .send({ email: 'login@email.com', password: 'login1234'})
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal(`The user Login is login correctly`);
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    
        it('Ok, login a user with username', (done) => {
            request(app).post('/user/login')
                .send({ username: 'Login', password: 'login1234'})
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal(`The user Login is login correctly`);
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    
        it('Fail, the user password does not correctly', (done) => {
            request(app).post('/user/login')
                .send({ email: "login@email.com", password: "asd1234" })
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('La contraseña es inválida, por favor introduzca una contraseña correcta');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });
    
    describe('PUT /user/updateuser/1', () => {
       
        it('Ok, update username Test to Update and new password', (done) => {
            request(app).put('/user/updateuser/1')
                .send({ username: 'Update' ,password: '1234asd' })
                .then((res) => {
                    const body = res.body.userupdated;
                    expect(body).to.have.property('username').to.be.equal('Update');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });
    
    describe('DELETE /user/delete/1', () => {
        
        it('Ok, deleted a user id 1', (done) => {
            request(app).delete('/user/delete/1')
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('32323232 is deleted');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });
})

