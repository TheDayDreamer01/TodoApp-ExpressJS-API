import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String, 
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    bio : { type : String }
}, {
    timestamps : true
});


const userModel = mongoose.model("users", userSchema);

export default userModel;