const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    user : {type : mongoose.Types.ObjectId, ref : 'user', required : true},
    image : {type : String},
    text : {type : String},
})

module.exports = mongoose.model('profile',profileSchema);