// grab the packages we need
var express = require('express');
var SQL = require('./mysqlFunctions.js');
var app = express();
var port = 8080;

app.listen(port);

var responseHeaders = {  
    "access-control-allow-origin": "*",
    "Content-Type": "application/json"
};

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

app.get('/get-tinh', function(req, res){
	console.log ("/get-tinh");
	res.header(responseHeaders);
	SQL.getTinh(function(err,result){
		res.send(result);
		res.end();
	});
});

app.post('/get-huyen', function(req,res){
	console.log ("/get-huyen");
	var msTinh = req.body.msTinh;
	console.log(msTinh);
	res.header(responseHeaders);
	SQL.getHuyen(msTinh,function(err,result){
		res.send(result);
		res.end();
	});
});

app.post('/get-truong',function(req,res){
	console.log ("/get-truong");
	var msTinh = req.body.msTinh;
	var msHuyen = req.body.msHuyen;
	res.header(responseHeaders);
	SQL.getTruong(msTinh,msHuyen,function(err,result){
		res.send(result);
		res.end();
	});
});


console.log('Server started! At http://localhost:' + port);
