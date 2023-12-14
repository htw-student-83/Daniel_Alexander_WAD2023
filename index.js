require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const mongoString = process.env.DATABASE_URL_ALEX

//mongoDB connection
//setter for connection constant
mongoose.connect(mongoString);
//getter of connection constant
const database = mongoose.connection;

//on the connection with the DB - a listener for errors
database.on('error', (error) => {
    console.log(error);
});

//once at the connection-start of the DB - message of it starting
database.once('connected', () => {
    console.log('Database Connected');
});

//express setup
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import directories for html
app.use(express.static(path.join(__dirname + '/css')));
app.use(express.static(path.join(__dirname + '/image')));
app.use(express.static(path.join(__dirname + '/js')));

app.get('/', function (request, response){
    response.sendFile(path.join(__dirname + '/index.html'));
});

//set api
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})