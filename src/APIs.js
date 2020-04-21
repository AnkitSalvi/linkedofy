mysql = require('mysql');
const express = require('express');
var app = express();
var bodyParser = require('body-parser')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi =  require('swagger-ui-express');

const port = 3000;
app.use(bodyParser.json());



const swaggerOptions = {
	swaggerDefinition:
	{
		info:
		{
			title: 'Linkedofy API',
			description: "Linkedofy Api information",
			server: ["http://localhost:3000"]
		}
	
	},
	apis: ["put_auto_connect.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/linkedofy", swaggerUi.serve,swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /autoconnect_get/{license}:
 *  get:
 *    description: Use to request all customers
 *	   parameters:
 *       - in: path
 *         name: license 
 *         schema:
 *           type: string
 *         required: true
 *    responses:
 *      '200':
 *        description: A successful response
 * /withdraw_invite_post:
 *  delete:
 *    description: Use to request all customers
 *	   parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "order placed for purchasing the pet"
 *         required: true
 *         schema:
 *           type: object
 *    responses:
 *      '200':
 *        description: A successful response
 * /autoconnect_post:
 *  post:
 *    description: Use to request all customers
 *	   parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "order placed for purchasing the pet"
 *         required: true
 *         schema:
 *           type: object
 *    responses:
 *      '200':
 *        description: A successful response
 * /broadcast_post:
 *  post:
 *    description: Use to request all customers
 *	   parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "order placed for purchasing the pet"
 *         required: true
 *         schema:
 *           type: object
 *    responses:
 *      '200':
 *        description: A successful response
 * /broadcast_get/{license}:
 *  get:
 *    description: Use to request all customers
 *	   parameters:
 *       - in: path
 *         name: license 
 *         schema:
 *           type: string
 *         required: true
 *    responses:
 *      '200':
 *        description: A successful response
 
 */


var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'linkedofy',
	multipleStatements: true
});



mysqlConnection.connect((err)=>{
	if(!err)
	console.log('DB connection succedded');
	else
	console.log('DB connection failed \n Error :' + JSON.stringify(err,undefined,2));
});



//function postuser(license,name,email,expiry,plan,campaign_id,campaign_date,module,status,pages,profile_urls,last_updated,withdrawn){
app.post('/autoconnect_post',(req,res)=>{
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
	res.send("user inserted successfully");
});






app.get('/autoconnect_get/:license',(req,res)=>{
	var sql = "SET @license = ?;\
	CALL AUTOCONNECTGET(@license);";
	console.log(req.params.license);
	mysqlConnection.query(sql,[req.params.license],(err,rows,fields)=>{
		if(!err)
			res.send(rows[1]);
		else
			console.log(err);
	})
});


//function deleteuser(license,profile_urls){
app.delete('/withdraw_invite_post',(req,res)=>{
	let profile_urls=req.body.profile_urls;
	var profile_url;
	console.log(profile_urls.length);
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





//function postmgs(license,campaign_id,activity_date,module,activity_status,pages,messages)
app.post('/broadcast_post',(req,res)=>{
{		
	let profile_urls=req.body.messages;
	//console.log(profile_urls);
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

res.send("successful");
});

app.get('/broadcast_get/:license',(req,res)=>{
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

app.listen(port, () =>{
	console.log('Server listening on port ${port}');
});




//app.listen(3000,()=>console.log('Express server is running at port : 3000'));

