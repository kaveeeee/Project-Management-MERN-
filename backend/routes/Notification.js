const express = require('express');
const Notifications = require('../models/Notification');

const router = express.Router();

// save
router.post('/save', async (req, res) => {
    try {
        let newNotification = new Notifications(req.body);
        await newNotification.save();
        return res.status(200).json({
            success: "Notification saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});



router.get('/all', async (req, res) => {
    try {
        const notifications = await Notifications.find();
        return res.status(200).json(notifications);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Get specific notification by ID
router.get('/:id', async (req, res) => {
    try {
        const notification = await Notifications.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        return res.status(200).json(notification);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Delete notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const notification = await Notifications.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        return res.status(200).json({ success: "Notification deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Update notification by ID
router.put('/:id', async (req, res) => {
    try {
        const notification = await Notifications.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        return res.status(200).json({ success: "Notification updated successfully", notification });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
