
//const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi =  require('swagger-ui-express');
const swaggerDocument =  require('./swagger.json');



module.exports = (app) => {
	require("./controllers/auto-connect.ctrl.js")(app);
	require("./controllers/broadcast.ctrl.js")(app);
	app.use("/linkedofy", swaggerUi.serve,swaggerUi.setup(swaggerDocument));

}