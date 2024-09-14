const mongoose = require("mongoose");
const User  = require("./userSchema")

const AccountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        req:true
    },
    balance:{
        type:Number,
        require:true,
        unique:false
    }
});

const Account = new mongoose.model("Account" , AccountSchema);

module.exports = Account;