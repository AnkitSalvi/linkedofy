mysql = require('mysql');
//const express = require('express');
//var app = express();
//var bodyParser = require('body-parser')

//app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
	multipleStatements: true
});


mysqlConnection.connect((err)=>{
	if(!err)
	console.log('DB connection succedded');
	else
	console.log('DB connection failed \n Error :' + JSON.stringify(err,undefined,2));
});


//Post user method for Auto Connect
function postuser(license,name,email,expiry,plan,batch_id,activity_date,module,activity_status,pages,profile_urls,last_updated,withdrawn){
	var i,profile_url;

	var sql1 = "SET @license = ?; SET @name=?; SET @email=?; SET @expiry=?; SET @plan=?;\
	CALL USERADDOREDIT(@license,@name,@email,@expiry,@plan);";
	mysqlConnection.query(sql1,[license,name,email,expiry,plan], (err,rows,fields)=>{
		if(!err)
			console.log('user Inserted Successfully');
		else
			console.log(err);
	})

	var sql2 = "SET @license = ?; SET @batch_id=?; SET @activity_date=?; SET @module=?; SET @activity_status=?; SET @pages=?; \
	CALL ACTIVITYADD(@license,@batch_id,@activity_date,@module,@activity_status,@pages);";
	mysqlConnection.query(sql2,[license,batch_id,activity_date,module,activity_status,pages], (err,rows,fields)=>{
		if(!err)
			console.log('Activity Inserted Successfully');
		else
			console.log(err);
	})

	for(i=0;i<profile_urls.length;i++){
	profile_url=profile_urls[i];
	var sql3 = "SET @license = ?;SET @batch_id=?; SET @profile_url=?;  SET @last_updated=?; SET @withdrawn=?;\
	CALL INVITEADD(@license,@batch_id,@profile_url,@last_updated,@withdrawn);";
	mysqlConnection.query(sql3,[license,batch_id,profile_url,last_updated,withdrawn], (err,rows,fields)=>{
		if(!err)
			console.log('Invite Inserted Successfully');
		else
			console.log(err);
	})
	}
}

//urls = ["rex@linkdin.com","rom@linkdin.com"]
//postuser("8","rem",["rem@gmail.com"],"","",1,"","auto_connect","","",urls,"","");
//getuser("8");
//Get User Method from the table for Auto-Connect
function getuser(license){
	var sql = "SET @license = ?;\
	CALL USERGET(@license);";
	mysqlConnection.query(sql,[license], (err,rows,fields)=>{
		if(!err)
			console.log(rows[1]);
		else
			console.log(err);
	})
}

//Delete user from the table 
function deleteuser(license,profile_urls){

	var profile_url;
	for(i=0;i<profile_urls.length;i++)
	{	
		profile_url=profile_urls[i];
		var sql = "SET @license = ?;SET @profile_url=?;\
		CALL USERDELETE(@license,@profile_url);";
		mysqlConnection.query(sql,[license,profile_url], (err,rows,fields)=>{
			if(!err)
				{
					console.log('delete_user Successfully');
				}
			else
				console.log(err);
		})
	}
}

//var urls = ["rex@linkdin.com","rom@linkdin.com"];
//deleteuser("8",urls);

var messages = [
	{
		"mgsId": "1",
		"title": "hey",
		"body": "hey what's up",
		"profile_urls":  ["ankit.com","mohit.com","purva.com"],
		"lastUsed": "",
		"saved": "",
		"category": "",
		"mgs_status":""
	},


	{
		"mgsId": "2",
		"title": "sunny",
		"body": "sunny day",
		"profile_urls":  ["kit.com","hit.com","rva.com"],
		"lastUsed": "",
		"saved": "",
		"category": "",
		"mgs_status":""
	}
		
]


//Post message for the Broadcast API
function postmgs(license,batch_id,activity_date,module,activity_status,pages,messages)
{		
	var sql1 = "SET @license = ?; SET @batch_id=?; SET @activity_date=?; SET @module=?; SET @activity_status=?; SET @pages=?; \
	CALL ACTIVITYADD(@license,@batch_id,@activity_date,@module,@activity_status,@pages);";
	mysqlConnection.query(sql1,[license,batch_id,activity_date,module,activity_status,pages], (err,rows,fields)=>{
		if(!err)
			console.log('Activity Inserted Successfully');
		else
			console.log(err);
	})

	var i,profile_url,mgs;
	
	for(i=0;i<messages.length;i++)
	{
		mgs=messages[i];

		var sql2 = "SET @license=?; SET @mgsId=?; SET @title=?; SET @body=?; SET @lastUsed=?; SET @saved=?; SET @category=?;\
		CALL MGSADD(@license,@mgsId,@title,@body,@lastUsed,@saved,@category);";
		mysqlConnection.query(sql2,[license,mgs.mgsId,mgs.title,mgs.body,mgs.lastUsed,mgs.saved,mgs.category], (err,rows,fields)=>{
		if(!err)
			console.log('Mgs Inserted Successfully');
		else
			console.log(err);
		})
		
		for(j=0;j<messages[i].profile_urls.length;j++)
		{
			profile_url = messages[i].profile_urls[j];

			var sql3 = "SET @license=?; SET @batch_id=?; SET @mgsId=?; SET @profile_url=?; SET @mgs_status=?;\
			CALL MGSSENTADD(@license,@batch_id,@mgsId,@profile_url,@mgs_status);";
			mysqlConnection.query(sql3,[license,batch_id,mgs.mgsId,profile_url,mgs.mgs_status], (err,rows,fields)=>{
				if(!err)
					console.log('MgsSent Inserted Successfully');
				else
					console.log(err);
			})
		}

	}

}

//postmgs("8",2,"","broadcast","","",messages);

//Get message from the message table
function getmgs(license){
	var sql = "SET @license = ?;\
	CALL MGSGET(@license);";
	mysqlConnection.query(sql,[license], (err,rows,fields)=>{
		if(!err)
			{console.log('getmgs Successfully');
			console.log(rows[1]);}
		else
			console.log(err);
	})
}
getmgs("8");
