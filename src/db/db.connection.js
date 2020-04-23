const mysql = require('mysql');
const dbConfig = require("./db.config.js");




const mysqlConnection = mysql.createConnection(dbConfig);


	mysqlConnection.connect((err)=>{
	if(!err)
		console.log('DB connection succedded');
	else
		console.log('DB connection failed \n Error :' + JSON.stringify(err,undefined,2));
});
	module.exports = mysqlConnection;
