const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Email = require("../models/user-profile.js");
const { ensureAuthenticated } = require("../config/auth.js");

//model
var curUser;
var Post; 
var PostSchema = new mongoose.Schema({
   title: { type: String, required: true },
   memo: { type: String, required: true },
   createdAt: { type: Date, default: Date.now},
});
var models = {};
var getModel = (collectionName) => {
   if (!(collectionName in models)) {
      models[collectionName] = mongoose.connection.model(
         collectionName, PostSchema, collectionName
      );
   }
   console.log("컬렉션이름 " + collectionName);
   return models[collectionName];
};

//pages
router.get('/', ensureAuthenticated, (req, res) => {
   curUser = new Email({
      username: req.user.email,
      created: Date.now()
   })
   Post = getModel(curUser.username);
   console.log(curUser.username + " " + curUser.created);
   Post.find({})
      .sort('-createdAt')
      .exec(function (err, posts) {
         if (err) return res.json(err);
         else {
            console.log(posts);
            res.render('dashboard', {
               user: req.user,
               datas: posts
            });
         }
      });
})

//새 메모
router.get('/new', (req, res) => {
   Post.find({})
      //.distinct('title')
      .exec(function (err, posts) {
         if (err) return res.json(err);
         res.render('boards/new', {
            datas: posts
         });
      });
})
//저장
router.post('/', (req, res) => {
   const { title, memo, createdAt } = req.body;
   console.log(title + " " + memo + " " + createdAt + " ");
   if (!title) {
      console.log("제목을 입력하세요");
   } else if (!memo) {
      console.log("내용을 입력하세요");
   } else {
      Post.findOne({ title: title, memo: memo, createdAt: createdAt }).exec((err, data) => {
         console.log(data);
         if (data) {
            console.log("이미 존재합니다.");
         } else {
            const newItem = new Post({
               title: title,
               memo: memo,
               createdAt: createdAt
            });
            newItem.save()
               .then((value) => {
                  console.log(value);
                  res.redirect('/dashboard');
               }).catch(value => console.log(value));
         }
      });
   }
});

//자세히보기
router.get('/:id', function(req, res)  {
   Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('boards/show', {
         post: post
      });
   })
})

//수정
router.get('/:id/edit', (req, res) => {
   Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('boards/edit', {
         post: post
      });
   });
});
//업데이트
router.put('/:id', function(req, res) {
   req.body.createdAt = Date.now();
   Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect("/dashboard/"+ req.params.id);
   });
});

//삭제
router.delete('/:id', function(req, res){
   console.log("삭제!!");
   Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/dashboard');
   });
});

module.exports = router;