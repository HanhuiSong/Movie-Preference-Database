// Load required packages
var mongoose = require('mongoose');
var Comment = require('./comment');

// Define our user schema
var MoviesSchema = new mongoose.Schema({
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    adult: Boolean,
    genre_ids: {type:[Number], default: []},
    original_language: String,
    title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: Date,
    vote_average: Number,
});

// Export the Mongoose model
module.exports = mongoose.model('movies', MoviesSchema);
