var axios = require('axios');
var cheerio = require('cheerio');
var async = require('async');

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
              atLarge1: {
                position: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().eq(0).text(),
                name: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().eq(2).text(),
                elected: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[1],
                termLength: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[3] + " years",
                termExpires: $('div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',$(elem).html()).children().remove().end().text().trim().split(" ")[7],
              },
              atLarge2: {
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
  },
    doIssues: function doIssues() {
      return axios.get(issues)
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
            return data //res.json(data)
          })
          .catch(error=> {
            console.log(error);
          })
    },

    doCampaign: function doCampaign() {
      data = [];

      return async.eachSeries(campaign, function(e, callback){
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
        return data//res.json(data)
      })
    }
}