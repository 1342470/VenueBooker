const express = require('express');
const fs = require('fs');
let venueList = './data/venues.json';

const router = express.Router();

router.get('/', (_, res) => {
    res.render('addVenue', {
        title: 'New venue',
        username: res.locals.username
    });
});

router.post('/addVenue', (req, res) => {
    let id = Math.floor(Date.now() / 4);
    let title = req.body.title;
    let img = req.body.img;
    let short = req.body.short;
    let bullets = req.body.bullets;
    let long = req.body.long;

    let obj = { id, title, img, short, bullets, long };
    //write post from values from above to file
    fs.readFile(venueList, (err, data) => {
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
                return fs.writeFile(venueList, JSON.stringify(fileData), error => console.error(error))

                // if any exception happen log to console
            } catch (exception) {
                console.error(exception);
            }
        }
    });
    res.redirect('/Success');
});

module.exports = router;