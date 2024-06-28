// assignment.js model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Assignment = new Schema({
    course: {
        type: String
    },
    assignment_name: {
        type: String,
    },
    deadline: {
        type: String
    },
    applicable_year: {
        type: String
    },
    applicable_semester: {
        type: String
    },
    attach_file: {
        type: String // You can store file path here
    }
}, {
    collection: 'assignment' // Corrected typo in collection name
});

module.exports = mongoose.model('Assignment', Assignment);
