const express = require('express');
const router = express.Router();

const data = require('../data/data.json');
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const start = (page - 1) * limit;
    const end = parseInt(start) + limit;
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder || 'asc';
    const total = data.length;
    const sortedData = data.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });
    const userData = sortedData.slice(start, end);
    const pages = Math.floor(total / limit);

    res.render('users', {
        title: 'Users',
        content: 'Welcome to the users page',
        username: res.locals.username,
        users: userData,
        page: page,
        pages: pages,
        nextPage: page < pages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        sortBy: sortBy,
        sortOrder: sortOrder,
        limit: limit,
        startNum: start + 1,
        endNum: end,
        total: total
    });
});

router.get('/view/:id', (req, res) => {
    const user = data.find(user => user.id === parseInt(req.params.id));
    res.render('user', {
        title: 'User: ' + user.first_name,
        user: user,
        nextUser: user.id + 1 <= data.length ? user.id + 1 : null,
        back: req.headers['referer']
    });
});

router.post('update/:id', (req, res) => {
    res.redirect('/users');
});

router.post('delete/:id', (req, res) => {
    res.redirect('/users');
});

router.get('/create/', (req, res) => {
    res.send('index');
});


router.post('create', (req, res) => {
    res.redirect('/users');
});



module.exports = router;