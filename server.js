// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
require("dotenv").config()
// console.log("PROCESS.ENV ",  process.env)


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


var express = require('express');
var app = express();



var PORT = process.env.PORT || 3033;

// app.listen(PORT)
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


require("./routes/apiroutes.js")(app)