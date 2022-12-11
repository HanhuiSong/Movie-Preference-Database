var { getMovieById } = require('../controller/movies');
// var secrets = require('../config/secrets');

module.exports = function (router) {
    var route = router.route('/detail/:id');
    route.get(getMovieById)
    return router;
}