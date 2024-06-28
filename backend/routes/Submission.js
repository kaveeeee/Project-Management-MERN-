// assignment.js route
const express = require('express');
const multer = require('multer'); // For file upload
const path = require('path');
const fs = require('fs');
const assignmentRoutes = express.Router();

let Assignment = require('../models/Submission');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'submissionuploads/'); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original filename
    }
});

const upload = multer({ storage: storage });

assignmentRoutes.route('/add').post(upload.single('attach_file'), function (req, res) {
    let assignment = new Assignment(req.body);
    assignment.attach_file = req.file.path; // Save file path to database
    assignment.save()
        .then(assignment => {
            res.status(200).json({ 'assignment': 'assignment added successfully' })
        })
        .catch(err => {
            res.status(400).send("Unable to save");
        });
});

assignmentRoutes.route('/').get(function (req, res) {
    Assignment.find()
        .then(assignments => {
            res.json(assignments);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error fetching assignments");
        });
});

// Delete Assignment
assignmentRoutes.route('/delete/:id').get(function (req, res) {
    Assignment.findByIdAndRemove(req.params.id)
        .then(assignment => {
            if (!assignment) {
                return res.status(404).send("Assignment not found");
            }
            if (assignment.attach_file) {
                // Remove uploaded file if exists
                fs.unlinkSync(assignment.attach_file);
            }
            res.json('Successfully removed');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error deleting assignment");
        });
});

module.exports = assignmentRoutes;
