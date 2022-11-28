// Load required packages
var mongoose = require('mongoose');
var PlayList = require('./playList');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    watchList: [{type: mongoose.Schema.Types.ObjectId, ref: 'PlayList'}],
    // comment: [{ type: Schema.Types.ObjectId, ref: 'Comments'}]
});

// Export the Mongoose model
module.exports = mongoose.model('user', UserSchema);
