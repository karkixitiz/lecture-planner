var mongoose=require('mongoose')

var userSchema=new mongoose.Schema({
    location:String,
    university:String,
    created_at:Date,
    updated_at:Date
})

const User=mongoose.model('User',userSchema)

module.exports= User
