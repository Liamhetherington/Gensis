"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");



// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	"/styles",
	sass({
		src: __dirname + "/styles",
		dest: __dirname + "/public/styles",
		debug: true,
		outputStyle: "expanded"
	})
);
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page

app.get("/", (req, res) => {
	res.render("index");
});

// new page
app.get("/new", (req, res) => {
	res.render("newResource");
});

app.post("/new", (req, res) => {
	res.redirect("/genesis");
});

// new page
app.get("/new", (req, res) => {
	res.render("newResource");
});

app.post("/new", (req, res) => {
	knex('resource').returning('id').insert({
		title: req.body.title,
		url: req.body.source_url,
		date_created : "5/23/2019",
		description: req.body.description
	})
  .then( function (result) {
      res.json({ success: true, message: 'ok' });     // respond back to request
   })

	res.redirect("/genesis");
});


app.get("/genesis", (req, res) => {
	res.render("myResources");
});

app.post("/genesis", (req, res) => {
	res.redirect("/new");
});


//Individual Resource Page
app.get("/info", (req, res) => {

	res.render("info");
});

app.get("/resource" , (req, res) => {
  knex('resource').then(resource => {
    return res.json(resource);
  });
  // res.render("info");
});

app.get("/comments", (req, res) => {
  knex('comments').then(comments => {
    return res.json(comments);
  });
});

app.listen(PORT, () => {
	console.log("Example app listening on port " + PORT);
});
