var GD = {};

var mysql = require("mysql");


var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ashu',
  database : 'world',
  multipleStatements: true
});
con.connect();

GD.city = function(callback){
    con.query('select * from City limit 10',function(err,rows){
        callback(err,rows);
    });
};

module.exports = GD;