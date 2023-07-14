import mongoose from "mongoose";


const todoSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    title : {
        type : String,
        required : true, 
        unique : true
    },
    description : {
        type : String,
    },
    notes : {
        type : String
    },
    is_check : {
        type : Boolean,
        default : false
    }
}, {
    timestamps : true
});

const todoModel = mongoose.model("todo", todoSchema);

export default todoModel;