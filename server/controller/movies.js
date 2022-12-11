var moviesSchema = require('../models/movies'),
    mongoose = require('mongoose');


const getMovies = async (req, res) => {
    let limit = eval("(" + req.query.limit + ")");
    try {

        const movies = await moviesSchema.find().limit(limit);
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
const searchMovies = async (req, res) => {
    try {
        let limit = eval("(" + req.query.limit + ")");
        const searchContent = req.params.content;
        const regex = new RegExp(searchContent,'i');
        const movies = await moviesSchema.find({$or:[
                {title:{$regex:regex}},
                {overview:{$regex:regex}}
            ]}).limit(limit);
        res.status(200).json({'data': movies});
    }catch (err){
        res.status(500).json({'message': err.message});
    }
}
const getMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await moviesSchema.find({_id: id});
        res.status(200).json({'data': movie});
    } catch (err) {
        console.log(err);
        res.status(500).json({'message': err.message});
    }
}
const getMovieByGenre = async (req, res) => {
    try {
        const genreId = req.params.id;
        console.log(req.params);
        const movie = await moviesSchema.find({genre_ids:{$eq:genreId}}).limit(6);
        res.status(200).json({'data': movie})
    } catch (err) {
        res.status(500).json({'message': err.message});
    }

}
module.exports = {
    getMovies,
    postMovies,
    searchMovies,
    getMovieById,
    getMovieByGenre
}
