const express = require('express');
const morgan = require('morgan');

const app = express();

// Middlewares
if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/user', require('./routes/user_routes'));

module.exports = app;