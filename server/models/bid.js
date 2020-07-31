const mongoose = require('mongoose');

let bidSchema = mongoose.Schema({
    request : {type:mongoose.Schema.Types.ObjectId, ref:'request', required:true}, // 어느 리퀘스트인지 request의 ObjectID
    author : {type:mongoose.Schema.Types.ObjectId, ref:'user'}, // 누가 입찰 했는가 판매자의 ObjectID
    price : {type:String, required:true}, //가격
    state : {type:Boolean, default : false},
});


module.exports = mongoose.model('bid', bidSchema );