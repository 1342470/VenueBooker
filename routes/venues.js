const express = require('express');
const router = express.Router();
const fs = require('fs');
const { title } = require('process');
let file = './data/data.json';
const data = require('../data/venues.json')
const venueFile='../data/venues.json'
let venueList = JSON.parse(fs.readFileSync('./data/venues.json',"UTF8"));
const removeFunction = require('../data/functions/removeById.js');


function updateVenueList() {
    venueList = JSON.parse(fs.readFileSync('./data/venues.json',"UTF8"));
}


/**
 * defines the path of the page as well as some of the content that is displayed on the page
 */
router.get('/',  (req, res) => {
    updateVenueList();
    res.render('venues', {
        title: 'Venues',
        content: 'Venues follow the instuctions below to start booking your next venues',
        username: res.locals.username,
        venues:venueList
    });
});


router.get('/book/:id',  (req, res) => {
    const bookedVenue = venueList.find(venue=>venue.id===Number(req.params.id))
    res.render('booking', {
        title: 'Booking',
        username: res.locals.username,
        venue:bookedVenue
    });
});

router.get('/data', (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const start = (page - 1) * limit;
    const end = parseInt(start) + limit;
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder || 'asc';
    const total = venueList.length;
    const sortedData = venueList.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });
    const venue = sortedData.slice(start, end);
    const pages = Math.floor(total / limit);

    res.render('venuesInfo', {
        title: 'Venue Info',
        username: res.locals.username,
        users: venue,
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

router.get('/success',  (req, res) => {
    res.render('Success', {
        title: 'Success',
        username: res.locals.username
    });
});
router.post('/bookVenue', (req, res) => {
    let id = Date.now()/4;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let contact = req.body.contact;
    let gender = req.body.gender;
    let venue = req.body.venue;
    let timeSlot = req.body.timeSlot
    let date =  Date.now();

    let obj = {id,first_name,last_name,contact,gender,date,venue,timeSlot}; 

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
    res.redirect('/success');
});


router.get('/delete/:id', (req, res) => {
    const venueDel = data.find(venues => venues.id);
    res.render('deleteVenue', {
        title: 'Delete Venue: ' + venueDel.title,
        user: venueDel,
        back: req.headers['referer']
    });
});

router.post('/delete', (req, res) => {
    const id = req.body.id;
    console.log(id);

    fs.readFile(venueFile, (err, data) => {
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
                return fs.writeFile(venueFile, JSON.stringify(fileData), error => console.error)
                // if any exception happen log to console
            } catch (exception) {
                console.error(exception);
            }
        }
    });

    res.redirect('/venues/data');

});


module.exports = router;