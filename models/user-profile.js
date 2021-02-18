var mongoose = require('mongoose');
var emailSchema = new mongoose.Schema({
    email: {
        type: String,
        },
});
var Email = mongoose.model('Email', emailSchema);

module.exports = Email;