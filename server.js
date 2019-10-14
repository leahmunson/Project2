

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