const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    pwd : {type : String, required : true},
    is_seller : {type : Boolean, required : true},
    profile : {type : mongoose.Types.ObjectId, ref : 'profile'},
})

module.exports = mongoose.model('user',userSchema);