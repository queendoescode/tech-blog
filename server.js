const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 30*60*1000 }, // cookie will expire after 30 minutes
  rolling: true, // user activity on the site will reset the expiration timer
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
