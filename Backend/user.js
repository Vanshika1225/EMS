const mongoose=require('mongoose');
const { Schema } = mongoose;
// e663ce9f184ecd707a6d062d2bb2798f4235afd03b82bfcf72bbb6f5763c15ea

const userSchema=new Schema({
    username: { type: String, unique: true, required: true },
  
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
        role: {
        type: String,
        enum: ['user', 'admin'], // Specify possible roles
        default: 'user', // Set a default role if none is provided
    },
});
const User=mongoose.model('User',userSchema);
module.exports=User;