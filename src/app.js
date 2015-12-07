"use strict";

const restify = require('restify');

const server = restify.createServer({
    name: 'wwe-api',
    version: '1.0.0'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

global.cache = {};

const superstars = require('./routes/superstars');
const shows = require('./routes/shows');
const roster = require('./routes/roster');

server.get('/superstar/:superstar', superstars.superstar);
server.get('/show/:show', shows.show);
server.get('/roster/:show', roster.show);

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});