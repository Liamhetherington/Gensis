"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

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

app.use(cookieSession({
    name: 'session',
    keys: ["1"],
}))

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
   if (req.session.id === undefined) {
        return res.render("index", {username: ""});
    }
    knex.select("username").from("users").where('id',req.session.id)
    .then(function (result){
    let templateVars = {username: result[0].username};
    res.render("index", templateVars);
    })
});



app.get("/login", (req, res) => {
    res.render("login");
});


app.post("/login", (req, res) => {

	let result = checkUsername(req.body.username);
 	result.then((value)=>{
   if(value > 0){
    req.session.id = value;
   	res.redirect("/")

    console.log("user found in the database with id ", value);
   } else{
   	res.send("Username not found");
   }
	});
});

//function to check if the user is existed in database
function checkUsername(username){
 return knex.select("id").from("users").where('username',username)
 .then(function (users){
   if(users.length>0){
     return Promise.resolve(users[0].id);
   } else {
     return Promise.resolve(0)
   }
   console.log("its after knex query");
 });
}





app.post("/logout", (req, res) => {
	  req.session = null;
    res.redirect("/");
});

// new page
app.get("/new", (req, res) => {
	res.render("newResource");
});

app.post("/new", (req, res) => {
	knex("resource")
		.returning("id")
		.insert({
			title: req.body.title,
			url: req.body.source_url,
			// date_created : "5/23/2019",
			description: req.body.description
		})
		.then(function(result) {
			res.redirect("/genesis");
		});
});

app.get("/genesis", (req, res) => {
	const username = req.body.username
	res.render("myResources");
});

app.post("/genesis", (req, res) => {
	res.redirect("/new");
});

//Individual Resource Page
app.get("/info", (req, res) => {
	res.render("info");
});

app.get("/resource", (req, res) => {
	knex("resource")
		.first()
		.then(resource => {
			console.log("resource: ", resource);
			return res.json(resource);
		});
	// res.render("info");
});
app.get("/comments", (req, res) => {
	knex("comments").then(comments => {
		return res.json(comments);
	});
});

app.post("/likes", (req, res) => {
	console.log(req.body);
	knex("likes")
		.insert({
			resource_id: 1,
			users_id: 1
		})
		.then(function(like) {
			console.log(like);
			res.json();
		});

	// 1. write to likes table
	// 2. get resource likes
	// knex("resource")
	// 3. update resource likes
});

app.post("/comments", (req, res) => {
	console.log("I am commenting");
	// knex("likes").insert({
	// resource_id
});

app.post("/rating", (req, res) => {
	console.log("I am rating");
	// knex("likes").insert({
	// resource_id
});

app.get("/resource", (req, res) => {
	knex("resource").then(resource => {
		return res.json(resource);
	});
	// res.render("info");
});

app.listen(PORT, () => {
	console.log("Example app listening on port " + PORT);
});
