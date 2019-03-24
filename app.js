const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

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
    console.log("Connected to DB");
  })
  .catch(function(err) {
    console.log(err, "Unable connect to DB");
  });

app.listen({ port }, () => {
  console.log(`Started up at port ${port}`);
});
