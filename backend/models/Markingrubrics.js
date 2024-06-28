// assignment.js model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Markingrubrics = new Schema({
    title: {
        type: String
    },
    description: {
        type: String,
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
    collection: 'markingrubrics' // Corrected typo in collection name
});

module.exports = mongoose.model('Markingrubrics', Markingrubrics);
