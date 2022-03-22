const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {
    res.render('success', {
        title: 'Success',
        username: res.locals.username
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login/logged-out');
});

module.exports = router;