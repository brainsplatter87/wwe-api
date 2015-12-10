"use strict";

const request = require('request');
const cheerio = require('cheerio');

// fetch roster
(() => {
    cache.roster = {};
    global.shows.forEach((show) => {
        cache.roster[show] = [];
    });

    request('http://www.wwe.com/superstars', (err, res, body) => {
        if (res.statusCode != 200) return;
        let $ = cheerio.load(body);

        $('.star:not(.champions-group)').each((i, elem) => {
            let $superstar = $(elem);

            if (!$superstar.attr('class')) return true;

            $superstar.attr('class').split(' ').forEach((show) => {
                if (global.shows.indexOf(show) > -1) {
                    cache.roster[show].push({
                        name: $superstar.find('a').attr('title').trim(),
                        image: $superstar.find('img').data('fullsrc')
                    });
                }
            });
        });
    });
})();