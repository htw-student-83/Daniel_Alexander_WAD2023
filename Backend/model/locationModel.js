const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
   Name:{
       required: true,
       type: String,
       trim: true
   },
   Description:{
       type: String,
       trim: true
   },
   Address:{
       required: true,
       type: String,
       trim: true
   },
   Postcode:{
       required: true,
       type: String,
       trim: true
   },
   City:{
       required: true,
       type: String,
       trim: true
   },
   Lat:{
       type: Number,
       trim: true
   },
   Lon:{
       type: Number,
       trim: true
   }
});

const LocationModel = mongoose.model('locations', locationSchema);

module.exports = LocationModel;