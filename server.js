var express = require('express');
var mongoose = require('mongoose');
var url = require('url');
var app = express();

const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//DB Connection
mongoose.connect(process.env.DB_STRING);

//Initialisation of Models
require('./models/Searches'); //Build Search Class

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Review Latest Searches
app.get("/api/latest/imagesearch", function(req, res){
  const Search = mongoose.model('searches');
  Search.find().limit(10).sort({when: -1}).select({term: 1, when: 1, _id: 0}).exec(function(err, data){
    res.send(data);
  });
});

//Make Image Search
app.get("/api/imagesearch/:search", function (req, res) {
  var qs = url.parse(req.url, true).query;
  var term = req.params.search.trim();
  var page = 1;
  if (qs.offset) {
    //Pagination Offset Available
    page = Number(qs.offset);
      }
  
  //Start Search
  client.search(term, {page: page}).then(function(images){
    images = images.map(function(image){
      return {url: image.url, snippet: image.description, thumbnail: image.thumbnail.url, context: image.parentPage};
    });
    const Search = mongoose.model('searches');
    Search.createOrUpdate({term: term}).then(function(data){
      res.json(images);
    });
  });
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
