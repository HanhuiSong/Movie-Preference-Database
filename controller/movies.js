var moviesSchema = require('../models/movies'),
    mongoose = require('mongoose');


const getMovies = async (req, res) => {

    try {

        const movies = await moviesSchema.find();
        res.status(200).json({'data': movies});

    } catch (error) {
        res.status(500).json({'message': error.message});
    }
}
const postMovies = async (req, res) => {
    let newMovie = new moviesSchema({
        adult: req.body.adult,
        genre_ids: req.body.genre_ids,
        original_language: req.body.original_language,
        title: req.body.title,
        overview: req.body.overview,
        popularity: req.body.popularity,
        poster_path: req.body.poster_path,
        release_date: req.body.release_date,
        vote_average: req.body.vote_average,
    });

    await newMovie.save().then(function (movies) {
        res.status(201).send(JSON.stringify({message: "OK", data: movies}));
    })
}

module.exports = {
    getMovies,
    postMovies
}
