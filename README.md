# Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above




##users should be able to save an external URL along with a title and description
app.post("/users/:id/URL")

##users should be able to search for already-saved resources created by any user
app.get("/users/:id/genesis/:id")


##users should be able to categorize any resource under a topic
app.put("/users/:id/genesis/:id")

##users should be able to comment on any resource
app.post(/users/:id/genesis/:id/comment)

##users should be able to rate any resource
app.post(/users/:id/genesis/:id/rating)

##users should be able to like any resource
app.post(/users/:id/genesis/:id/like)

##users should be able to view all their own and all liked resources on one page ("My resources")
app.get("/users/:id/mygenesis")

##users should be able to register, log in, log out and update their profile

register - app.post("/register")
update - app.post("/users/:id")
login - app.post("/login")
logout - app.post("/logout")




app.get("/", (req, res) =>{
  //check if the user loged in,
  //if loged in the header will be changed

});

app.get("/users/:id/mygenesis", (req, res) =>{
  //check users own genesis

});

app.post("/users/:id/URL", (req, res) =>{
  //save an external URL

});

app.get("/users/:id/genesis/:id", (req, res) =>{
  //search for already-saved resources

});

app.put("/users/:id/genesis/:id", (req, res) =>{
  //categorize any resource

});

app.post("/users/:id/genesis/:id/comment", (req, res) =>{
  //comment on any resource

});

app.post("/users/:id/genesis/:id/rating", (req, res) =>{
  //rate any resource

});

app.post("/users/:id/genesis/:id/like", (req, res) =>{
  //like any resource

});













