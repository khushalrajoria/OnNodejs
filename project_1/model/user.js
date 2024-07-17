const mongoose= require("mongoose");


const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
    },
    ipAddress:{
        type:String,
    }
},
   {timeStamp :true}
);

const User = mongoose.model("User",userSchema);

module.exports =User;