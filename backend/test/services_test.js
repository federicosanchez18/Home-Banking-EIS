process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const Services = require('../src/models/services');
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
    
    describe('POST /services/create/1', () => {
        
        beforeEach( async function() {
            const user = new User({dni: 32323232, username: 'pruebaservice', password: 'service1234', email: 'services@email.com'});
            await user.save();
        });

        it('Ok, creating a new services', (done)=> {
            request(app).post('/services/create/1')
                .send({ name: 'Gas', amount: 500, description: 'Cuota del mes de Noviembre', paymentCode: 3310418990})
                .then((res) => {
                    const body = res.body.services;
                    expect(body).to.contain.property('name');
                    expect(body).to.contain.property('amount');
                    expect(body).to.contain.property('description');
                    expect(body).to.contain.property('paymentCode');
                    expect(body).to.contain.property('payServices');
                    expect(body).to.contain.property('date');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    
        it('Fail, services requires name', (done) => {
            request(app).post('/services/create/1')
                .send({ amount: 500, description: 'Cuota del mes de Noviembre' })
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('Services validation failed: name: The name is required');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });

    describe('PUT /services/pay/3310418990', () => {
       
        it('Ok, the services is paid', (done) => {
            request(app).put('/services/pay/3310418990')
                .send({ amount: 500 })
                .then((res) => {
                    const body = res.body.paidServices;
                    expect(body).to.have.property('payServices').to.be.equal(true);
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    
        before( async function() {
            const newServices = new Services({name: 'Agua', amount: 900, description: 'Cuota del mes de Noviembre', paymentCode: 3310418999});
            await newServices.save();
        });

        it('Fail, the amount is insufficient', (done) => {
            request(app).put('/services/pay/3310418999')
                .send({ amount: 100 })
                .then((res) => {
                    const body = res.body.message;
                    expect(body).to.equal('This amount not enough');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });

    describe('PUT /services/3310418990', () => {
       
        it('Ok, new description for services', (done) => {
            request(app).put('/services/3310418999')
                .send({ description: 'Cuota del mes de Diciembre' })
                .then((res) => {
                    const body = res.body.services;
                    expect(body).to.have.property('description').to.be.equal('Cuota del mes de Diciembre');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });

    describe('DELETE /services/3310418999', () => {
        
        it('Ok, deleted a services paymentCode 3310418999 ', (done) => {
            request(app).delete('/services/3310418999')
                .then((res) => {
                    const body = res.body.message;
                    expect(body).to.equal('3310418999 is deleted');
                    return done();
                }).catch((err) => done(err));
        }).timeout(1000*60*20);
    });
})

