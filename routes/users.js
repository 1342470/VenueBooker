const express = require('express');
const router = express.Router();

const fs = require('fs');

let message = "";

//requrie the jsonfile
const data = require('../data/data.json');
var file = './data/data.json';

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

    router.get('/failed', (req, res) => {
        message = "failed to add User";
        res.redirect('/users');
    });

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
    const user = data.find(user => user.id);
    res.render('user', {
        title: 'User: ' + user.first_name,
        user: user,
        nextUser: user.id + user.id <= data.length ? user.id + 1 : null,
        back: req.headers['referer']
    });
});

router.post('update/:id', (req, res) => {
    res.redirect('/users');
});

router.get('/delete/:id', (req, res) => {
    const user = data.find(user => user.id);
    res.render('delete', {
        title: 'Delete User: ' + user.first_name,
        user: user,
        back: req.headers['referer']
    });
});

router.get('/create', (req, res) => {
    res.render('newUser', {
        title: 'new user',
        back: req.headers['referer']
    });
});


router.post('/create', (req, res) => {
    //get all form values form request
    var id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var contact = req.body.contact;
    var gender = req.body.gender;
    var venue = req.body.venue;
    var date = req.body.date;

    var obj = {id:id,first_name:first_name,last_name:last_name,contact:contact,gender:gender,date:date,venue:venue};
    //write post from values from above to file
    fs.readFile(file, (err, data) => {
        if (err) {
            // console error
            console.error(err);
        }
        //if no errors are found try writing data to file
        else {
            try {
                const fileData = JSON.parse(data);

                //Append object 
                fileData.push(obj);

                //Write to file data.json
                return fs.writeFile(file, JSON.stringify(fileData), error => console.error)
            
            // if any exception happen log to console
            } catch (exception) {
                console.error(exception);
            }
        }
    });
    res.redirect('/users');
});

router.post('/', (req, res) => {
    res.redirect('/users');
});

module.exports = router;