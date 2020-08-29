const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    request : {type:mongoose.Types.ObjectId, ref:'request', required:true},
    seller: { type:mongoose.Types.ObjectId, ref:'user', required:true },
    messages : [{type:Object}]
})

module.exports = mongoose.model('room', roomSchema);