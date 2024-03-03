// Run npm install and require mongoose
const { connect, connection } = require('mongoose');

// Connection string to local instance of MongoDB
const connectionString = 'mongodb://127.0.0.1:27017/socialnetworkDB';

connect(connectionString);

module.exports = connection;