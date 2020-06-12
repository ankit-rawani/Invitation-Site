var mongoose = require('mongoose')

var inviteSch = mongoose.Schema({
    date: {type: String},
    time: {type: String}, 
    invitation: {type: String},
    host: {type: String},
    description: {type: String},
    name: {type: String},
    participant: {type: String}
})

module.exports = mongoose.model('invitationDB', inviteSch)