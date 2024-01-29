const mongoose=require('mongoose');

const User_Schema=new mongoose.Schema(
    {
        buyer_id:String,
        name:String,
        price:String,
        pid:String,
        company:String,
        status:String
    }
);

module.exports=mongoose.model('orders',User_Schema);