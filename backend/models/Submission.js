// assignment.js model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Submission = new Schema({
    name: {
        type: String
    },
    reg_number: {
        type: String,
    },
    semester: {
        type: String
    },
    year: {
        type: String
    },
    specialization: {
        type: String
    },
    intake: {
        type: String
    },
    calender_year: {
        type: String
    },
    group_number: {
        type: String
    },
    report_type: {
        type: String
    },
    title: {
        type: String
    },
    attach_file: {
        type: String // You can store file path here
    }
}, {
    collection: 'submission' // Corrected typo in collection name
});

module.exports = mongoose.model('Submission', Submission);
