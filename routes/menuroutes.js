const express = require('express')
const MenuItem = require('..//models/menuitems')
const router = express.Router();


router.post('/' , async(req,res)=>{
    try {
        const menudaata = req.body;

        const newMenuitem = new MenuItem(menudaata);

        const saveitem = await newMenuitem.save()
        console.log("menuitems saved")
        res.status(200).json(saveitem)


    } catch (error) {
        res.status(500).json({message:"internal server error"})
        
    }
})

router.get('/', async(req,res)=>{
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems)
        
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        
    }
})
//export router  
module.exports = router

