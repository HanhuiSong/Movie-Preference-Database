var { getMovieByGenre } = require('../controller/movies');
// var secrets = require('../config/secrets');

module.exports = function (router) {
    var route = router.route('/reletive/:id');
    route.get(getMovieByGenre)
    return router;
}