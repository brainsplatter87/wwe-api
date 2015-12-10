"use strict";

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
    if (global.shows.indexOf(req.params.show) < 0) {
        return res.send(400);
    }

    /* if missing show data, return not found */
    if (!cache.roster[req.params.show].length) {
        return res.send(404);
    }

    res.send(cache.roster[req.params.show]);
};
