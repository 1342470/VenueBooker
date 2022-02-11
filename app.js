const express = require('express');
const exphbs = require('express-handlebars');
const accessTokenMiddleware = require('./middleware/accessTokenMiddleware');

const app = express();


//constants that the app will use to import the files that are required.
const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const venues = require('./routes/venues')

//defines middleware funciton imports 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//once all required files are defined above next the app must let express which pages will be used in the app
app.use('/login', loginRouter);
app.use('/', accessTokenMiddleware, indexRouter);
app.use('/users', accessTokenMiddleware, usersRouter);
app.use('/venues', accessTokenMiddleware, venues)


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars',
    helpers: require('./config/hbs')
});

// defines how the express will render the app using handlebars 
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

//once server has successfully started it will print a success menu in the console
app.listen(3000, () => {
    console.log('Server is running at: http://localhost:3000');
});
