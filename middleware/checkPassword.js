const { generateAccessToken,checkPass } = require('../functions/security.js');

const checkPassMiddleware = (req, res, next) => {
    const { username, password } = req.body;
    if (checkPass(username, password)) {
        const token = generateAccessToken(username);
        res.cookie('token', token);
        next();
    } else {
        res.redirect('/login/failed');
    }
};
module.exports = checkPassMiddleware;