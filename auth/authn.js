const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('../models/person');


//using local-passport for authentication
passport.use(new localStrategy(
    async(username,password,done)=>{
    //authentication logic here
    try {
        // console.log(`Recieved credentials :`, username,password)
        const user  = await Person.findOne({username:username});

        if(!user){
            return done(null ,false , {message:'incorrect username'})
        }

        // const isPasswordMatch = user.password===password ? true:false;
        const isPasswordMatch = await user.comparePassword(password);

        if(isPasswordMatch){
            return done(null ,user)
        }
        else{
            return done(null, false, {message:'incorrect password'})
        }
    } catch (error) {
        return done(err)       
    }
}))


module.exports=passport;