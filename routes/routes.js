const express = require('express');
const locationModel = require('../model/locationModel.js');
const UserModel = require('../model/userModel.js');
const router = express.Router();

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

//Get all Method
router.get('/getAll', (request, response) => {
    request.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (request, response) => {
    response.send(request.params.id)
})

//Update by ID Method
router.patch('/update/:id', (request, response) => {
    request.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (request, response) => {
    request.send('Delete by ID API')
})

module.exports = router;