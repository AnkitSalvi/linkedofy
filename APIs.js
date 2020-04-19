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
app.use("/Linkedofy", swaggerUi.serve,swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /userget/{license}:
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
 * /deleteuser/{license}:
 *  delete:
 *    description: Use to request all customers
 *	   parameters:
 *       - in: path
 *         name: license
 *         schema:
 *           type: string
 *         required: true
 *       - in: "body"
 *         name: "body"
 *         description: "order placed for purchasing the pet"
 *         required: true
 *         schema:
 *           type: object
 *    responses:
 *      '200':
 *        description: A successful response
 * /postuser/{license}:
 *  post:
 *    description: Use to request all customers
 *	   parameters:
 *       - in: path
 *         name: license
 *         schema:
 *           type: string
 *         required: true
 *       - in: "body"
 *         name: "body"
 *         description: "order placed for purchasing the pet"
 *         required: true
 *         schema:
 *           type: object
 *    responses:
 *      '200':
 *        description: A successful response
 * /postmgs/{license}:
 *  post:
 *    description: Use to request all customers
 *	   parameters:
 *       - in: path
 *         name: license
 *         schema:
 *           type: string
 *         required: true
 *       - in: "body"
 *         name: "body"
 *         description: "order placed for purchasing the pet"
 *         required: true
 *         schema:
 *           type: object
 *    responses:
 *      '200':
 *        description: A successful response
 * /mgsget/{license}:
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

/*app.get("/customers", (req, res) =>{
	console.log("request");
	res.status(200).send("Customer results");
});
*/

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


app.get('/userget/:license',(req,res)=>{
	var sql = "SET @license = ?;\
	CALL USERGET(@license);";
	mysqlConnection.query(sql,[req.params.license],(err,rows,fields)=>{
		if(!err)
			res.send(rows[1]);
		else
			console.log(err);
	})
});


//function deleteuser(license,profile_urls){
app.delete('/deleteuser/:license',(req,res)=>{
	let profile_urls=req.body.profile_urls;
	var profile_url;
	console.log(profile_urls.length);
	for(i=0;i<profile_urls.length;i++)
	{	
		profile_url=profile_urls[i];
		console.log(profile_url);
		var sql = "SET @license = ?;SET @profile_url=?;\
		CALL USERDELETE(@license,@profile_url);";
		mysqlConnection.query(sql,[req.params.license,profile_url], (err,rows,fields)=>{
			if(!err)
				res.send('delete_user Successfully');
			else
				console.log(err);
		})
	}
});



//function postuser(license,name,email,expiry,plan,batch_id,activity_date,module,activity_status,pages,profile_urls,last_updated,withdrawn){
app.post('/postuser/:license',(req,res)=>{
	var i,profile_url;
	let profile_urls=req.body.profile_urls;
	var sql1 = "SET @license = ?; SET @name=?; SET @email=?; SET @expiry=?; SET @plan=?;\
	CALL USERADDOREDIT(@license,@name,@email,@expiry,@plan);";
	mysqlConnection.query(sql1,[req.params.license,req.body.name,req.body.email,req.body.expiry,req.body.plan], (err,rows,fields)=>{
		if(!err)
			console.log('user Inserted Successfully');
		else
			console.log(err);
	})

	var sql2 = "SET @license = ?; SET @batch_id=?; SET @activity_date=?; SET @module=?; SET @activity_status=?; SET @pages=?; \
	CALL ACTIVITYADD(@license,@batch_id,@activity_date,@module,@activity_status,@pages);";
	mysqlConnection.query(sql2,[req.params.license,req.body.batch_id,req.body.activity_date,req.body.module,req.body.activity_status,req.body.pages], (err,rows,fields)=>{
		if(!err)
			console.log('Activity Inserted Successfully');
		else
			console.log(err);
	})

	for(i=0;i<profile_urls.length;i++){
	profile_url=profile_urls[i];
	var sql3 = "SET @license = ?;SET @batch_id=?; SET @profile_url=?;  SET @last_updated=?; SET @withdrawn=?;\
	CALL INVITEADD(@license,@batch_id,@profile_url,@last_updated,@withdrawn);";
	mysqlConnection.query(sql3,[req.params.license,req.body.batch_id,profile_url,req.body.last_updated,req.body.withdrawn], (err,rows,fields)=>{
		if(!err)
			console.log('Invite Inserted Successfully');
		else
			console.log(err);
	})
	}
	res.send("user inserted successfully");
});


//function postmgs(license,batch_id,activity_date,module,activity_status,pages,messages)
app.post('/postmgs/:license',(req,res)=>{
{		
	let profile_urls=req.body.messages;
	//console.log(profile_urls);
	var sql1 = "SET @license = ?; SET @batch_id=?; SET @activity_date=?; SET @module=?; SET @activity_status=?; SET @pages=?; \
	CALL ACTIVITYADD(@license,@batch_id,@activity_date,@module,@activity_status,@pages);";
	mysqlConnection.query(sql1,[req.params.license,req.body.batch_id,req.body.activity_date,req.body.module,req.body.activity_status,req.body.pages], (err,rows,fields)=>{
		if(!err)
			console.log('Activity Inserted Successfully');
		else
			console.log(err);
	})

	var i,profile_url,mgs;
	
	let messages = req.body.messages
	for(i=0;i<messages.length;i++)
	{
		mgs=messages[i];

		var sql2 = "SET @license=?; SET @mgsId=?; SET @title=?; SET @body=?; SET @lastUsed=?; SET @saved=?; SET @category=?;\
		CALL MGSADD(@license,@mgsId,@title,@body,@lastUsed,@saved,@category);";
		mysqlConnection.query(sql2,[req.params.license,mgs.mgsId,mgs.title,mgs.body,mgs.lastUsed,mgs.saved,mgs.category], (err,rows,fields)=>{
		if(!err)
			console.log('Mgs Inserted Successfully');
		else
			console.log(err);
		})
		
		for(j=0;j<messages[i].profile_urls.length;j++)
		{
			profile_url = messages[i].profile_urls[j];
			//console.log(profile_url);
			var sql3 = "SET @license=?; SET @batch_id=?; SET @mgsId=?; SET @profile_url=?; SET @mgs_status=?;\
			CALL MGSSENTADD(@license,@batch_id,@mgsId,@profile_url,@mgs_status);";
			mysqlConnection.query(sql3,[req.params.license,req.body.batch_id,mgs.mgsId,profile_url,mgs.mgs_status], (err,rows,fields)=>{
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

app.get('/mgsget/:license',(req,res)=>{
	var sql = "SET @license = ?;\
	CALL MGSGET(@license);";
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

