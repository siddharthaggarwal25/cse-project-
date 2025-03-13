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
    Credit:{
        type : Number ,
        required : true,
        default : 100 
    },
    Notification :[
         {
            type: String ,
         }
    ]
});

module.exports = mongoose.model('User', userSchema);