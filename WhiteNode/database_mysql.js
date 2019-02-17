var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'tuple',
  password : '1qaz2wsx',
  database : 'test_db'
});

conn.connect();
var sql='SELECT * from topic';

conn.query(sql, function (error, results, fields) {
  //if (error) throw error;
  if (error){
      console.log(error);
  }
  console.log('The solution is: ', results);
  console.log('The solution is: ', fields);
});

conn.end();