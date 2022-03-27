const express = require('express');
const exphbs = require('express-handlebars');
var imagesDir = require('path').join(__dirname,'/Images'); 
const accessTokenMiddleware = require('./middleware/accessTokenMiddleware');

const app = express();


//constants that the app will use to import the files that are required.
const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const successRouter = require('./routes/success');
const venues = require('./routes/venues');

//defines middleware function imports 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//once all required files are defined above next the app must let express which pages will be used in the app
app.use('/', indexRouter);
app.use('/users', accessTokenMiddleware, usersRouter);
app.use('/venues', accessTokenMiddleware, venues)
app.use('/login',loginRouter)
app.use('/success',successRouter);

//use path defined to allow access to images
app.use(express.static(imagesDir));

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars',
    helpers: require('./config/hbs')
});

// defines how the express will render the app using handlebars 
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

//once server has successfully started it will print a success menu in the console
app.listen(5000, () => {
    console.log('Server is running at: http://localhost:5000');
});
