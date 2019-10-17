var express = require("express");
var router = express.Router();

var apiImplementation = require('../routes/apiimplementation')

router.get('/:districtId',function(req,res){
    console.log(req.params.districtId);
    console.log(req.session.user);
    var districtId = req.params.districtId
    
    // if(req.session.user) {
        //create a switch statement on districtId to route person to the correct district page
        switch(districtId) {
            case "1":
                Promise.all([apiImplementation.doCouncil(),apiImplementation.doTerms()]).then(councilData => {
                  console.log(councilData[1][0])
                  res.render("district", {
                    district: districtId, 
                    council: councilData[0].filter(member => member.District.includes(districtId))[0],
                    terms: councilData[1][0].Council1,
                    atLarge1: councilData[1][0].atLarge1,
                    atLarge2: councilData[1][0].atLarge2,
                    image: "Herbold_225x225.jpg"
                  })
                })
                
                
              break;
            case "2":
                Promise.all([apiImplementation.doCouncil(),apiImplementation.doTerms()]).then(councilData => {
                  console.log(councilData[1][0])
                  res.render("district", {
                    district: districtId, 
                    council: councilData[0].filter(member => member.District.includes(districtId))[0],
                    terms: councilData[1][0].Council2,
                    atLarge1: councilData[1][0].atLarge1,
                    atLarge2: councilData[1][0].atLarge2
                  })
                })
              break;
              case "3":
                  Promise.all([apiImplementation.doCouncil(),apiImplementation.doTerms()]).then(councilData => {
                    console.log(councilData[1][0])
                    res.render("district", {
                      district: districtId, 
                      council: councilData[0].filter(member => member.District.includes(districtId))[0],
                      terms: councilData[1][0].Council3,
                      atLarge1: councilData[1][0].atLarge1,
                      atLarge2: councilData[1][0].atLarge2
                    })
                  })
              break;
              case "4":
                  Promise.all([apiImplementation.doCouncil(),apiImplementation.doTerms()]).then(councilData => {
                    console.log(councilData[1][0])
                    res.render("district", {
                      district: districtId, 
                      council: councilData[0].filter(member => member.District.includes(districtId))[0],
                      terms: councilData[1][0].Council4,
                      atLarge1: councilData[1][0].atLarge1,
                      atLarge2: councilData[1][0].atLarge2
                    })
                  })
              break;
              case "5":
                  Promise.all([apiImplementation.doCouncil(),apiImplementation.doTerms()]).then(councilData => {
                    console.log(councilData[1][0])
                    res.render("district", {
                      district: districtId, 
                      council: councilData[0].filter(member => member.District.includes(districtId))[0],
                      terms: councilData[1][0].Council5,
                      atLarge1: councilData[1][0].atLarge1,
                      atLarge2: councilData[1][0].atLarge2
                    })
                  })
              break;
              case "6":
                  Promise.all([apiImplementation.doCouncil(),apiImplementation.doTerms()]).then(councilData => {
                    console.log(councilData[1][0])
                    res.render("district", {
                      district: districtId, 
                      council: councilData[0].filter(member => member.District.includes(districtId))[0],
                      terms: councilData[1][0].Council6,
                      atLarge1: councilData[1][0].atLarge1,
                      atLarge2: councilData[1][0].atLarge2
                    })
                  })
              break;
              case "7":
                  Promise.all([apiImplementation.doCouncil(),apiImplementation.doTerms()]).then(councilData => {
                    console.log(councilData[1][0])
                    res.render("district", {
                      district: districtId, 
                      council: councilData[0].filter(member => member.District.includes(districtId))[0],
                      terms: councilData[1][0].Council7,
                      atLarge1: councilData[1][0].atLarge1,
                      atLarge2: councilData[1][0].atLarge2

                    })
                  })
              break;
            default:
              console.log("default")
              res.render("login")
          }
    // }else {
    //     // handle return to login page
    //     console.log("else")
    //     res.render('login')
    // }
})

module.exports = router;