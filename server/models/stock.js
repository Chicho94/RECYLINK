const mongoose = require('mongoose');

const recylinkSchema = mongoose.Schema({
  producto:{
    type:String,
    required:true,
    trim:true,
    unique:1
  },
  material:{
    type:String,
    required:true,
    trim:true
  },
  cantidad:{
    type:Number,
    required:true,
    default:0
  }
})

const Recy = mongoose.model('Recy',recylinkSchema)

module.exports = { Recy }
