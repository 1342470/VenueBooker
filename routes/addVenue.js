const express = require('express');
const fs = require('fs');
const data = require('../data/venues.json');
var venueList = './data/venues.json';

const router = express.Router();

router.get('/',  (req, res) => {
    res.render('addVenue', {
        title: 'New venue',
        username: res.locals.username
    });
});

router.post('/addVenue', (req, res) => {
    var id = Date.now()/4;
    var title = req.body.title;
    var img = req.body.img;
    var short = req.body.short;
    var bullets = req.body.bullets;
    var long = req.body.long;

    var obj = {id:id,title:title,img:img,short:short,bullets:bullets,long:long};
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
                return fs.writeFile(venueList, JSON.stringify(fileData), error => console.error)
            
            // if any exception happen log to console
            } catch (exception) {
                console.error(exception);
            }
        }
    });
    res.redirect('/Success');
});

module.exports = router;