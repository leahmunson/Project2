var axios = require('axios');
var cheerio = require('cheerio');
var officialsurl = 'http://www.seattle.gov/elected-officials';
var wikimayorsurl = 'https://en.wikipedia.org/wiki/Mayor_of_Seattle';
var wikiCityCouncil ='https://en.wikipedia.org/wiki/Seattle_City_Council#Notable_past_council_members';

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
               mayor: $(elem).html()
           })
       })
        res.json(data)
      })
      .catch(error=> {
        console.log(error);
      })
    })

    // City Council Wikipedia List
    app.get("/councilList", function (req, res) {
      axios.get(wikiCityCouncil)
      .then(response =>{
        data = [];
        const $ = cheerio.load(response.data);
       $('*').each((i, elem)=>{
           data.push({
               mayor: $(elem).html()
           })
       })
        res.json(data)
      })
      .catch(error=> {
        console.log(error);
      })
    })


  
  }

