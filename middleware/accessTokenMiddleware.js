const { verifyAccessToken } = require('../data/functions/security.js');
/**
 * Check the access token and redirect to login if it is invalid
 * 
 * @param {Object} req is the request sent the login form
 * @param {Object} res is the responce that it will be sent back after the req has been handled
 * @param {Function} next if the response is succesfull it will send the user to the next part of the applutaion
 */
const accessTokenMiddleware = (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split('=')[1];
        if (token) {
            try {
                const decoded = verifyAccessToken(token);
                res.locals.username = decoded.username;
                next();
            } catch (err) {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = accessTokenMiddleware;