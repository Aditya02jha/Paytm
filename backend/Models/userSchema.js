const mongoose = require('mongoose');

//create mongoose.Schema object.

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        lowercase:true,
        trim:true
    },
    lastname:{
        type:String,
        require:false,
        lowercase:true,
        trim:true
    },
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:30,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
        minLength:6
    },
});

const User = new mongoose.model("User" ,UserSchema);

module.exports = User;