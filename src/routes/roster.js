"use strict";

var request = require('request');
var cheerio = require('cheerio');

/* valid shows with rosters */
var shows = [
    'halloffame',
    'wwealumni',
    'wcw-alumni',
    'ecw-alumni',
    'raw',
    'smackdown',
    'nxt'
];

cache.roster = {};
warmup();

/**
 * URL Example: /roster/raw
 * Available Rosters:
 *  - Hall of Fame (halloffame)
 *  - WWE Alumni (wwealumni)
 *  - WCW Alumni (wcw-alumni)
 *  - ECW Alumni (ecw-alumni)
 *  - Raw (raw)
 *  - Smackdown (smackdown)
 *  - NXT (nxt)
 */

exports.show = function(req, res, next) {
    /* if invalid show, return bad request */
    if (shows.indexOf(req.params.show) > -1) {
        return res.send(400);
    }

    /* if missing show data, return not found */
    if (!cache.roster[req.params.show].length) {
        return res.send(404);
    }

    res.send(cache.roster[req.params.show]);
};

function warmup() {
    shows.forEach((show) => {
        cache.roster[show] = [];
    });

    request('http://www.wwe.com/superstars', (err, res, body) => {
        if (res.statusCode != 200) return;
        let $ = cheerio.load(body);
        $('.star:not(.champions-group)').each((i, elem) => {
           let $superstar = $(this);

           $superstar.attr('class').split(' ').forEach((show) => {
               if (shows.indexOf(show) > -1) {
                   cache.roster[show].push({
                       name: $superstar.find('a').attr('title').trim(),
                       image: $superstar.find('img').data('fullsrc')
                   });
               }
           });
        });
    });
}