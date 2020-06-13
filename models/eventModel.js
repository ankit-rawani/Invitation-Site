var mongoose = require('mongoose')

var eSch = mongoose.Schema({
    date: { type: String },
    time: { type: String },
    host: { type: String },
    host_id: { type: String },
    description: { type: String },
    name: { type: String }
})

module.exports = mongoose.model('eventDB', eSch)