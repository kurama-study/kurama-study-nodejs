const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('./src/config/mongodb.config');
const app = express();
import userRouter from './src/routers/user.router';
import auth from'./src/routers/auth.router';
require('dotenv').config();

const port = `${process.env.PORT}`;
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use('/auth', auth);
app.use('/user', userRouter);




app.use(express.static('static'));


app.listen(port, () => {
    console.log('app running ' + port);
})
