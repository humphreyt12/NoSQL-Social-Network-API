//Run npm install the required packages
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes'); //Require routes
const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// Built in Express function that parses incoming requests to JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


 // Start up express server  
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
});