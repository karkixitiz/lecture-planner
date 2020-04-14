'use strict'

var mongoose=require('mongoose')
var lectureSchema=new mongoose.Schema({
    subject:String,
    date:String,
    time:String
})
module.exports=mongoose.model('Lecture',lectureSchema)