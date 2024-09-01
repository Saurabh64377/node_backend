const mongoose = require('mongoose')
require('dotenv').config()

//define mongodb url
const mongoURL = process.env.MONGODB_URL_LOCAL;

//setup momgodb coonection

mongoose.connect(mongoURL,{
    useNewUrlParser :true,
    useUnifiedTopology:true

})

//get the default connection
//mongoose maintains a default coonection object represting the mongodb connection

const db = mongoose.connection;

//define event listeners for database coonection

db.on('connected',()=>{
    console.log("connected to  mongodb")
})

db.on('error',()=>{
    console.log("mongodb connection error")
})

db.on('disconnected',()=>{
    console.log("disconnected to  mongodb")
})

//exports the database coonection

module.exports = db;