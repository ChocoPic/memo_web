var mongoose = require('mongoose');
var emailSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Useremail is required']
        },
    created: {
        type: Date,
        required: [true, 'Created date is required']
    }
});
var Email = mongoose.model('Email', emailSchema);

module.exports = Email;