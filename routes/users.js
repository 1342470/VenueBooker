const express = require('express');
const router = express.Router();
const fs = require('fs');

let message = "";

//require the jsonfile
//const file = './data/data.json';
const data = async () => {
    const file = fs.readFileSync('./data/data.json',"utf8");
    const data = JSON.parse(file);
    JSON.stringify(file);
    console.log(typeof data);
    return data;
}

//const data = require('../data/data.json');
const VenuesData = require('../data/venues.json')
const removeFunction = require('../data/functions/removeById.js');
const updateFunction = require('../data/functions/updateByid.js');
const async = require('hbs/lib/async');


router.get('/', async (req, res) => {
    const total = data().length;
    const limit = parseInt(req.query.limit)<total?parseInt(req.query.limit):total;
    const page = parseInt(req.query.page) || 1;
    const start = (page - 1) * limit;
    const end = parseInt(start) + limit;
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder || 'asc';
    const sortedData = data().sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });
    const userData = sortedData.slice(start, end);
    const pages = Math.floor(total / limit)||1;

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

router.get('/view/:id', async (req, res) => {
    const user = data().find(user => user.id === parseInt(req.params.id));
    res.render('user', {
        title: 'User: ' + user.first_name,
        user: user,
        nextUser: user.id + user.id <= data().length ? user.id + 1 : null,
        back: req.headers['referer']
    });
});

router.get('/update/:id', async (req, res) => {
    const user = data().find(user => user.id);
    res.render('updateUsers', {
        title: 'Updating  veneu: ' + user.title,
        back: req.headers['referer']
    });
    console.log(user)
});

router.post('/update/', (req, res) => {
    let id = req.body.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let contact = req.body.contact;
    let gender = req.body.gender;
    let venue = req.body.venue;
    let date = req.body.date;
    let timeSlot = req.body.timeSlot;

    fs.readFile(file, (err, data) => {
        if (err) {
            // console error
            console.error(err);
        }
        //if no errors are found try writing data to file
        else {
            try {
                const fileData = JSON.parse(data);
                //envoke function from imported module
                updateFunction.updateByid(id,first_name,last_name,contact,gender,date,venue,timeSlot,data)
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

router.get('/delete/:id', async(req, res) => {
    const user = data().find(user => user.id);
    res.render('delete', {
        title: 'Delete User: ' + user.first_name,
        user: user,
        back: req.headers['referer']
    });
});

router.post('/delete', (req, res) => {
    const id = req.body.id;
    console.log(id);

    fs.readFile(file, (err, data) => {
        if (err) {
            // console error
            console.error(err);
        }
        //if no errors are found try writing data to file
        else {
            try {
                const fileData = JSON.parse(data);
                //envoke function from imported module
                removeFunction.removeById(fileData, id);
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

router.get('/create', (req, res) => {
    res.render('newUser', {
        title: 'new user',
        back: req.headers['referer']
    });
});


router.post('/create', (req, res) => {
    //get all form values form request
    let id = req.body.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let contact = req.body.contact;
    let gender = req.body.gender;
    let venue = req.body.venue;
    let date = req.body.date;

    let obj = { id, first_name, last_name, contact, gender, date, venue };
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