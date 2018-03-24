var mongoose = require('mongoose');
var bloodBankSchema = new mongoose.Schema({
       email: {
        type: String,
        required : true
    },
    phoneNo :{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address : {
        type: String,
        required : true
    },
    document :{
        type: String,
        required: true
    },

    longitude : {
        type: Number,
        default : 0
    },
    latitude : {
        type: Number,
        default : 0
    }

});
module.exports = mongoose.model('bloodBanksRequest', bloodBankSchema);