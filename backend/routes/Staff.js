const express = require('express');
const Staff = require('../models/Staff');

const router = express.Router();

// save
router.post('/save', async (req, res) => {
    try {
        let newStaff = new Staff(req.body);
        await newStaff.save();
        return res.status(200).json({
            success: "Staff member saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});



router.get('/all', async (req, res) => {
    try {
        const staff = await Staff.find();
        return res.status(200).json(staff);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Get specific staff member by ID
router.get('/:id', async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) {
            return res.status(404).json({ error: "Staff member not found" });
        }
        return res.status(200).json(staff);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Delete staff member by ID
router.delete('/:id', async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) {
            return res.status(404).json({ error: "staff member not found" });
        }
        return res.status(200).json({ success: "staff member deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Update staff member by ID
router.put('/:id', async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!staff) {
            return res.status(404).json({ error: "Staff member not found" });
        }
        return res.status(200).json({ success: "Staff member updated successfully", staff });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
