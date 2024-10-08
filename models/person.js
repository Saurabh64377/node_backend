const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//define person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function (next) {

    const person = this;
    //hash the password only if it has been modified(or is new)
    if (!person.isModified('password')) return next()

    try {
        //hash password generation
        // const salt  = "hello dude"   its not a better practice
        const salt = await bcrypt.genSalt(10)

        //hash password
        const hashPassword = await bcrypt.hash(person.password, salt)
        //override the plain password with the hashed one

        person.password = hashPassword;
        next()
    } catch (error) {
        return next(error)

    }
})

personSchema.methods.comparePassword = async function (canidatePassword) {
    try {
        //use bcrypt to compare the provide password with the hashed passwod
        const isMatch = await bcrypt.compare(canidatePassword, this.password)
        return isMatch;
    } catch (error) {
        throw error;

    }

}

//create person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;