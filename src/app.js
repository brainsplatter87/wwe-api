var restify = require('restify');

var server = restify.createServer({
    name: 'wwe-api',
    version: '1.0.0'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

var superstars = require('./routes/superstars');
var shows = require('./routes/shows');

server.get('/superstar/:slug', superstars.superstar);
server.get('/show/:slug'. shows.show);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});