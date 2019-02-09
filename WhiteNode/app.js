var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/login', function(req, res){
    res.send('<h1>login please</h1>');
  });

app.listen(3000);