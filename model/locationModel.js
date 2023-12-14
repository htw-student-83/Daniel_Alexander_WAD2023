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
       type: String
   },
   city:{
       required: true,
       type: String
   },
   lat:{
       required: false,
       type: String
   },
   lon:{
       required: false,
       type: String
   }
});

module.exports = mongoose.model('Location', locationSchema);