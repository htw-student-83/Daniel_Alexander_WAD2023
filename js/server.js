const env = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

app.use(express.json())

env.config();
const PORT = process.env.PORT || 8080;

const user = mongoose.Schema({
    username: String,
    firstname: String,
    role: String,
}, {
    timestamps : true
})

const location = mongoose.Schema({
    name: String,
    description: String,
    address: String,
    postcode: String,
    cityName: String,
    lat: Number,
    lon: Number,
}, {
    timestamps : true
})

//Connection to the DB
mongoose.connect('mongodb://mongodb1.f4.htw-berlin.de:27017/daniel_alexander_wad2023')
    .then(() => {
        console.log("connect to DB.")
        app.listen(PORT, () => console.log("Server is listening..."))
    })
    .catch((err) => console.log(err));


//to handle the login process
app.get('/users', async(req, res) =>{
    const {benutzername} = req.body;
    const {password} = req.body;
    const userData = await user.find({benutzername: benutzername, password: password});
    if(userData){
        res.json({statuscode: 200, message: userData});
    }else{
        res.send({statuscode: 401});
    }
})


//to get all location from the DB
app.get('/loc/', async(req, res) =>{
    const savedLocation = await location.find({});
    if(savedLocation){
        res.json({statuscode: 200, message: savedLocation});
    }else{
        res.send({statuscode: 401});
    }
})


//Create new data collection and save these in the mongoDB
//http://localhost:8080/create
/** the new data for te DB
 * {
 *      "id" : 4 ,
 *      "name" : "Deutsches Theater",
 *      "description": "Kunst",
 *      "Address": "Schumannstraße 13a",
 *      "Zip": 10117,
 *      "Lat": 52.1234,
 *      "Lon": 13.344444,
 * }
 */
app.post('/loc', async(req, res) =>{
    let data = new location(req.body);
    await data.save();
    if(data.ok){
        res.send({statuscode: 201});
    }else{
        res.send({statuscode: 401});
    }
})


//Update a saved location
//http://localhost:8080/update
/**
 * {
 *      "id" : 4 ,
 *      "name" : "Berliner Theater",
 *      "description": "Kunst",
 *      "Address": "Friedrichstraße 107",
 *      "Zip": 10117,
 *      "Lat": 52.1234332,
 *      "Lon": 13.3567444,
 * }
 */
app.put('/loc', async(req, res) =>{
    const {id,...rest} = req.body
    const data = await location.update({_id : id}, rest)
    if(data.ok){
        res.send({statuscode: 204});
    }else{
        res.send({statuscode: 401});
    }
})


//to delete a location by id
app.delete('/loc', async(req, res) =>{
    const {id} = req.body;
    const data = await location.delete({_id : id})
    if(data.ok){
        res.send({statuscode: 204});
    }else{
        res.send({statuscode: 401});
    }
})

