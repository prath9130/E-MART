const mongoose=require('mongoose');

const User_Schema=new mongoose.Schema(
    {
        u_name:String,
        u_email:String,
        u_pass:String,
        u_role:String
    }
);

module.exports=mongoose.model('users',User_Schema);