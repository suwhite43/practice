var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/route', function(req, res){
    res.send('hello route <img src="/route.png">');
  });

  
app.get('/login', function(req, res){
    res.send('<h1>login please</h1>');
  });

app.listen(3000);