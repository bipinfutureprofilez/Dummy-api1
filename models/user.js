
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email!'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter correct email!'],
        unique: true,
    },
    userImage:{
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: [true, 'Please create password!'],
    }
})

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

module.exports = mongoose.model('user', userSchema);