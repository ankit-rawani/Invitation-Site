var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSch = mongoose.Schema({
    email:{
    type: String,     
    Required:  'Email address cannot be left blank.',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    index: {unique: true, dropDups: true}
    },
    password: {type: String, required: [true, 'Required']},
    name: {type: String, required: [true, 'Required']}
})

userSch.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSch.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

userSch.methods.updateUser = function (req, res) {
    this.email = req.body.email
    this.password = req.body.password
    this.name = req.body.name
    this.save()
    res.redirect('/')
}

module.exports = mongoose.model('User', userSch)