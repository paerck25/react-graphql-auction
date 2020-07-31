const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    request : {type:mongoose.Schema.Types.ObjectId, ref:'request', required:true},
    seller: { type:mongoose.Schema.Types.ObjectId, ref:'user', required:true },
    messages : [{type:Object}]
})

module.exports = mongoose.model('room', roomSchema);