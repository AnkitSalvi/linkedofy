# linkedofy  
Steps to run the project locally:    

DEPENDENCIES  
1)Clone the project and change the directory to src and run "npm install".  
2)Run npm init.  
3)Run npm install --save express@4.17.1 mysql@2.18.1 body-parser@1.19.0  

To install swagger:
1) Run npm install swagger-jsdoc swagger-ui-express


DB CREATION  
1) Run the "dbscript" file in db folder in you sql editor to make the tables.  
2) Copy and paste the stored procedures from the folder.  


Run mysql local server at port 3306 to connect to the db.  
Run "nodemon APIs.js" to start the express server and connect to db.  
Testing the Apis - url http://localhost:3000/Linkedofy

