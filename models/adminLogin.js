var mongoose = require('mongoose');
var adminLoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true
    },

    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('adminLogin', adminLoginSchema);