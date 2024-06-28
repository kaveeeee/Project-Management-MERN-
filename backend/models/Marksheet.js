const mongoose = require('mongoose');

const marksheetSchema = new mongoose.Schema({
    year:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    intake:{
        type:String,
        required:true
    },
    callender_year:{
        type:String,
        required:true
    },
    group_number:{
        type:String,
        required:true
    },
    registration_number:{
        type:String,
        required:true
    },
    report_typw:{
        type:String,
        required:true
    },
    student_name:{
        type:String,
        required:true
    },
    marks:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('Marksheet',marksheetSchema);