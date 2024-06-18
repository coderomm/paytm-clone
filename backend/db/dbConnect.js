const mongoose = require("mongoose");
require('dotenv').config()

async function dbConnect() {
    mongoose.connect(
        process.env.DB_URL
    )
        .then(() => {
            console.log('Successfully connected to MongoDB Atlas!');
        })
        .catch((error) => {
            console.log('Unable to connect to MongoDb Atlas!');
            console.log('error: ', error);
        });
}

module.exports = dbConnect;