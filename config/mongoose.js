const mongoose = require('mongoose');

// Connect to the MongoDB database named "codezera_dev" on the local machine
mongoose.connect('mongodb://127.0.0.1/codezera_dev');

// Get the default connection object
const db = mongoose.connection;

// Event listener for connection errors
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// Event listener for successful connection
db.once('open', () => {
    console.log('Connected to Database :: MongoDB');
});

// Export the connection object
module.exports = db;
