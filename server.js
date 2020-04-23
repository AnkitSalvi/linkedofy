const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// parse requests of content-type: application/json
app.use(bodyParser.json());


require("./src/api.js")(app);


// set port, listen for requests
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

