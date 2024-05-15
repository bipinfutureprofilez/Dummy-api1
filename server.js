require('dotenv').config();
require('express-async-errors');

const express = require('express')
const app = express();
const connection = require('./db/connection')

app.use(express.json());

const port = process.env.PORT || 5000;

const authRouter = require('./router/auth');
const notFound = require('./middleware/notfound')
const errorHandler = require('./middleware/errorHandler')

app.get('/', (req, res) => {
    res.send('<h1>Hello World...</h1>');
})

app.use('/auth', authRouter);
app.use(notFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connection(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is runnig at ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();