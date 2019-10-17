var axios = require('axios');
var cheerio = require('cheerio');
var async = require('async');

var apiImplementation = require('./apiimplementation')

/*route names
api/terms
api/issues
api/council
api/campaign
api/election
api/electionvids

*/
var officialsurl = 'http://www.seattle.gov/elected-officials';
var wikimayorsurl = 'https://en.wikipedia.org/wiki/Mayor_of_Seattle';

var election = 'https://ballotpedia.org/City_elections_in_Seattle,_Washington_(2019)';
var electionVideos= [
/*C1*/ 'http://www.seattlechannel.org/2019-seattle-council-d1',
/*C2*/ 'http://www.seattlechannel.org/2019-seattle-council-d2',
/*C3*/ 'http://www.seattlechannel.org/2019-seattle-council-d3',
/*C4*/ 'http://www.seattlechannel.org/2019-seattle-council-d4',
/*C5*/ 'http://www.seattlechannel.org/2019-seattle-council-d5',
/*C6*/ 'http://www.seattlechannel.org/2019-seattle-council-d6',
/*C7*/ 'http://www.seattlechannel.org/2019-seattle-council-d7'
];

module.exports = function(app) {
    // Seattle Elected Officials Page
    app.get("/api/scrape", function (req, res) {
      axios.get(officialsurl)
      .then(response =>{
        data = [];
        const $ = cheerio.load(response.data);
       $('.primaryContent').each((i, elem)=>{
           data.push({
               name: $(elem).html()
           })
       })
        res.json(data)
      })
      .catch(error=> {
        console.log(error);
      })
    })

    //Mayor's Wiki Page
    // app.get("/api/mayor", function (req, res) {
    //   axios.get(wikimayorsurl)
    //   .then(response =>{
    //     data = [];
    //     const $ = cheerio.load(response.data);
    //    $('#mw-content-text > div > table.infobox > tbody > tr:nth-child(3) > td > div').each((i, elem)=>{
    //        data.push({
    //            Mayor: $('b > a',$(elem).html()).text(),
    //            Since: $('br').children().remove().text()
    //           //  $('div.cost').children().remove().end().text();
    //           //  #mw-content-text > div > table.infobox > tbody > tr:nth-child(3) > td > div > br
    //        })
    //    })
    //     res.json(data)
    //   })
    //   .catch(error=> {
    //     console.log(error);
    //   })
    // })

    // City Council Terms
    app.get("/api/terms", function (req, res) {
      Promise.all([apiImplementation.doTerms()]).then(termsData => {res.json(termsData[0])})
    })

        //Issues
        app.get("/api/issues", function (req, res) {
          Promise.all([apiImplementation.doIssues()]).then(issuesData => {res.json(issuesData[0])})
        })

// Council Info

        app.get("/api/council", function (req, res) {
          Promise.all([apiImplementation.doCouncil()]).then(councilData => {res.json(councilData[0])})
        })

// Campaign Council1
app.get("/api/campaign/", function (req, res) {
  if(!req.session.user){
    res.redirect('/auth/login')
  }
  else {
    Promise.all([apiImplementation.doCampaign()]).then(data => {res.json(data[0])})
  }
})

//General Election
app.get("/api/election", function (req, res) {
  axios.get(election)
  .then(response =>{
    data = [];
    const $ = cheerio.load(response.data);
   $('#election-info-table').each((i, elem)=>{
       data.push({
           TableHeader: $('tbody > tr:nth-child(1) > th',$(elem).html()).text(),
           CandidateFilingDeadline: $('tbody > tr:nth-child(2) > td:nth-child(2)',$(elem).html()).text(),
           OnlineMailPrimaryElectionRegistrationDeadline: $('tbody > tr:nth-child(3) > td:nth-child(2)',$(elem).html()).text(),
           OnlineMailGeneralElectionRegistrationDeadline: $('tbody > tr:nth-child(4) > td:nth-child(2)',$(elem).html()).text(),
           PrimaryElection: $('tbody > tr:nth-child(5) > td:nth-child(2)',$(elem).html()).text(),
           GeneralElection: $('tbody > tr:nth-child(6) > td:nth-child(2)',$(elem).html()).text(),
       })
   })
    res.json(data)
  })
  .catch(error=> {
    console.log(error);
  })
})
}
// Campaign Videos
// app.get("api/electionvids", function (req, res) {
//   data = [];
//   var ctr = 0

//   async.eachSeries(electionVideos, function(e, callback){
//     console.log(e)
//   axios.get(e)
//   .then(response =>{
//     const $ = cheerio.load(response.data);
//    $('#episodeCollection').each((i, elem)=>{
//        data.push({
//           //  District: $('p',$(elem).html()).children().eq(0).text(),
//           //  DistrictName: $('p',$(elem).html()).children().eq(2).text(),
//           //  Term: $('p',$(elem).html()).children().eq(3).text(),
//           //  Incumbent: $('p',$(elem).html()).children().eq(5).text(),
//           //  CampaignTitle: $('p',$(elem).html()).children().eq(8).text(),
//           //  Name1: $('p',$(elem).html()).children().eq(10).text(),
//           //  Name2: $('p',$(elem).html()).children().eq(12).text()
//        })
//    })
//    callback();
//   })
//   .catch(error=> {
//     console.log(error);
//   })
// }).then(foo => {
//   res.json(data)
// })
// })
