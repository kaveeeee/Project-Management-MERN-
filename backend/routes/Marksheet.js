const express = require('express');
const Marksheet = require('../models/Marksheet');

const router = express.Router();

// save
router.post('/save', async (req, res) => {
    try {
        let newMarksheet = new Marksheet(req.body);
        await newMarksheet.save();
        return res.status(200).json({
            success: "newMarksheet saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});



router.get('/all', async (req, res) => {
    try {
        const marksheet = await Marksheet.find();
        return res.status(200).json(marksheet);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Get specific notification by ID
router.get('/:id', async (req, res) => {
    try {
        const marksheet = await Marksheet.findById(req.params.id);
        if (!marksheet) {
            return res.status(404).json({ error: "marksheet not found" });
        }
        return res.status(200).json(marksheet);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Delete notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const marksheet = await Marksheet.findByIdAndDelete(req.params.id);
        if (!marksheet) {
            return res.status(404).json({ error: "Marksheet not found" });
        }
        return res.status(200).json({ success: "Marksheet deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Update notification by ID
router.put('/:id', async (req, res) => {
    try {
        const marksheet = await Marksheet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!marksheet) {
            return res.status(404).json({ error: "MarkSheet not found" });
        }
        return res.status(200).json({ success: "MarkSheet updated successfully", marksheet });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
