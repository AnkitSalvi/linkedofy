module.exports = (app) => {
	
	var mysqlConnection = require("../db/db.connection.js");

	app.post('/autoconnect',(req,res)=>{
		var i,profile_url;
		let profile_urls=req.body.profile_urls;

		console.log("hii");
		var sql1 = "SET @license = ?; SET @campaign_id=?; SET @campaign_date=?; SET @module=?; SET @status=?; SET @pages=?; \
		CALL CAMPAIGNPOST(@license,@campaign_id,@campaign_date,@module,@status,@pages);";
		mysqlConnection.query(sql1,[req.body.license,req.body.campaign_id,req.body.campaign_date,req.body.module,req.body.status,req.body.pages], (err,rows,fields)=>{
			if(!err)
				console.log('Activity Inserted Successfully');
			else
				console.log(err);
		})

		for(i=0;i<profile_urls.length;i++){
		profile_url=profile_urls[i];
		var sql2 = "SET @license = ?;SET @campaign_id=?; SET @profile_url=?;  SET @last_updated=?; SET @withdrawn=?;\
		CALL AUTOCONNECTPOST(@license,@campaign_id,@profile_url,@last_updated,@withdrawn);";
		mysqlConnection.query(sql2,[req.body.license,req.body.campaign_id,profile_url,req.body.last_updated,req.body.withdrawn], (err,rows,fields)=>{
			if(!err)
				console.log('Invite Inserted Successfully');
			else
				console.log(err);
		})
		}
		res.status(200).send();
	});

	app.get('/autoconnect/:license',(req,res)=>{
		var sql = "SET @license = ?;\
		CALL AUTOCONNECTGET(@license);";
		console.log(req.params.license);
		mysqlConnection.query(sql,[req.params.license],(err,rows,fields)=>{
			if(!err){
				res.send(rows[1]);
			}
			else
				console.log(err);
		})
	});


	app.delete('/withdraw_invite_post',(req,res)=>{
		let profile_urls=req.body.profile_urls;
		var profile_url;
		console.log(req.body.license);
		console.log(profile_urls);
		for(i=0;i<profile_urls.length;i++)
		{	
			profile_url=profile_urls[i];
			console.log(profile_url);
			var sql = "SET @license = ?;SET @profile_url=?;\
			CALL WITHDRAWINVITEPOST(@license,@profile_url);";
			mysqlConnection.query(sql,[req.body.license,profile_url], (err,rows,fields)=>{
				if(!err)
					res.send('delete_user Successfully');
				else
					console.log(err);
			})
		}
	});
}