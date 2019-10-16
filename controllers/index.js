var express = require("express");
var router = express.Router();
var authRoutes = require('./authorization');
var viewRoute = require('./viewRoutes')

//appends "/auth/" to all routes imported from authorization.js
router.use('/auth',authRoutes);

router.use('/district', viewRoute);
router.get('/',function(req,res){
    res.render('index')
})

module.exports = router;
