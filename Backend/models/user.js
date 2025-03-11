const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },    
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Credits:{
        type : Number ,
        required : true,
        default : 100 
    },


});

module.exports = mongoose.model('User', userSchema);