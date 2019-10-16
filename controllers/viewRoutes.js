var express = require("express");
var router = express.Router();

router.get('/:districtId',function(req,res){
    console.log(req.params.districtId);
    console.log(req.session.user);
    var districtId = req.params.districtId
    
    if(req.session.user) {
        //create a switch statement on districtId to route person to the correct district page
        switch(districtId) {
            case "1":
                //TODO: connect with db, get all info on district 1, create handlebars object with the array that comes back
                res.render("1", {district:data})
              break;
            case y:
              // code block
              break;
            default:
              res.render("login")
          }
    }else {
        // TODO: handle return to login page
    }
})

module.exports = router;