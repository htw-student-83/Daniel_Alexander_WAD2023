const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
   name:{
       required: true,
       type: String
   },
   description:{
       required: false,
       type: String
   },
   address:{
       required: true,
       type: String
   },
   postCode:{
       required: true,
       type: Number
   },
   city:{
       required: true,
       type: String
   },
   lat:{
       required: false,
       type: Number
   },
   lon:{
       required: false,
       type: Number
   }
});

const LocationModel = mongoose.model('locations', locationSchema);

module.exports = LocationModel;