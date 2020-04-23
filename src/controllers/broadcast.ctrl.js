module.exports = (app) => {
	
	var mysqlConnection = require("../db/db.connection.js");

	app.post('/broadcast',(req,res)=>{
	{
		let profile_urls=req.body.messages;

		var sql1 = "SET @license = ?; SET @campaign_id=?; SET @campaign_date=?; SET @module=?; SET @status=?; SET @pages=?; \
		CALL CAMPAIGNPOST(@license,@campaign_id,@campaign_date,@module,@status,@pages);";
		mysqlConnection.query(sql1,[req.body.license,req.body.campaign_id,req.body.campaign_date,req.body.module,req.body.status,req.body.pages], (err,rows,fields)=>{
			if(!err)
				console.log('campaign Inserted Successfully');
			else
				console.log(err);
		})

		var i,profile_url,mgs;

		let messages = req.body.messages
		for(i=0;i<messages.length;i++)
		{
			mgs=messages[i];

			var sql2 = "SET @license=?; SET @messages_template_id=?; SET @title=?; SET @body=?; SET @lastUsed=?; SET @saved=?;\
			CALL MGSPOST(@license,@messages_template_id,@title,@body,@lastUsed,@saved);";
			mysqlConnection.query(sql2,[req.body.license,mgs.messages_template_id,mgs.title,mgs.body,mgs.lastUsed,mgs.saved], (err,rows,fields)=>{
			if(!err)
				console.log('Mgs Inserted Successfully');
			else
				console.log(err);
			})

			for(j=0;j<messages[i].profile_urls.length;j++)
			{
				profile_url = messages[i].profile_urls[j];
				//console.log(profile_url);
				var sql3 = "SET @license=?; SET @campaign_id=?; SET @messages_template_id=?; SET @profile_url=?; SET @mgs_status=?;\
				CALL BROADCASTPOST(@license,@campaign_id,@messages_template_id,@profile_url,@mgs_status);";
				mysqlConnection.query(sql3,[req.body.license,req.body.campaign_id,mgs.messages_template_id,profile_url,mgs.mgs_status], (err,rows,fields)=>{
					if(!err)
						console.log('MgsSent Inserted Successfully');
					else
						console.log(err);
				})
			}


		}

	}

	res.status(200).send();
	});

	app.get('/broadcast/:license',(req,res)=>{
		var sql = "SET @license = ?;\
		CALL BROADCASTGET(@license);";
		mysqlConnection.query(sql,[req.params.license], (err,rows,fields)=>{
			if(!err)
				{res.send(rows[1]);
				console.log(rows);}
			else
				console.log(err);

		})

	});

}