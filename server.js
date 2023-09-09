//import required modules/routes/middleware
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//importing sequelize  & sequelizeStore
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//setting var app to use express and port
const app = express();
const PORT = process.env.PORT || 3001;

//creating instance of handlebar
const hbs = exphbs.create({ helpers });

//setting up session
const sess = {
    secret: 'Secret Key for the tech_blog session',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//setting the app to use session of sess
app.use(session(sess));

//calling template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(routes);

//syncing sequelize and starting the express server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening at http://127.0.0.1:' + PORT))
});