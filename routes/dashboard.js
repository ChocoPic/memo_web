/*var express = require('express');
var router = express.Router();
var Email = require('../models/user-profile.js');
var Post = require('../models/post.js');
var mongoose = require('mongoose');

//Post 컬렉션에서 로그인한 email에 해당하는 db에서 room별로 전부 불러옴
//const query = Post.find({ room : 방이름 }).sort(가나다순);


router.post('/dashboard', (req, res) => {
    console.log('대시보드 포스트');
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
            res.render('dashboard.ejs', { 
                user: req.user,
                datas: posts
             });
        });
});*/
/*
//new
router.get('/new', function (req, res) {
    res.render('posts/new');
});

//create
router.post('/', function (req, res) {
    Post.create(req.body, function (err, post) {
        if (err) return res.json(err);
        res.redirect('/posts');
    });
});

//show
router.get('/:id', function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, post) {
        if (err) return res.json(err);
        res.render('posts/show', { post: post });
    });
});

//edit
router.get('/:id/edit', function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, post) {
        if (err) return res.json(err);
        res.render('posts/edit', { post: post });
    });
});

//update
router.put('/:id', function (req, res) {
    req.body.updatedAt = Date.now(); //2
    Post.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, post) {
        if (err) return res.json(err);
        res.redirect("/posts/" + req.params.id);
    });
});

//delete
router.delete('/:id', function (req, res) {
    Post.deleteOne({ _id: req.params.id }, function (err) {
        if (err) return res.json(err);
        res.redirect('/posts');
    });
});

module.exports = router;

function checkPermission(req, res, next) {
    Post.findOne({ _id: req.params.id }, function (err, post) {
        if (err) return res.json(err);
        next();
    });
}*/