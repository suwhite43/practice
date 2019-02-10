var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.pretty=true;

app.get('/topic/new',function(req,res){
    res.render('new');
});

app.post('/topic',function(req,res){
    var id = req.body.id;
    var pw = req.body.pw;

    res.send(id+','+pw);
});



app.listen(3000);