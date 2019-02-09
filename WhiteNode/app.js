var express = require('express');
var path = require('path');
var app = express();

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));
//app.use(express.static(path.join(__dirname,'public'));

app.get('/template',function(req,res){
  res.render('temp',{
      time:Date(),
      title:'pug'
  });
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/route', function(req, res){
    res.send('hello route <img src="/route.png">');
  });

  app.get('/dynamic', function(req, res){
    var str='';
    var time=Date();

    for(var i=1;i<=5;i++){
        str=str+'<li>cording</li>';
    }

    var output =`
    <html>
    <head>
        <meta charset="utf-8">
        <title> html 동적파일  
        </title>
    </head>
    <body>
        <h1>Hello,dynamic</h1>
        <ul>
            ${str}
        </ul>
        ${time}
    </body>
    </html>
    `;  
    res.send(output);
  });

app.get('/login', function(req, res){
    res.send('<h1>login please</h1>');
  });

app.get('/topic',function(req,res){
    var topics =[
        'javascript is ...',
        'nodejs is ...',
        'express is ...'
    ];

    var output =`
    <a href='/topic?id=0'>javaScript</a></br>
    <a href='/topic?id=1'>NodJS</a></br>
    <a href='/topic?id=2'>EXPRESS</a></br>
    topics[req.query.id] = ${topics[req.query.id]}
    `;

    res.send(output);
});

app.listen(3000);