// Load required packages
var mongoose = require('mongoose');
var User = require('./user');
var Movies = require('./movies');

// Define our user schema
var PlayListSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movieID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }],
});

// Export the Mongoose model
module.exports = mongoose.model('playList', PlayListSchema);
