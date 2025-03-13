const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HttpError =require('./utils/HttpError');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/cseproject3')
.then(()=> console.log('connected to database'))   
.catch((error)=> console.log(error));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader( 'Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE ,PUT')
    next();
});

const userRoutes= require('./routes/userRoutes');
const questionPaperRoutes = require( "./routes/questionPaperRoutes.js");
const paymentRoutes = require( "./routes/paymentRoutes.js")

app.use(userRoutes);
app.use( questionPaperRoutes);
app.use( paymentRoutes);


app.use((req, res, next) => next (new HttpError('Could not find this route.', 404)));

app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});


app.listen(8000 ,()=> console.log("listening to port 8000"));