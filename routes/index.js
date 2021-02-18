const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth.js");
var Email = require('../models/user-profile.js');
var Post = require('../models/post.js');
var mongoose = require('mongoose');

//login page
router.get('/', (req, res) => {
    res.render('welcome');
})

//register page
router.get('/register', (req, res) => {
    res.render('register');
})


//Post 컬렉션에서 로그인한 email에 해당하는 db에서 room별로 전부 불러옴
//const query = Post.find({ room : 방이름 }).sort(가나다순);
router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
    Email.email = req.user.email;
    mongoose
        .connect(process.env.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            dbName: Email.email // 이 이름으로 db가 생성됩니다.
        })
        .then(() => console.log(`user mongoDB connected`))
        .catch((err) => console.error(err));
    Post.find({})
        .sort('room:1, stuff: 1')
        .exec(function (err, posts) {
            if (err) return res.json(err);
            res.render('dashboard', { 
                user: req.user,
                datas: posts
             });
        });
})
module.exports = router; 