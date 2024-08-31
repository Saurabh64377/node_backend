const express = require('express')
const Person = require('../models/person')
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body  // assing the request body contains the person data 

        //create a new person document using the mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const savedData = await newPerson.save()
        console.log("data saved")
        res.status(200).send(savedData)

    } catch (error) {
        res.status(500).json({ error: "server error" })

    }
})


router.get('/', async (req, res) => {
    try {
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
            if(response.length===0){
                res.send(`${workType} role type does not existed`)
            }
           else{
            console.log("data fetched")
            res.status(200).send(response)
           }
        }
        else {
            res.status(404).send("invalid work type")
        }
    } catch (error) {
            res.status(404).json({error:"internal server error", error})
    }

})

  //update document

  router.put('/:id',async(req,res)=>{
        try {
            const objectid = req.params.id;
            const updatePerson = req.body;

            // if (!mongoose.Types.ObjectId.isValid(objectid)) {
            //     return res.status(400).json({ error: "Invalid ID format" });
            // }

            const response = await Person.findByIdAndUpdate(objectid,updatePerson,{
                new:true ,           //return the updated document
                runValidators:true,  //Run mongoose validations
            });
            if(!response){
                 res.status(404).send("person not found")
            }
            console.log("data updated")
            res.status(200).json(response)

            
        } catch (error) {
            res.status(404).json({error:"server error"})
            
        }
  })


  //delete any document data

  router.delete('/:id', async(req,res)=>{
    try {

        const personId = req.params.id;

        //delete document
        const deletePerson = await Person.findByIdAndDelete(personId);
        if(!deletePerson){
            return res.status(404).json({error:'person not found'})
        }
        console.log("data deleted")
        res.status(200).json({message:"person deleted successfully"})
    } catch (error) {
        res.status(500).json("internal server error")
        
    }

  })

module.exports = router;