const express = require('express');
const router = express.Router();
const fs = require('fs');
var file = './data/data.json';
/**
 * defines the path of the page as well as some of the content that is displayed on the page
 */
router.get('/',  (req, res) => {
    res.render('venues', {
        title: 'Venues',
        content: 'Venues follow the instuctions below to start booking your next venues',
        username: res.locals.username
    });
});


router.get('/book',  (req, res) => {
    res.render('booking', {
        title: 'Booking',
        username: res.locals.username
    });
});

router.get('/Success',  (req, res) => {
    res.render('Success', {
        title: 'Success',
        username: res.locals.username
    });
});
router.post('/venue1', (req, res) => {
    var id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var contact = req.body.contact;
    var gender = req.body.gender;
    var venue = "Hansleton";
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
    res.redirect('/Success');
});

router.post('/venue1', (req, res) => {
    res.redirect('/users');
});

router.post('/venue1', (req, res) => {
    res.redirect('/users');
});

router.post('/venue1', (req, res) => {
    res.redirect('/users');
});

router.post('/venue1', (req, res) => {
    res.redirect('/users');
});



module.exports = router;