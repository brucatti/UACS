// grab the packages we need
var express = require('express');
var SQL = require('./mysqlFunctions.js');
var app = express();
var port = 8080;

app.listen(port);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
var responseHeaders = {  
    "access-control-allow-origin": "http://localhost:8080",
    "Content-Type": "application/json"
};

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

app.get('/get-tinh', function(req, res){
	console.log ("/get-tinh");
	SQL.getTinh(function(err,result){
		res.send(result);
		res.end();
	});
});

app.post('/get-huyen', function(req,res){
	console.log ("/get-huyen");
	var msTinh = req.body.msTinh;
	SQL.getHuyen(msTinh,function(err,result){
		res.send(result);
		res.end();
	});
});

app.post('/get-truong',function(req,res){
	console.log ("/get-truong");
	var msTinh = req.body.msTinh;
	var msHuyen = req.body.msHuyen;
	SQL.getTruong(msTinh,msHuyen,function(err,result){
		res.send(result);
		res.end();
	});
}); 

app.post('/get-khoi-diem',function(req,res){
	console.log("/get-khoi-diem");
	SQL.getMajorPoint(req.body,function(err,result){
		res.send(result);
		res.end();
	});
});

console.log('Server started! At http://localhost:' + port);
