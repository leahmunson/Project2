var axios = require('axios');
var cheerio = require('cheerio');
var async = require('async');

/*route names
api/terms
api/issues
api/council
api/campaign
api/elections
api/electionvids

needs
photos
funding
*/
var officialsurl = 'http://www.seattle.gov/elected-officials';
var wikimayorsurl = 'https://en.wikipedia.org/wiki/Mayor_of_Seattle';
var meetCityCouncil ='http://www.seattle.gov/council/meet-the-council';
var cityTerms ='https://www.seattle.gov/cityclerk/agendas-and-legislative-resources/terms-of-office-for-elected-officials';
var issues ='https://www.seattle.gov/council/issues';
var campaign = [/*C1 */'http://web6.seattle.gov/ethics/elections/campaigns.aspx?cycle=2019&type=contest&IDNum=173&leftmenu=collapsed',
/* C2*/'http://web6.seattle.gov/ethics/elections/campaigns.aspx?cycle=2019&type=contest&IDNum=172&leftmenu=collapsed',
/*C3 */'http://web6.seattle.gov/ethics/elections/campaigns.aspx?cycle=2019&type=contest&IDNum=174&leftmenu=collapsed',
/* C4*/'http://web6.seattle.gov/ethics/elections/campaigns.aspx?cycle=2019&type=contest&IDNum=175&leftmenu=collapsed',
/*C5*/'http://web6.seattle.gov/ethics/elections/campaigns.aspx?cycle=2019&type=contest&IDNum=176&leftmenu=collapsed',
/*C6*/'http://web6.seattle.gov/ethics/elections/campaigns.aspx?cycle=2019&type=contest&IDNum=177&leftmenu=collapsed',
/*C7*/'http://web6.seattle.gov/ethics/elections/campaigns.aspx?cycle=2019&type=contest&IDNum=178&leftmenu=collapsed'
];

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
      axios.get(cityTerms)
      .then(response =>{
        data = [];
        const $ = cheerio.load(response.data);
       $('#mainColMain').each((i, elem)=>{
          var council = []
          
           data.push({
               Mayor: $('div:nth-child(1) > div > p:nth-child(2)',$(elem).html()).text(),
               Council1: {
                 position: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(1)',$(elem).html()).children().eq(0).text(),
                 name: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(1)',$(elem).html()).children().eq(2).text()
                //  elected:
               },
               Council2:  $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(2)',$(elem).html()).text(),
               Council3:  $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(3)',$(elem).html()).text(),
               Council4:  $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(1)',$(elem).html()).text(),
               Council5:  $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(2)',$(elem).html()).text(),
               Council6:  $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(3)',$(elem).html()).text(),
               Council7:  $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(1)',$(elem).html()).text(),
               Council8:  $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).text(),
               Council9:  $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(3)',$(elem).html()).text()
           })
       })
        res.json(data)
      })
      .catch(error=> {
        console.log(error);
      })
    })

        //Issues
        app.get("/api/issues", function (req, res) {
          axios.get(issues)
          .then(response =>{
            data = [];
            const $ = cheerio.load(response.data);
           $('.thumbnailExcerpt').each((i, elem)=>{
               data.push({
                IssueTitle: $('.titleDateContainer',$(elem).html()).text(),
                IssueText: $('.titleExcerptText',$(elem).html()).text(),
                Link: "https://www.seattle.gov/" +$('a',$(elem).html()).attr('href'),
               })
           })
            res.json(data)
          })
          .catch(error=> {
            console.log(error);
          })
        })


        app.get("/api/council", function (req, res) {
          axios.get(meetCityCouncil)
          .then(response =>{
            data = [];
            const $ = cheerio.load(response.data);
           $('#mainColMain > div.containerPadTopSides > div > .row').each((i, elem)=>{
             if (i!==0) {
               data.push({
                // Name:$('#herbold > div.col-sm-9,$(elem).html()).text(),
                Name: $(' div.col-sm-9 > h2 > a',$(elem).html()).text(),
                District: $('.positionInfo',$(elem).html()).text(),
                CommitteesChair: $('div.col-sm-9 > ul:nth-child(4) > li:nth-child(1) > a',$(elem).html()).text(),
                ViceChair: $(' div.col-sm-9 > ul:nth-child(4) > li:nth-child(2) > a',$(elem).html()).text(),
                Member: $(' div.col-sm-9 > ul:nth-child(4) > li:nth-child(3) > a', $(elem).html()).text(),
                Alternate: $(' div.col-sm-9 > ul:nth-child(4) > li:nth-child(4) > a', $(elem).html()).text(),
                ContactPhone: $(' div.col-sm-9 > ul:nth-child(6)', $(elem).html()).children().eq(0).text(),
                ContactEmail: $(' div.col-sm-9 > ul:nth-child(6)', $(elem).html()).children().eq(1).text()
               }) 
              }
           })
            res.json(data)
          })
          .catch(error=> {
            console.log(error);
          })
        })

// Campaign Council1
app.get("/api/campaign/", function (req, res) {
  if(!req.session.user){
    res.redirect('/auth/login')
  }
  else {

  data = [];
  var ctr = 0

  async.eachSeries(campaign, function(e, callback){
    console.log(e)
  axios.get(e)
  .then(response =>{
    const $ = cheerio.load(response.data);
   $('#divChartMain > table > tbody > tr:nth-child(1) > td:nth-child(3)').each((i, elem)=>{
       data.push({
           District: $('p',$(elem).html()).children().eq(0).text(),
           DistrictName: $('p',$(elem).html()).children().eq(2).text(),
           Term: $('p',$(elem).html()).children().eq(3).text(),
           Incumbent: $('p',$(elem).html()).children().eq(5).text(),
           CampaignTitle: $('p',$(elem).html()).children().eq(8).text(),
           Name1: $('p',$(elem).html()).children().eq(10).text(),
           Name2: $('p',$(elem).html()).children().eq(12).text()
       })
   })
   callback();
  })
  .catch(error=> {
    console.log(error);
  })
}).then(foo => {
  res.json(data)
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


}





}
)}