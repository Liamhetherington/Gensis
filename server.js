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
const moment = require("moment");
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

exports.index = function(req, res) {
	// send moment to your ejs
	res.render("info", { moment: moment });
};
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
		res.render("index", { username: "" });
	} else {
		knex.select("username")
			.from("users")
			.where("id", req.session.id)
			.then(function(result) {
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
		} else {
			console.log("something happened ");
			res.send("Username not found");
		}
	});
});

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

	knex.select("topic")
		.from("category")
		.then(function(topics) {
			knex.select("username")
				.from("users")
				.where("id", req.session.id)
				.then(function(result) {
					let templateVars = {
						username: result[0].username,
						newTopic: topics.map(function(item, index) {
							return item.topic;
						})
					};
					res.render("newResource", templateVars);
				});
		});
});

app.post("/new", (req, res) => {
	console.log(req.body.category);
	knex.select("id")
		.from("category")
		.where("topic", req.body.category)
		.then(function(result) {
			//got the category ID
			knex("resource")
				.insert({
					title: req.body.title,
					url: req.body.source_url,
					date_created: new Date(),
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

	knex.select("topic")
		.from("category")
		.then(function(topics) {
			knex.select("username")
				.from("users")
				.where("id", req.session.id)
				.then(function(result) {
					let templateVars = {
						username: result[0].username,
						newTopic: topics.map(function(item, index) {
							return item.topic;
						})
					};
					res.render("myResources", templateVars);
				});
		});
});

app.post("/genesis", (req, res) => {
	res.redirect("/new");
});

app.post("/category", (req, res) => {
	console.log(req.body);
	if (req.session.id === undefined) {
		return res.render("index", { username: "" });
	}
	knex("category")
		.insert({
			topic: req.body.addNewTopic
		})
		.then(function(result) {
			knex.select("topic")
				.from("category")
				.then(function(topics) {
					knex.select("username")
						.from("users")
						.where("id", req.session.id)
						.then(function(result) {
							let templateVars = {
								username: result[0].username,
								newTopic: topics.map(function(item, index) {
									return item.topic;
								})
							};
							res.render("myResources", templateVars);
						});
				});
		});
});

//Individual Resource Page
// app.get("/info/", (req, res) => {
// 	if (req.session.id === undefined) {
// 		res.render("info", { username: "" });
// 	}
// 	let templateVars = { username: req.session.id };
// 	res.render("info", templateVars);
// });

function getAllMyResources() {
	return knex.select("*").from("resource");
}

function getOneMyResource(id) {
	return knex
		.select("*")
		.from("resource")
		.where("id", id);
}

function getCommentsForResource(resourceId) {
	return knex
		.select("*")
		.from("comments")
		.where("resource_id", resourceId);
}

function getLikesForResource(resourceId) {
	return knex
		.select("*")
		.from("likes")
		.where("resource_id", resourceId);
}

async function getResourceDetails(resourceId) {
	const allResource = {
		likes: await getLikesForResource(resourceId),
		comments: await getCommentsForResource(resourceId),
		resource: (await getOneMyResource(resourceId))[0]
	};
	return allResource;
}

app.get("/resource/:id", (req, res) => {
	const id = req.params.id;
	getResourceDetails(id).then(details => {
		res.render("info", details);
	});
});

app.get("/resource", (req, res) => {
	users_id: req.session.id;
	knex("resource").then(resource => {
		return res.json(resource);
	});
});

app.get("/resource/category/:categoryName", (req, res) => {
	console.log("in get", req.params.categoryName);
	knex.select("id")
		.from("category")
		.where("topic", req.params.categoryName)
		.then(function(result) {
			console.log("get", result);
			//got the category ID
			console.log(result[0]);
			console.log(result[0].id);
			knex("resource")
				.where("category_id", result[0].id)
				.then(resource => {
					return res.json(resource);
				});
		});
});

app.post("/resource/:id/likes", (req, res) => {
	knex("likes")
		.insert({
			resource_id: req.params.id,
			users_id: req.session.id
		})
		.then(function(result) {
			return res.redirect(`/resource/${req.params.id}`);
		});
});

app.post("/resource/:id/comments", (req, res) => {
	knex("comments")
		.insert({
			comment: req.body.comment,
			resource_id: req.params.id,
			users_id: req.session.id
		})
		.then(function(result) {
			return res.redirect(`/resource/${req.params.id}`);
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
