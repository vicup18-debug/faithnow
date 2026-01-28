// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies

// Database Connection
const uri = process.env.MONGO_URI; 
// We will set up the connection string in the next step

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Database Connected Successfully!"))
    .catch(err => console.log("❌ Database Connection Error: ", err));

// Basic Route to Test Server
app.get('/', (req, res) => {
    res.send("Evangelism Platform API is Running...");
});

// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});