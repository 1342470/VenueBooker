const express = require('express');
const router = express.Router();

/**
 * defines the path of the page as well as some of the content that is displayed on the page
 */
router.get('/',  (req, res) => {
    res.render('test', {
        title: 'test',
        content: 'elow to startues',
        username: res.locals.username
    });
});


module.exports = router;