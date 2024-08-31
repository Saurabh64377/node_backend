const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isSpicy:{
        type:Boolean,
        default:false
    },
    menu:{
        type:[String],
        required:true
    },
    items:{
        type:String,
        enum:['apple','orange','banana'],
        required:true
    },
    sales:{
        type:Number,
        default:0
    }
    
})

const MenuItem = mongoose.model('MenuItem', menuSchema)
module.exports=MenuItem;
