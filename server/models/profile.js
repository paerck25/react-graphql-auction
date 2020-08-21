const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    user : {type : mongoose.Types.ObjectId, ref : 'user', required : true},
    phone : {type:String},
    profileImage : {type:String},
    exampleImages : [{type : String}],
    text : {type : String},
    reviews : [{type:Object}],
})

module.exports = mongoose.model('profile',profileSchema);