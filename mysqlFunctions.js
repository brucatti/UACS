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
		var result = {'truong':rows};
		callback(null,result);
	});
}

exports.getMajorPoint = function getMajorPoint(data,callback){
	con.query("SELECT * FROM uacs.major;",function(err,rows){
		var result = [];
		var prop;
		prop = "Subject_" + data.Language_id;
		Object.defineProperty(data,prop,{
			value: data.Language_value,
			writable: false
		});
		var count = 1;
		rows.forEach(function(row){
			var sum = 0;

			var numOfSubject=0;	
			for (var i=1;i<=57;i++){
				prop = 'Subject_' + i;
				if (Object.getOwnPropertyDescriptor(row, prop).value == "1" && (!!Object.getOwnPropertyDescriptor(data, prop)))
				{
					sum +=Object.getOwnPropertyDescriptor(data, prop).value * Object.getOwnPropertyDescriptor(row, prop).value;
					numOfSubject ++;
				}
			}
			if (numOfSubject == 3) {
				//	console.log(Object.getOwnPropertyDescriptor(row, 'major').value+ " : "+ sum);
				result.push({
					key : count,
					major : Object.getOwnPropertyDescriptor(row, 'major').value,
					point : sum
				});
				count = count + 1;
			}
		});
		addSectorPoint(data.msTinh,data.msHuyen,data.msTruong,result,function(err,result){
			callback(null,result);
		})

	});
} 		

function addSectorPoint(msTinh,msHuyen,msTruong,result,callback){
	con.query("SELECT KhuVuc FROM uacs.thpt Where msTinh = "+msTinh+" and msHuyen = "+msHuyen+" and msTruong = " + msTruong,function(err,rows){
		if (rows[0].KhuVuc == "KV1"){
			result.forEach(function(row){
				row.point += 1.5;
			});
		}
		else if (rows[0].KhuVuc == "KV2"){
			result.forEach(function(row){
				row.point += 0.5;
			});
		}
		else if (rows[0].KhuVuc == "KV2NT"){
			result.forEach(function(row){
				row.point += 1;
			});
		}
		else {
		}
		callback(null,result);
	});
}