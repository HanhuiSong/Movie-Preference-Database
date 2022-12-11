/*
 * Connect all of your endpoints together here.
 */
var { getMovies } = require('./movies');


module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/movies', require('./movies.js')(router));
    app.use('/api/users', require('./user')(router));
    app.use('/api/detail', require('./detail.js')(router));
    app.use('/api/reletive', require('./reletive.js')(router));
    app.use('/api/signin', require('./signin')(router));
    app.use('/api/signup', require('./signup')(router));
    app.use('/api/reviews', require('./review')(router));
};
