const app = require('./app_backend');
const db = require('./db_index');

const PORT = process.env.PORT || 3060;

db.connect()
    .then(() => {
        console.log('DB is connected');
        app.listen(PORT, () => {
            console.log('Listening on port: ' + PORT);
        });
    });
