import mongoose from "mongoose";
import bcrypt from "bcryptjs";


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
    bio : { 
        type : String,
        default : ""
    },
    task_done : { 
        type : Number, 
        default : 0
    },
    tasks : { 
        type : Number,
        default : 0
    }
}, {
    timestamps : true
});


userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.incrementTask = async function() {
    await userModel.updateOne(
        { _id : this._id },
        {$inc: {tasks :1}}
    );
}

userSchema.methods.decrementTask = async function() {
    await userModel.updateOne(
        { _id : this._id },
        {$inc : {tasks : -1 }}
    );
}

userSchema.methods.resolveTask = async function(num){
    await userModel.updateOne(
        { _id : this._id },
        {$inc : {task_done : num }}
    ); 
}

const userModel = mongoose.model("user", userSchema);

export default userModel;