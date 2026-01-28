// backend/models/SoulLog.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const soulLogSchema = new Schema({
    evangelistName: { type: String, required: true }, // The user who won the soul
    soulName: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    location: { type: String, required: false }, // For Geotagging later
    status: { 
        type: String, 
        enum: ['Preached To', 'Saved', 'Holy Ghost Filled', 'Joined Church'],
        default: 'Preached To'
    },
    notes: { type: String },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true,
});

const SoulLog = mongoose.model('SoulLog', soulLogSchema);

module.exports = SoulLog;