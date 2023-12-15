const express = require('express');
const LocationModel = require('../model/locationModel.js');
const UserModel = require('../model/userModel.js');
const router = express.Router();

//users endpoint

router.post('/users', async function (request, response) {
    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {
        try {
            const user = await UserModel.findOne({ username: username }).exec();
            if (!user) {
                return response.status(401).json({ message: 'Invalid username or password' });
            }
            if (user.password !== password) {
                return response.status(401).json({ message: 'Invalid username or password' });
            }

            // Exclude the password from the response
            const userWithoutPassword = {
                username: user.username,
                firstname: user.firstname,
                role: user.role,
            };

            response.status(200).json(userWithoutPassword);
        } catch (error) {
            response.status(500).json({
                message: error.message
            });
        }
    } else {
        response.status(400).json({ message: 'Please enter Username and Password!' });
    }
});

//loc endpoints

//Post location -> Add
router.post('/loc', async function (request, response) {

    console.log(request.body.Name)

    const locationData = new LocationModel({
        Name: request.body.Name,
        Description: request.body.Description,
        Address: request.body.Address,
        Postcode: request.body.Postcode,
        City: request.body.City,
        Lat: request.body.Lat,
        Lon: request.body.Lon,
    })

    try {
        const locationToSave = await locationData.save();

        response.status(201).json(locationToSave)
    }
    catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
});

//Get all locations -> Address List
router.get('/loc', async function (request, response) {
    try{
        const locationsData = await LocationModel.find();
        response.status(200).json(locationsData)
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
});

//Get location by ID  -> Aufruf (Delete/Update-Screen)
router.get('/loc/:id', (request, response) => {
    response.send('Get by ID API')
})

//Update location by ID
router.patch('/loc/:id', (request, response) => {
    response.send('Update by ID API')
})

//Delete location by ID
router.delete('/loc/:id', (request, response) => {
    response.send('Delete by ID API')
})

module.exports = router;