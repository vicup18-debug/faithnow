const express = require('express');
const router = express.Router();
const Soul = require('../models/Soul');
// Assuming we have middleware that checks if user is logged in
const { protect } = require('../middleware/auth'); 

// @desc    Get all souls won by the logged-in user
// @route   GET /api/souls
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // Find souls where the 'evangelist' matches the logged-in user's ID
    const souls = await Soul.find({ evangelist: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: souls.length,
      data: souls
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @desc    Log a new soul
// @route   POST /api/souls
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    // Add the logged-in user's ID to the data body
    req.body.evangelist = req.user.id;

    // Create the soul in the database
    const soul = await Soul.create(req.body);

    res.status(201).json({
      success: true,
      data: soul,
      message: 'Glory to God! Soul successfully logged.'
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
});

module.exports = router;