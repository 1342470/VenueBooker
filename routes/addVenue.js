const express = require('express');
const fs = require('fs');
const venueList = JSON.parse(fs.readFileSync('./data/venues.json',"UTF8"));
const router = express.Router();

router.get('/',  (req, res) => {
    res.render('addVenue', {
        title: 'New venue',
        username: res.locals.username
    });
});

router.post('/addVenue', (req, res) => {
    var id = file.length+1;
    var title = req.body.title;
    var img = req.body.last_name;
    var short = req.body.contact;
    var bullets = req.body.gender;
    var long = venueList[1].title;

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