var mysql = require("mysql");
var express = require("express");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "12345678",
	database: "uacs"
});

con.connect(function(err){
	if(err){
		console.log("Error connecting to database");
		return;
	}
	console.log("Connection to databases established");
});

exports.getTinh = function getTinh(callback){
	con.query("SELECT msTinh, tenTinh FROM uacs.thpt GROUP BY tenTinh",function(err,rows){
		var result = {'tinh':rows};
		callback(null,result);
	});
}
exports.getHuyen = function getHuyen(msTinh,callback){
	con.query("SELECT msHuyen,tenHuyen FROM uacs.thpt Where msTinh="+ msTinh +" group by msHuyen",function(err,rows){
		var result ={'quanHuyen':rows};
		callback(null,result);
	});
}
exports.getTruong = function getTruong(msTinh,msHuyen,callback){
	con.query("SELECT msTruong,tenTruong FROM uacs.thpt where msTinh = " + msTinh + " and msHuyen = " + msHuyen,function(err,rows){
		var result ={'truong':rows};
		callback(null,result);
	});
}