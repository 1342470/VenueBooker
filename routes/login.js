const express = require('express');
const router = express.Router();
const checkPassMiddleware = require('../middleware/checkPassword.js');
let message ="";

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
    res.render('login', {message:currentMessage});
});

router.post('/',checkPassMiddleware, (req, res) => {
    res.redirect('/test');
});

module.exports = router;