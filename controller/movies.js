var moviesSchema = require('../models/movies'),
 mongoose = require('mongoose');


const getMovies = async (req, res) => {

  try {

    const task = await mongoose.model().save();

    return res.status(200).json({ 'data': task });

  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}

module.exports = {
  getMovies
}
