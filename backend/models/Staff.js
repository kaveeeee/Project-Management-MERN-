const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    empno:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    allocation:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Staff',staffSchema);