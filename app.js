require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoClient = require('mongoose');

const userRoute = require('./routes/user');

mongoClient.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected database from mongodb');
}).catch((error) => {
    console.error(`Connect database is failed with error which is ${error}`);
})

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!'
    });
})

app.use('/users',userRoute);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404
    next(err);
});

app.use(() => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500
    
    return res.status(status).json({
        error: {
            message: error.message,
        }
    });
});

const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));