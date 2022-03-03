const { handleSubmit } = require('../functions/addUser.js');

const addUserMiddleware = (req, res, next) => {
    try {
        handleSubmit(Event);
        next();
    } catch (err) {
        res.redirect('/users/Failed');
    }
};

module.exports = accessTokenMiddleware;