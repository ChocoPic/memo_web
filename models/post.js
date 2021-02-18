var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    room: {
        type: String,
        required:true
        },
    item:{
        type:String, 
        required:true
    },
    memo:{
        type:String, 
        required:true
    },
});
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;