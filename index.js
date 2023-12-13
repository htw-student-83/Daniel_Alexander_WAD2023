const { MongoClient } = require("mongodb");
const express = require('express');
const session = require('express-session');
const path = require('path')
const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/css')));
app.use(express.static(path.join(__dirname + '/image')));
app.use(express.static(path.join(__dirname + '/js')));

app.get('/', function (request, response){
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);

const host = "mongodb1.f4.htw-berlin.de";
const user_alex = "daniel_alexander_wad2023_alexander_yurovskyy";
const alex_password = "4e2mV637p";
const user_daniel = "daniel_alexander_wad2023_daniel_granass";
const daniel_password = "gz5Uu1SUB";
const database = "daniel_alexander_wad2023";
const uri = `mongodb://${user_alex}:${alex_password}@${host}:27017/${database}`;

const client = new MongoClient(uri);
async function run() {
    try {
        const database = client.db('daniel_alexander_wad2023');
        const users = database.collection('user_roles');
        const query = {firstname: 'Mina' };
        const doc = await users.findOne(query);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);