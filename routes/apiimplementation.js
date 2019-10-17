var axios = require('axios');
var cheerio = require('cheerio');
var async = require('async');

var meetCityCouncil ='http://www.seattle.gov/council/meet-the-council';
var cityTerms ='https://www.seattle.gov/cityclerk/agendas-and-legislative-resources/terms-of-office-for-elected-officials';

module.exports = {
  doCouncil: function doCouncil() {
    return axios.get(meetCityCouncil)
    .then(response =>{
      data = [];
      const $ = cheerio.load(response.data);
     $('#mainColMain > div.containerPadTopSides > div > .row').each((i, elem)=>{
       if (i!==0) {
         data.push({
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
      //console.log(data)
      return data //res.json(data)
    })
    .catch(error=> {
      console.log(error);
    })
  },

  doTerms: function doTerms() {
    return axios.get(cityTerms)
    .then(response =>{
      data = [];
      const $ = cheerio.load(response.data);
     $('#mainColMain').each((i, elem)=>{
        var council = []
        
         data.push({
             Mayor: {
                 name: $('div:nth-child(1) > div > p:nth-child(2)',$(elem).html()).children().eq(0).text(),
                 elected: $('div:nth-child(1) > div > p:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                 termLength: $('div:nth-child(1) > div > p:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[4],
                 termExpires: $('div:nth-child(1) > div > p:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[8],
             },
             Council1: {
               position: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(1)',$(elem).html()).children().eq(0).text(),
               name: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(1)',$(elem).html()).children().eq(2).text(),
               elected: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
               termLength: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[4],
               termExpires: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[8],
             },
             Council2: {
                position: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(2)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(2)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[5],
                termLength: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[8],
                termExpires: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[12],
              },
              Council3: {
                position: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(3)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(3)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                termLength: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[4],
                termExpires: $('div:nth-child(1) > div > div:nth-child(4) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[8],
              },
              Council4: {
                position: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(1)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(1)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                termLength: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[4],
                termExpires: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[8],
              },
              Council5: {
                position: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(2)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(2)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                termLength: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[4],
                termExpires: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[8],
              },
              Council6: {
                position: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(3)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(3)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                termLength: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[4],
                termExpires: $('div:nth-child(1) > div > div:nth-child(5) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[8],
              },
              Council7: {
                position: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(1)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(1)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                termLength: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[4],
                termExpires: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(1)',$(elem).html()).children().remove().end().text().trim().split(" ")[8],
              },
              Council8: {
                position: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                termLength: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[3] + " years",
                termExpires: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[7],
              },
              Council9: {
                position: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(3)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(3)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                termLength: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[3] + " years",
                termExpires: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(3)',$(elem).html()).children().remove().end().text().trim().split(" ")[7],
              },
         })
     })
      return data //res.json(data)
    })
    .catch(error=> {
      console.log(error);
    })
  }
}