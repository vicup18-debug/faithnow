const mongoose = require('mongoose');

const SoulSchema = new mongoose.Schema({
  // Who won this soul? (Links to the User)
  evangelist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // The convert's details
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is needed for follow-up']
  },
  // Spiritual Status
  status: {
    type: String,
    enum: ['Saved', 'Holy Ghost Baptized', 'Interested', 'Not Interested'],
    default: 'Saved'
  },
  // Location Mapping (for that "Map of Impact")
  location: {
    type: {
      type: String,
      enum: ['Point'], 
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [Longitude, Latitude]
      index: '2dsphere' // vital for map queries
    }
  },
  // Follow-up notes
  notes: {
    type: String,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Soul', SoulSchema);