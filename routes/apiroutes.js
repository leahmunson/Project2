var axios = require('axios');
var cheerio = require('cheerio');
var officialsurl = 'http://www.seattle.gov/elected-officials';
var wikimayorsurl = 'https://en.wikipedia.org/wiki/Mayor_of_Seattle';
var meetCityCouncil ='http://www.seattle.gov/council/meet-the-council';
var cityTerms ='https://www.seattle.gov/cityclerk/agendas-and-legislative-resources/terms-of-office-for-elected-officials';
var issues ='https://www.seattle.gov/council/issues';

module.exports = function(app) {
    // Seattle Elected Officials Page
    app.get("/scrape", function (req, res) {
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
    app.get("/mayor", function (req, res) {
      axios.get(wikimayorsurl)
      .then(response =>{
        data = [];
        const $ = cheerio.load(response.data);
       $('#mw-content-text > div > table.infobox > tbody > tr:nth-child(3) > td > div').each((i, elem)=>{
           data.push({
               Mayor: $('b > a',$(elem).html()).text(),
               Since: $('br').children().remove().text()
              //  $('div.cost').children().remove().end().text();
              //  #mw-content-text > div > table.infobox > tbody > tr:nth-child(3) > td > div > br
           })
       })
        res.json(data)
      })
      .catch(error=> {
        console.log(error);
      })
    })

    // City Council Wikipedia List
    app.get("/terms", function (req, res) {
      axios.get(cityTerms)
      .then(response =>{
        data = [];
        const $ = cheerio.load(response.data);
       $('#mainColMain').each((i, elem)=>{
           data.push({
               Mayor: $('div:nth-child(1) > div > p:nth-child(2)',$(elem).html()).text(),
               Council1: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(1)',$(elem).html()).text(),
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
        app.get("/issues", function (req, res) {
          axios.get(issues)
          .then(response =>{
            data = [];
            const $ = cheerio.load(response.data);
           $('#x60876').each((i, elem)=>{
               data.push({
                IssueTitle: $('.titleDateContainer',$(elem).html()).text(),
                IssueText: $('.titleExcerptText',$(elem).html()).text(),
                Test: $('.titleExcerpt',$(elem).html()).text(),
               
               })
           })
            res.json(data)
          })
          .catch(error=> {
            console.log(error);
          })
        })


        app.get("/council", function (req, res) {
          axios.get(meetCityCouncil)
          .then(response =>{
            data = [];
            const $ = cheerio.load(response.data);
           $('#mainColMain > div.containerPadTopSides > div').each((i, elem)=>{
               data.push({
                Name:$('#herbold > div.col-sm-9,$(elem).html()).text(),
                Name: $('#herbold > div.col-sm-9 > h2 > a',$(elem).html()).text(),
                District: $('.positiongInfo',$(elem).html()).text(),
                CommitteesChair: $('#herbold > div.col-sm-9 > ul:nth-child(4) > li:nth-child(1) > a',$(elem).html()).text(),
                ViceChair: $('#herbold > div.col-sm-9 > ul:nth-child(4) > li:nth-child(2) > a',$(elem).html()).text(),
                Member: $('#herbold > div.col-sm-9 > ul:nth-child(4) > li:nth-child(3) > a', $(elem).html()).text(),
                Alternate: $('#herbold > div.col-sm-9 > ul:nth-child(4) > li:nth-child(4) > a', $(elem).html()).text(),
                Contact: $('#herbold > div.col-sm-9 > ul:nth-child(6)', $(elem).html()).text()

                

              //  #mainColMain
               })
           })
            res.json(data)
          })
          .catch(error=> {
            console.log(error);
          })
        })

// #herbold > div.col-sm-3 > a > img
  
  }

