const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Email = require("../models/user-profile.js");
const { ensureAuthenticated } = require("../config/auth.js");

//model
var curUser;
var Post; 
var PostSchema = new mongoose.Schema({
   room: { type: String, required: true },
   item: { type: String, required: true },
   memo: { type: String, required: true },
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
   //console.log(curUser.username + " " + curUser.created);
   Post.find({})
      .sort([['room', 1], ['item', 1]])
      .exec(function (err, posts) {
         if (err) return res.json(err);
         else {
            console.log(posts);//
            res.render('dashboard', {
               user: req.user,
               datas: posts
            });
         }
      });
})

router.get('/new', (req, res) => {
   Post.find({})
      .distinct('room')
      .exec(function (err, posts) {
         if (err) return res.json(err);
         res.render('boards/new', {
            datas: posts
         });
      });
})

router.post('/', (req, res) => {
   const { room, item, memo } = req.body;
   console.log(room + " " + item + " " + memo + " ");
   if (!room) {
      console.log("카테고리를 선택하세요");
   } else if (!item) {
      console.log('아이템을 입력하세요');
   } else {
      Post.findOne(curUser.username, { room: room, item: item, memo: memo }).exec((err, data) => {
         console.log(data);
         if (data) {
            console.log("이미 존재합니다.");
         } else {
            const newItem = new Post({
               room: room,
               item: item,
               memo: memo
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

router.get('/edit', (req, res) => {
   res.render('boards/edit');
})


module.exports = router;