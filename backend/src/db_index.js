const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const DB_URI = 'mongodb://localhost/homebankingu4s';

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
                .then((res, err) => {
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