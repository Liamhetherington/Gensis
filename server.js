"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

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

app.use(
	cookieSession({
		name: "session",
		keys: ["1"]
	})
);

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
		console.log("SESSION WAS EMPTY");
		res.render("index", { username: "" });
	} else {
		console.log("session was not empty. SUCCESS");
		console.log("Session id ", req.session.id);
		console.log("type of session ", typeof req.session.id);
		knex.select("username")
			.from("users")
			.where("id", req.session.id)
			.then(function(result) {
				console.log(result[0].username);
				let templateVars = { username: result[0].username };
				res.render("index", templateVars);
			});
	}
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", (req, res) => {
	let result = checkUsername(req.body.username);
	result.then(value => {
		if (value > 0) {
			console.log("we are good to go");
			req.session.id = value;
			res.redirect("/");
			//console.log("user found in the database with id ", value);
		} else {
			console.log("something happened ");
			res.send("Username not found");
		}
	});
});

//function to check if the user is existed in database
function checkUsername(username) {
	return knex
		.select("id")
		.from("users")
		.where("username", username)
		.then(function(users) {
			if (users.length > 0) {
				return Promise.resolve(users[0].id);
			} else {
				return Promise.resolve(0);
			}
			console.log("its after knex query");
		});
}

// new page
app.get("/new", (req, res) => {
	if (req.session.id === undefined) {
		return res.render("index", { username: "" });
	}
	knex.select("username")
		.from("users")
		.where("id", req.session.id)
		.then(function(result) {
			let templateVars = { username: result[0].username };
			res.render("newResource", templateVars);
		});
});

app.post("/new", (req, res) => {
	knex.select("id")
		.from("category")
		.where("topic", req.body.category)
		.then(function(result) {
			//got the category ID
			knex("resource")
				.insert({
					title: req.body.title,
					url: req.body.source_url,
					// date_created : "5/23/2019",
					thumbnail: req.body.thumbnail_url,
					description: req.body.description,
					users_id: parseInt(req.session.id),
					category_id: parseInt(result[0].id)
				})
				.then(function(result) {
					res.redirect("/genesis");
				});
		});
});

app.get("/genesis", (req, res) => {
	if (req.session.id === undefined) {
		return res.render("index", { username: "" });
	}
	knex.select("username")
		.from("users")
		.where("id", req.session.id)
		.then(function(result) {
			let templateVars = { username: result[0].username };
			res.render("myResources", templateVars);
		});
});

app.post("/genesis", (req, res) => {
	if (req.session.id === undefined) {
		return res.render("index", { username: "" });
	}
	knex.select("username")
		.from("users")
		.where("id", req.session.id)
		.then(function(result) {
			let templateVars = { username: result[0].username };
			res.render("myResources", templateVars);
		});
	res.redirect("/new");
});

//Individual Resource Page
app.get("/info", (req, res) => {
	if (req.session.id === undefined) {
		res.render("info", { username: "" });
	}
	let templateVars = { username: req.session.id };
	res.render("info", templateVars);
});

app.get("/resource", (req, res) => {
	users_id: req.session.id;
	knex("resource").then(resource => {
		return res.json(resource);
	});
	// res.render("info");
});
app.get("/comments", (req, res) => {
	knex("comments")
		.insert({
			resource_id: 1,
			users_id: req.session.id
		})
		.then(comments => {
			return res.json(comments);
		});
});

app.post("/likes", (req, res) => {
	console.log(req.body);
	knex("likes")
		.insert({
			resource_id: 1,
			users_id: req.session.id
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

app.post("/info", (req, res) => {
	knex("comments")
		.insert({
			comment: req.body.comment,
			users_id: req.session.id,
			resource_id: req.body.resource_id
		})
		.then(function(result) {
			return res.json();
		});
});

app.post("/rating", (req, res) => {
	console.log("I am rating");
	// knex("likes").insert({
	// resource_id
});

app.post("/logout", (req, res) => {
	req.session = null;
	res.redirect("/");
});

app.listen(PORT, () => {
	console.log("Example app listening on port " + PORT);
});
