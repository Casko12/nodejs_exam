let mongoose = require("mongoose");
let user = new mongoose.Schema({
    first_name: {
        type:String,
        required: true,
        minLength:[1],
        maxLength:255
    },
    last_name: {
        type:String,
        required: true,
        minLength:[1],
        maxLength:255
    },

    mobile: {
        type:String,
        required:true,
        unique: [true,'mobile number used'],
        
    },
    user_name:{
        type:String,
        required:true,
        unique: [true,'user name used'],
    },
    password:{
        type:String,
        required:  true,
    }

});
module.exports = mongoose.model("User",user);