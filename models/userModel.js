var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSch = mongoose.Schema({
    email: {
        type: String,
        Required: 'Email address cannot be left blank.',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        index: { unique: true, dropDups: true }
    },
    password: { type: String, required: [true, 'Required'] },
    name: { type: String, required: [true, 'Required'] },
    userid: { type: String, required: [true, 'Required'], index: {unique: true}}
})

module.exports = mongoose.model('User', userSch)