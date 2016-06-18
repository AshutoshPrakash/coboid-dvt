var express = require('express');
var path    = require("path");
var fs = require("fs");

var app = express();

app.use(express.static(__dirname + '/'));

app.listen(9090, function () {
	console.log('coboid listening on port 9090 !');
});

app.get('/', function (req, res){
    fs.readFile(__dirname + '/html/index.html', 'utf8', function(err, text){
        if(!err)res.send(text);
        else console.log('Server : In event / '+err);
    });
});