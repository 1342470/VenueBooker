const { handleSubmit } = require('../functions/addUser.js');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const addUserMiddleware = (req, res, next) => {
    try {
        handleSubmit(Event);
        next();
    } catch (err) {
        res.redirect('/users/Failed');
    }
};

module.exports = accessTokenMiddleware;