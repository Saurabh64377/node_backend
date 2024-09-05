const express = require('express')
const Person = require('../models/person')
const bcrypt = require('bcrypt');

const router = express.Router();
const {
    jwtAuthMiddleware,
    generateToken
} = require('../jwt')

router.post('/', async (req, res) => {
    try {
        const data = req.body  // assing the request body contains the person data 

        //create a new person document using the mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const savedData = await newPerson.save()
        console.log("data saved")
        //generate token 
        const payload = {
            id:savedData.id,
            username:savedData.username
        }
        const token = generateToken(payload)

        console.log(token)
        res.status(200).json({savedData:savedData,token:token})

    } catch (error) {
        res.status(500).json({ error: "server error" })

    }
})

//profile route

router.get('/profile',jwtAuthMiddleware, async(req,res)=>{
    try {
        const userData  = req.user;
        console.log(userData)

        const responsee = await Person.find({username:userData})
        res.status(200).json({responsee})

    } catch (error) {
        res.status(500).json({ error: "server error" })
        
    }
})

//login route

router.post('/login', async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user  = await Person.findOne({username:username})

        if(!user) return res.status(401).send("username does not exist")

            const invalidpass = bcrypt.compareSync(password, user.password)
            if(!invalidpass) return res.status(401).send("invalid password");
        
    //    const invalidPassword = await user.comparePassword(password);
    //    if(!invalidPassword) return res.status(401).send("invalid password");

       //generate token
        
       const payload = {
        id:user.id,
        username:user.username
       }

       const  token = generateToken(payload)
        res.status(200).send({token})
        
    } catch (error) {
        res.status(401).json({message:"inernal server error"})
        
    }
})

router.get('/', jwtAuthMiddleware,  async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ error: 'token not provided' });
        const data = await Person.find();
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send(error)

    }
})

router.get('/:work', async (req, res) => {

    try {
        const workType = req.params.work;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType })
            if (response.length === 0) {
                res.send(`${workType} role type does not existed`)
            }
            else {
                console.log("data fetched")
                res.status(200).send(response)
            }
        }
        else {
            res.status(404).send("invalid work type")
        }
    } catch (error) {
        res.status(404).json({ error: "internal server error", error })
    }

})

//update document

router.put('/:id', async (req, res) => {
    try {
        const objectid = req.params.id;
        const updatePerson = req.body;

        // if (!mongoose.Types.ObjectId.isValid(objectid)) {
        //     return res.status(400).json({ error: "Invalid ID format" });
        // }

        const response = await Person.findByIdAndUpdate(objectid, updatePerson, {
            new: true,           //return the updated document
            runValidators: true,  //Run mongoose validations
        });
        if (!response) {
            res.status(404).send("person not found")
        }
        console.log("data updated")
        res.status(200).json(response)


    } catch (error) {
        res.status(404).json({ error: "server error" })

    }
})


//delete any document data

router.delete('/:id', async (req, res) => {
    try {

        const personId = req.params.id;

        //delete document
        const deletePerson = await Person.findByIdAndDelete(personId);
        if (!deletePerson) {
            return res.status(404).json({ error: 'person not found' })
        }
        console.log("data deleted")
        res.status(200).json({ message: "person deleted successfully" })
    } catch (error) {
        res.status(500).json("internal server error")

    }

})

module.exports = router;