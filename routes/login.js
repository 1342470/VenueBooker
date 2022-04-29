const express = require('express');
const router = express.Router();
const checkPassMiddleware = require('../middleware/checkPassword.js');
let message = "";
const { verifyAccessToken } = require('../data/functions/security.js');

// define path for if a user incorrect enters and set message to show incorrect credentals and then redirect the user back to login page
router.get('/failed', (req, res) => {
    message = "failed to login";
    res.redirect('/login');
});

// define path for logout, set message to show user they have logged out and redirect them back to login page
router.get('/logged-out', (req, res) => {
    message = "Logged out";
    res.redirect('/login');
});

// define home path 
router.get('/', (req, res) => {
    const currentMessage = message;
    message = "";
    if (req.headers.cookie) {
        const token = req.headers.cookie.split('=')[1];
        if (token) {
            const decoded = verifyAccessToken(token);
            if (decoded.username === "admin" || decoded.username === "user") {
                res.redirect('/users');
            } else {
                res.render('login', { message: currentMessage });
            }
        }
    } else {
        res.render('login', { message: currentMessage });
    }


});

router.post('/', checkPassMiddleware, (req, res) => {

    res.redirect('/users');
});

module.exports = router;