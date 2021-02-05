const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/auth.js");

//login page
router.get('/', (req,res)=>{
    res.render('welcome',{ styleNum: '0' });
})

//register page
router.get('/register', (req,res)=>{
    res.render('register', { styleNum: '1' });
})

module.exports = router; 

router.get('/dashboard',ensureAuthenticated, (req,res)=>{
    res.render('dashboard',{
        user: req.user
        });
    })