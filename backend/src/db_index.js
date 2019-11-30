const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const DB_URI = 'mongodb://localhost/homebankingu4s';
const User = require('../src/models/user');
const Service = require('../src/models/services');

function connect() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
                .then(() => {
                    mongoose.connect(DB_URI,
                        {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
                        .then((res, err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                });
        } else {
            mongoose.connect(DB_URI,
                {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
                .then(async (res, err) => {
                    const bot1 = await User.findOne({dni: 12345678});
                    const bot2 = await User.findOne({dni: 12345679});
                    if (!bot1 && !bot2) {
                        const userBot1 = new User({dni: 12345678, username: 'PabloSuarez', password: 'bot1234', email: 'bot1@email.com'});
                        const userBot2 = new User({dni: 12345679, username: 'DiegoSanchez', password: 'bot1234', email: 'bot2@email.com'});
                        userBot1.save();
                        userBot2.save();  
                    }
                    if (err) return reject(err);
                    resolve();
                });
        }
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };
