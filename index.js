require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const mongoString = process.env.DATABASE_URL_ALEX

//mongoDB connection
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

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