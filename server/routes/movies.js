var express = require('express'),
    { getMovies } = require('../controller/movies.js');
const {postMovies, searchMovies} = require("../controller/movies");

module.exports = function (router) {

  var route = router.route('/movies');
  route.get(getMovies);
  route.post(postMovies);

  var search = router.route('/movies/:content');
  search.get(searchMovies);
  return router;
}


