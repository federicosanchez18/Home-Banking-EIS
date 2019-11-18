const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const config = {
    application: {
        cors: {
            server: [
                {
                    origin:"localhost:8080",
                    credentials: true
                }
            ]
        }
    }
}

// Middlewares
if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors(
    config.application.cors.server
));

// Routes
app.use('/user', require('./routes/user_routes'));

module.exports = app;