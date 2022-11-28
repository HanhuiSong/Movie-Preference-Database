var express = require('express'),
    { getMovies } = require('../controller/movies.js');
const {postMovies} = require("../controller/movies");

module.exports = function (router) {

  var route = router.route('/movies');
  route.get(getMovies);
  route.post(postMovies);
  return router;
}


