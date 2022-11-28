/*
 * Connect all of your endpoints together here.
 */
var { getMovies } = require('./movies');


module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/movies', require('./movies.js')(router));
};
