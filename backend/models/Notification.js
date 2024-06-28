const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Notification',notificationSchema);