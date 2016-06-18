var express = require('express');
var path    = require("path");

var app = express();

app.listen(9090, function () {
	console.log('coboid listening on port 9090 !');
});

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname+'/html/index.html'));
});