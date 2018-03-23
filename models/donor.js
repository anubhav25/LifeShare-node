var mongoose = require('mongoose');
var donorSchema = new mongoose.Schema({
    email: {
        type: String,
        required : true
    },

    name: {
        type: String,
        required: true
    },

    DOB: {
        date : {
            type : Number,
            required : true
        },
        month : {
            type : Number,
            required : true
        },
        year : {
            type : Number,
            required : true
        }
    },
    BloodGroup : {
        type: String,
        required: true

    },
    documentFront :{
        type: String,
        required: true
    },
    documentBack :{
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
module.exports = mongoose.model('donors', donorSchema);