var express = require("express");
var router = express.Router();
var db = require("../models");
var bcrypt = require("bcrypt");

var apiImplementation = require('../routes/apiimplementation');

//get route for logged in users homepage, if logged in will let you in, otherwise will fail
router.get('/district: districtId',function(req,res){
    if(req.session.user) {
        res.render('securepage',req.session.user);
    }else {
        res.send('Please login to get your customized district information.')
    }
})

//loads signup form
router.get("/signup", function(req, res) {
  res.render("signup");
});

//creates new instance of user
router.post("/signup", function(req, res) {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    district: req.body.district
  }).then(function(newUser) {
    console.log(newUser);
    // res.json(newUser);
    res.json(true)

  }).catch(err=>console.log(err))
});

//loads login form
router.get("/login", function(req, res) {
  res.render("login");
});

//route for user login
router.post("/login", function(req, res) {
  console.log(req.body);
  
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(dbUser) {
    console.log(dbUser);
    
    //compares password send in req.body to one in database, will return true if matched.
    if (bcrypt.compareSync(req.body.password, dbUser.password)) {
      //create new session property "user", set equal to logged in user
      req.session.user = dbUser;
    } else {
      //delete existing user, add error
      req.session.user = false;
      req.session.error = "auth failed";
    }
    res.json(req.session);
  }).catch(err=>console.log(err))
});

router.get("/logout", function(req, res) {
  //delete session user, logging you out
  req.session.destroy(function() {
    res.send("successfully logged out");
  });
});

//developer route to see all the session variables.
router.get("/readsessions", function(req, res) {
  res.json(req.session);
});

router.get("/elections", function(req, res) {
  Promise.all([apiImplementation.doCampaign()]).then(data => {
    res.render("elections", {
      campaigns: data[0]
    })
  })
});

router.get("/issues", function(req, res) {
  Promise.all([apiImplementation.doIssues()]).then(data => {
    res.render("issues", {
      issues: data[0]
    });
  })
});
router.get("/district", function(req, res) {
  res.render("district");
});
router.get("/politicians", function(req, res) {
  Promise.all([apiImplementation.doCouncil(),apiImplementation.doTerms()]).then(councilData => {
    console.log(councilData[1][0])
    res.render("politicians", {
      council: councilData[0],
      terms: councilData[1][0]
    })
  })
  // res.render("politcians");
});
module.exports = router;
