var axios = require('axios');
var cheerio = require('cheerio');
var officialsurl = 'http://www.seattle.gov/elected-officials';

module.exports = function(app) {

    app.get("/scrape", function (req, res) {
      axios.get(officialsurl)
      .then(response =>{
        data = [];
        const $ = cheerio.load(response.data);
       $('h3').each((i, elem)=>{
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
  
  }