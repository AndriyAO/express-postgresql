const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./server/config/database");

const routes = require("./server/routes/index");

let app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use("/", routes);

var models = require("./server/models");

models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

app.listen({ port }, () => {
  console.log(`Started up at port ${port}`);
});
