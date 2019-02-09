var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/route', function(req, res){
    res.send('hello route <img src="/route.png">');
  });

  app.get('/dynamic', function(req, res){
    var str='';
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
    </body>
    </html>
    `;  
    res.send(output);
  });

app.get('/login', function(req, res){
    res.send('<h1>login please</h1>');
  });

app.listen(3000);