const express = require('express')
const bodyparser = require('body-parser')
const passport = require('./auth/authn')
require('dotenv').config();
const db = require('./db')

const app = express();

//custom middleware function
// const logDetails = (req,res,next)=>{
//     console.log(`[${new Date().toLocaleDateString()} request has come from this base url ${req.originalUrl}]`)
//     next()   
// }

//passprt middleware
app.use(passport.initialize())


app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//call custom middleare function for all routes
// app.use(logDetails)

const PORT = process.env.PORT || 3001;


//using passport authentication 
const passprtAuth = passport.authenticate('local' , {session:false});
app.get('/',  (req, res) => {
    res.send('Welcome to my hotel ...how can i help you ?')
})


//import router module

const peraonRoutes = require('./routes/personroutes')
const menuRoutes = require('./routes/menuroutes')


app.use('/person',peraonRoutes)
app.use('/menu',menuRoutes)

app.listen(PORT, () => {
    console.log(`hey i am listeing on port ${PORT}`)
})
