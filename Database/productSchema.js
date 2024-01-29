const mongoose=require('mongoose');

const User_Schema=new mongoose.Schema(
    {
        name:String,
        price:String,
        Quantity:Number,
        category:String,
        pid:String,
        company:String
    }
);

module.exports=mongoose.model('products',User_Schema);