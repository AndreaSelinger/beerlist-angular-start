var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beers');

var Beer = require('./beerModel');

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/beers', function (req, res, next) {
  Beer.find(function (error, beers) {
    if (error) {
      return next(error);
    } else {
      return res.send(beers);
    }
  });
});

app.post('/beers', function(req, res, next) {
  console.log(req.body)
  Beer.create(req.body, function(err, beer) {
    if (err) {
      return next(err);
    } else {
      console.log(beer)
      return res.send(beer);
    }
  });
});

app.delete('/beers/:id', function(req, res, next) {
  Beer.findByIdAndRemove(req.params.id, function(err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

app.put('/beers/:beerId', function(req, res, next) {
  Beer.findByIdAndUpdate(req.params.beerId, req.body, { new: true }, function(err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer);
  });
});

app.post('/beers/:id/ratings', function(req, res, next) {
  
  var update = { $push: { ratings: req.body.rating } };
  Beer.findByIdAndUpdate(req.params.id, update, { new: true }, function(err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer);
  });
});

// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function() {
  console.log("yo yo yo, on 8000!!")
});