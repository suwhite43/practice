var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs=require('fs');
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'test',
  password : '1234',
  database : 'test_db'
});
conn.connect();

var app = express();

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views_mysql'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.pretty=true;

app.get('/topic/new',function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new',{topics:files});
    });
    
});

app.post('/topic',function(req,res){
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('data/'+title,description,(err)=>{
        if(err){

        }
        res.redirect('/topic/'+title);
    });
});

app.get(['/topic','/topic/:id'],function(req,res){
    var sql='SELECT * from topic';
    conn.query(sql, function (err, topics, fields) {
        var id = req.params.id;
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error');  
        }

        if(id){
            var sql = 'SELECT * from topic where id = ?';
            conn.query(sql,[id], function (err, results, fields) {
                if (err){
                    console.log(err);
                }
                //res.render('view',{topics:topics,topic:topic[0]});
                res.render('view',{topics:topics,subtopic:results[0]});
            });

        }else{
            res.render('view',{topics:topics});
            
        }
        
    });

/*    
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        var id=req.params.id;
        if(id){
            fs.readFile('data/'+id,'utf-8',function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');          
                }
                res.render('view_file',{titil:id,topics:files,description:data});
            });
        }else{
            res.render('view_file',{topics:files,title:'Learn Progamming',description:'Programming is ...'});
        }
    });
*/    

});

/*
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

    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        fs.readFile('data/'+id,'utf-8',function(err,data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');          
            }
            res.render('view_file',{titil:id,topics:files,description:data});
        });

    });    
 
});
*/

app.listen(3000);