var app = require('express')();
var express = require('express');
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendfile('views/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.use(express.static(__dirname + '/public'));
