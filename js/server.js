const env = require('dotenv');
const express = require('express');
app.use(express.json())

env.config();

const PORT = process.env.PORT || 8080;

app.get('/loc/', async(req, res) =>{
    const data = await location.find({});
    if(data.length > 0){
        res.json({data});
    }else{
        res.send({message: "Statuscode 4..?."});
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
app.post('/loc/create', async(req, res) =>{
    let data = new location(req.body);
    await data.save();
    if(data.ok){
        res.send({message: "Statuscode 201."});
    }else{
        res.send({message: "Statuscode 4..?."});
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
app.put('/loc/update', async(req, res) =>{
    const {id,...rest} = req.body
    const data = await location.updateOne({_id : id}, rest)
    if(data.ok){
        res.send({message: "Statuscode 204."});
    }else{
        res.send({message: "Statuscode 4..?."});
    }
})


app.get('/login', async(req, res) =>{
    const role = "admin";
    const {benutzername} = req.body;
    const {password} = req.body;
    const savedUserName = await location.find({benutzername: benutzername});
    const savedPassword = await location.find({password: password});
    const position = await location.find({role: role});
    if(savedUserName.length > 0 && savedPassword.length > 0 && position.length > 0){
        res.json({savedUserName, savedPassword, position});
    }else{
        res.send({message: "Statuscode 4..?."});
    }
})


app.delete('/loc/delete', async(req, res) =>{
    const {id} = req.body;
    const data = await location.deleteOne({_id : id})
    if(data.ok){
        res.send({message: "Statuscode 204."});
    }else{
        res.send({message: "Statuscode 4..?."});
    }
})

