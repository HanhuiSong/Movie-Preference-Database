// Load required packages
const mongoose = require('mongoose');

// Define our user schema
const ReviewSchema = new mongoose.Schema({
    userID: {type: String, default: ""},
    userName: {type: String, default: "unassigned"},
    movieID: {type: String, default: ""},
    content: String,
    title: String,
    dateCreated: {type: Date, default: Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('Review', ReviewSchema);
