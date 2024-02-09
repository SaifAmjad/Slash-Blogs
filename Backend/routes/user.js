const express=require('express');
const { createUser, sendOtp, login, getUser, setCookie, checkUser,decode } = require('../controllers/user');
const router=express.Router();


router.post('/signup',createUser);
router.post('/otp',sendOtp);
router.post('/login',login);
router.post('/checkuser',checkUser);
router.post('/authenticate',setCookie);
router.get('/user/:id',getUser);
router.post('/decode',decode);

module.exports=router;