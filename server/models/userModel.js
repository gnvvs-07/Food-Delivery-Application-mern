import mongoose from "mongoose";

// user schemna
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        type:Object,
        default:{}
    }
},{minimise:false});

// user model

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

// export user model

export default userModel;