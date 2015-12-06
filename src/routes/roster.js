"use strict";

const request = require('request');
const cheerio = require('cheerio');

/* valid shows with rosters */
const shows = [
    'halloffame',
    'wwealumni',
    'wcw-alumni',
    'ecw-alumni',
    'raw',
    'smackdown',
    'nxt'
];

cache.roster = {};

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

exports.show = (req, res, next) => {
    /* if invalid show, return bad request */
    if (shows.indexOf(req.params.show) < 0) {
        return res.send(400);
    }

    /* if missing show data, return not found */
    if (!cache.roster[req.params.show].length) {
        return res.send(404);
    }

    res.send(cache.roster[req.params.show]);
};

(() => {
    shows.forEach((show) => {
        cache.roster[show] = [];
    });

    request('http://www.wwe.com/superstars', (err, res, body) => {
        if (res.statusCode != 200) return;
        let $ = cheerio.load(body);

        $('.star:not(.champions-group)').each((i, elem) => {
           let $superstar = $(elem);

           if (!$superstar.attr('class')) return true;

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
})();