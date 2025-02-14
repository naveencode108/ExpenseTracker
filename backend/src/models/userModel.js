import mongoose from 'mongoose';


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        trim:true,
    }
},{timestamps:true});

export default mongoose.model('User',userSchema);