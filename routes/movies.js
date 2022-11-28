var express = require('express'),
    { getMovies } = require('../controller/movies.js');

module.exports = function (router) {

  var route = router.route('/movies');
  route.get(getMovies);

  return router;
}


