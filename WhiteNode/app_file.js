var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs=require('fs');

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
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('data/'+title,description,(err)=>{
        if(err){

        }
        res.send('Success!!!');
    });
});

app.get('/topic',function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view_file',{topics:files});
    });
    
});

app.get('/topic/:id',function(req,res){
    var id = req.params.id;
    
    res.send(id);
});

app.listen(3000);