const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const passport = require('passport');

/* login handle */
router.get('/login', (req, res) => {
  res.render('login');
})
router.get('/register', (req, res) => {
  res.render('register');
})

/* register handle */
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  console.log(' Name ' + name + ' email :' + email + ' pass:' + password);
  //빈칸이 있나?
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "빈 칸을 채워주세요" })
  }
  //비밀번호가 일치?
  if (password !== password2) {
    errors.push({ msg: "비밀번호가 일치하지 않습니다" });
  }
  //6자 이상?
  if (password.length < 6) {
    errors.push({ msg: "비밀번호는 6자 이상 가능합니다" })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2
    });
  }
  else {
    User.findOne({ email: email }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: "이미 존재하는 이메일입니다" });
        render(res, errors, name, email, password, password2);
      }
      else {
        const newUser = new User({
          name: name,
          email: email,
          password: password
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then((value) => {
                  console.log("value값: " + value);
                  req.flash('success_msg', "회원가입이 완료되었습니다!")
                  res.redirect('/users/login');
                }).catch(value => console.log(value));
            }));
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
})
//logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', "로그아웃 완료!");
  res.redirect('/users/login');
})
module.exports = router;