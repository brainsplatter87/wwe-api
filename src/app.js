"use strict";

var restify = require('restify');

var server = restify.createServer({
    name: 'wwe-api',
    version: '1.0.0'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

global.cache = {};

var superstars = require('./routes/superstars');
var shows = require('./routes/shows');
var roster = require('./routes/roster');

server.get('/superstar/:superstar', superstars.superstar);
server.get('/show/:show', shows.show);
server.get('/roster/:show', roster.show);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});