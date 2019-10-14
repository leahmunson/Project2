// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
// var keys = require("../keys.js");
var db = require("../models");
var axios = require('axios');

var api_key = process.env.API_KEY;
console.log(api_key)
// Routes
// =============================================================
module.exports = function (app) {
  app.get('/api/google', (req, res) => {
    axios.get("https://www.googleapis.com/civicinfo/v2/voterinfo?key="+api_key+"&address=3261+SW+Avalon+Way+Seattle+WA&electionId=2000")
    // axios.get("https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyDI_aaJrRSSR8n3p-m6OoNC8FSDgvVS_Gk&address=926 N 92nd St Seattle, WA 98103")
    // axios.get("https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDI_aaJrRSSR8n3p-m6OoNC8FSDgvVS_Gk&address=926 N 92nd St Seattle, WA 98103&regional")
    .then(
      function (response) {
        console.log(response.data)
        res.json(response.data)
      }
    ).catch(function (err) {
      console.log(err);
      res.json(err)
    })
  })

    // } else if (process.argv[2] === "political"){
    //   axios.get("https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDI_aaJrRSSR8n3p-m6OoNC8FSDgvVS_Gk&address=926 N 92nd StSeattle, WA 98103&roles=headofstate").then(
    //       function (response) {
    //          console.log(response.data)
    //       }
    //   ).catch(function (err) {
    //       console.log(err);
    //   })


    // GET route for getting all of the posts
    app.get("/api/posts", function (req, res) {
      db.posts.findAll().then(function (posts) {
        res.json(posts)
      });
    });

    // __________
    app.get("/api/all", function (req, res) {
      var dbQuery = "SELECT * FROM chirps";

      connection.query(dbQuery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    });
    // _______
    // Get route for returning posts of a specific category
    app.get("/api/posts/category/:category", function (req, res) {
      // Add sequelize code to find all posts where the category is equal to req.params.category,
      // return the result to the user with res.json
      db.posts.findALL({
        where: {
          category: req.params.category
        }
      }).then(function (category) {
        res.json(category)
      })

    });

    // Get route for retrieving a single post
    app.get("/api/posts/:id", function (req, res) {
      // Add sequelize code to find a single post where the id is equal to req.params.id,
      // return the result to the user with res.json
      db.posts.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (dbPost) {
        res.json(dbPost)
      })
    });

    // POST route for saving a new post
    app.post("/api/posts", function (req, res) {
      // Add sequelize code for creating a post using req.body,
      // then return the result using res.json
      db.posts.create(req.body).then(function (newDbPost) {
        res.json(newDbPost);
      })
    });

    // DELETE route for deleting posts
    app.delete("/api/posts/:id", function (req, res) {
      // Add sequelize code to delete a post where the id is equal to req.params.id, 
      // then return the result to the user using res.json
    });

    // PUT route for updating posts
    app.put("/api/posts", function (req, res) {
      // Add code here to update a post using the values in req.body, where the id is equal to
      // req.body.id and return the result to the user using res.json
    });
  };
