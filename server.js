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
	const username = req.body.username
	res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {

	let result = checkUsername(req.body.username);
 	result.then((value)=>{
   if(value > 0){
   	res.redirect("/")
     console.log("user found in the database with id ", value);
   } else{
   	res.send("Username not found");
     //console.log("user didnt match");
   }

    //login process
  //   const username = req.body.username

  //   knex.select('*').from('users').where(knex.raw('username = ?', [username]))
  //   .asCallback(function(err, rows){
	 //    if (err){
	 //    	res.send('error')
	 //    	return
	 //    }
	 //    if(rows.length > 0){
	 //    	res.redirect('/');
	 //    }else{
	 //    	res.send('username is not existed')
	 //    }
  //     });
		// }
	});
});


///////

function checkUsername(username){
 var userId;
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
//Create login
// app.post('/login', (req, res) => {
//  let result = checkUsername(req.body.username);
//  result.then((value)=>{
//    if(value > 0){
//      console.log("user found in the database with id ", value);
//    } else{
//      console.log("user didnt match");
//    }
//  });




////////////


app.post("/logout", (req, res) => {
	const username = req.body.username
    res.redirect("/");
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
        res.redirect("/genesis");
   })
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


app.listen(PORT, () => {
	console.log("Example app listening on port " + PORT);
});
