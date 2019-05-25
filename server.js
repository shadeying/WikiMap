"use strict"

require('dotenv').config();
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";

const express     = require("express");

// express middleware
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session')

const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key'],
}));

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mapsRoutes = require('./routes/maps');

// knex queries for resource routes
const queries = require('./db/queries.js')(knex);

// Mount all resource routes
app.use("/api/users", usersRoutes(queries));
app.use('/api/maps', mapsRoutes(queries));


const viewRoutes = require('./routes/views')()

// Mount view routes
app.use('/', viewRoutes);

// Home page
app.get('/maps/:mapid', (req, res) => {
  res.render("index");
});

app.get('/users/:userid', (req, res) => {
  res.render();
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
