const express = require("express");
const app = express();

const exphbs = require('express-handlebars');
const path = require("path");

const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const allRoutes = require("./controllers");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000*60*60*2 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize }),
}));

//template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"))

app.use(allRoutes);

sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`);
    });
});