var path = require("path");

module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------
  
    app.get("/tables", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/tables.html"));
    });
  
    app.get("/reserve", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/reserve.html"));
    });
  
    // If no matching route is found default to home
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/home.html"));
    });
  };