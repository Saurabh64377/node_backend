const express = require('express')
const bodyparser = require('body-parser')
const Person = require('./models/person')
require('dotenv').config();
const db = require('./db')



const app = express();
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
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
